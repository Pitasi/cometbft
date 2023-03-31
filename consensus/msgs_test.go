package consensus

import (
	"encoding/hex"
	"math"
	"testing"
	"time"

	"github.com/cosmos/gogoproto/proto"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/cometbft/cometbft/crypto/merkle"
	"github.com/cometbft/cometbft/libs/bits"
	cmtrand "github.com/cometbft/cometbft/libs/rand"
	"github.com/cometbft/cometbft/p2p"
	cmtcons "github.com/cometbft/cometbft/proto/cometbft/consensus/v2"
	cmtcons1 "github.com/cometbft/cometbft/proto/cometbft/consensus/v1"
	cmtproto "github.com/cometbft/cometbft/proto/cometbft/types/v1"
	"github.com/cometbft/cometbft/types"
)

func TestMsgToProto(t *testing.T) {
	psh := types.PartSetHeader{
		Total: 1,
		Hash:  cmtrand.Bytes(32),
	}
	pbPsh := psh.ToProto()
	bi := types.BlockID{
		Hash:          cmtrand.Bytes(32),
		PartSetHeader: psh,
	}
	pbBi := bi.ToProto()
	bits := bits.NewBitArray(1)
	pbBits := bits.ToProto()

	parts := types.Part{
		Index: 1,
		Bytes: []byte("test"),
		Proof: merkle.Proof{
			Total:    1,
			Index:    1,
			LeafHash: cmtrand.Bytes(32),
			Aunts:    [][]byte{},
		},
	}
	pbParts, err := parts.ToProto()
	require.NoError(t, err)

	proposal := types.Proposal{
		Type:      types.SignedMsgType_PROPOSAL,
		Height:    1,
		Round:     1,
		POLRound:  1,
		BlockID:   bi,
		Timestamp: time.Now(),
		Signature: cmtrand.Bytes(20),
	}
	pbProposal := proposal.ToProto()

	vote := types.MakeVoteNoError(
		t,
		types.NewMockPV(),
		"chainID",
		0,
		1,
		0,
		types.SignedMsgType_PRECOMMIT,
		bi,
		time.Now(),
	)
	pbVote := vote.ToProto()

	testsCases := []struct {
		testName string
		msg      Message
		want     proto.Message
		wantErr  bool
	}{
		{"successful NewRoundStepMessage", &NewRoundStepMessage{
			Height:                2,
			Round:                 1,
			Step:                  1,
			SecondsSinceStartTime: 1,
			LastCommitRound:       2,
		}, &cmtcons1.NewRoundStep{
			Height:                2,
			Round:                 1,
			Step:                  1,
			SecondsSinceStartTime: 1,
			LastCommitRound:       2,
		},

			false},

		{"successful NewValidBlockMessage", &NewValidBlockMessage{
			Height:             1,
			Round:              1,
			BlockPartSetHeader: psh,
			BlockParts:         bits,
			IsCommit:           false,
		}, &cmtcons1.NewValidBlock{
			Height:             1,
			Round:              1,
			BlockPartSetHeader: pbPsh,
			BlockParts:         pbBits,
			IsCommit:           false,
		},

			false},
		{"successful BlockPartMessage", &BlockPartMessage{
			Height: 100,
			Round:  1,
			Part:   &parts,
		}, &cmtcons1.BlockPart{
			Height: 100,
			Round:  1,
			Part:   *pbParts,
		},

			false},
		{"successful ProposalPOLMessage", &ProposalPOLMessage{
			Height:           1,
			ProposalPOLRound: 1,
			ProposalPOL:      bits,
		}, &cmtcons1.ProposalPOL{
			Height:           1,
			ProposalPolRound: 1,
			ProposalPol:      *pbBits,
		},
			false},
		{"successful ProposalMessage", &ProposalMessage{
			Proposal: &proposal,
		}, &cmtcons1.Proposal{
			Proposal: *pbProposal,
		},

			false},
		{"successful VoteMessage", &VoteMessage{
			Vote: vote,
		}, &cmtcons.Vote{
			Vote: pbVote,
		},

			false},
		{"successful VoteSetMaj23", &VoteSetMaj23Message{
			Height:  1,
			Round:   1,
			Type:    1,
			BlockID: bi,
		}, &cmtcons1.VoteSetMaj23{
			Height:  1,
			Round:   1,
			Type:    1,
			BlockID: pbBi,
		},

			false},
		{"successful VoteSetBits", &VoteSetBitsMessage{
			Height:  1,
			Round:   1,
			Type:    1,
			BlockID: bi,
			Votes:   bits,
		}, &cmtcons1.VoteSetBits{
			Height:  1,
			Round:   1,
			Type:    1,
			BlockID: pbBi,
			Votes:   *pbBits,
		},

			false},
		{"failure", nil, &cmtcons.Message{}, true},
	}
	for _, tt := range testsCases {
		tt := tt
		t.Run(tt.testName, func(t *testing.T) {
			wpb, err := MsgToWrappedProto(tt.msg)
			if tt.wantErr {
				assert.Equal(t, err != nil, tt.wantErr)
				return
			} else {
				require.NoError(t, err)
			}
			pb, err := wpb.Unwrap()
			require.NoError(t, err)
			assert.EqualValues(t, tt.want, pb, tt.testName)

			msg, err := MsgFromProto(pb)

			if !tt.wantErr {
				require.NoError(t, err)
				bcm := assert.Equal(t, tt.msg, msg, tt.testName)
				assert.True(t, bcm, tt.testName)
			} else {
				require.Error(t, err, tt.testName)
			}
		})
	}
}

func TestWALMsgProto(t *testing.T) {

	parts := types.Part{
		Index: 1,
		Bytes: []byte("test"),
		Proof: merkle.Proof{
			Total:    1,
			Index:    1,
			LeafHash: cmtrand.Bytes(32),
			Aunts:    [][]byte{},
		},
	}
	pbParts, err := parts.ToProto()
	require.NoError(t, err)

	testsCases := []struct {
		testName string
		msg      WALMessage
		want     *cmtcons.WALMessage
		wantErr  bool
	}{
		{"successful EventDataRoundState", types.EventDataRoundState{
			Height: 2,
			Round:  1,
			Step:   "ronies",
		}, &cmtcons.WALMessage{
			Sum: &cmtcons.WALMessage_EventDataRoundState{
				EventDataRoundState: &cmtproto.EventDataRoundState{
					Height: 2,
					Round:  1,
					Step:   "ronies",
				},
			},
		}, false},
		{"successful msgInfo", msgInfo{
			Msg: &BlockPartMessage{
				Height: 100,
				Round:  1,
				Part:   &parts,
			},
			PeerID: p2p.ID("string"),
		}, &cmtcons.WALMessage{
			Sum: &cmtcons.WALMessage_MsgInfo{
				MsgInfo: &cmtcons.MsgInfo{
					Msg: cmtcons.Message{
						Sum: &cmtcons.Message_BlockPart{
							BlockPart: &cmtcons1.BlockPart{
								Height: 100,
								Round:  1,
								Part:   *pbParts,
							},
						},
					},
					PeerID: "string",
				},
			},
		}, false},
		{"successful timeoutInfo", timeoutInfo{
			Duration: time.Duration(100),
			Height:   1,
			Round:    1,
			Step:     1,
		}, &cmtcons.WALMessage{
			Sum: &cmtcons.WALMessage_TimeoutInfo{
				TimeoutInfo: &cmtcons1.TimeoutInfo{
					Duration: time.Duration(100),
					Height:   1,
					Round:    1,
					Step:     1,
				},
			},
		}, false},
		{"successful EndHeightMessage", EndHeightMessage{
			Height: 1,
		}, &cmtcons.WALMessage{
			Sum: &cmtcons.WALMessage_EndHeight{
				EndHeight: &cmtcons1.EndHeight{
					Height: 1,
				},
			},
		}, false},
		{"failure", nil, &cmtcons.WALMessage{}, true},
	}
	for _, tt := range testsCases {
		tt := tt
		t.Run(tt.testName, func(t *testing.T) {
			pb, err := WALToProto(tt.msg)
			if tt.wantErr == true {
				assert.Equal(t, err != nil, tt.wantErr)
				return
			}
			assert.EqualValues(t, tt.want, pb, tt.testName)

			msg, err := WALFromProto(pb)

			if !tt.wantErr {
				require.NoError(t, err)
				assert.Equal(t, tt.msg, msg, tt.testName) // need the concrete type as WAL Message is a empty interface
			} else {
				require.Error(t, err, tt.testName)
			}
		})
	}
}

//nolint:lll //ignore line length for tests
func TestConsMsgsVectors(t *testing.T) {
	date := time.Date(2018, 8, 30, 12, 0, 0, 0, time.UTC)
	psh := types.PartSetHeader{
		Total: 1,
		Hash:  []byte("add_more_exclamation_marks_code-"),
	}
	pbPsh := psh.ToProto()

	bi := types.BlockID{
		Hash:          []byte("add_more_exclamation_marks_code-"),
		PartSetHeader: psh,
	}
	pbBi := bi.ToProto()
	bits := bits.NewBitArray(1)
	pbBits := bits.ToProto()

	parts := types.Part{
		Index: 1,
		Bytes: []byte("test"),
		Proof: merkle.Proof{
			Total:    1,
			Index:    1,
			LeafHash: []byte("add_more_exclamation_marks_code-"),
			Aunts:    [][]byte{},
		},
	}
	pbParts, err := parts.ToProto()
	require.NoError(t, err)

	proposal := types.Proposal{
		Type:      types.SignedMsgType_PROPOSAL,
		Height:    1,
		Round:     1,
		POLRound:  1,
		BlockID:   bi,
		Timestamp: date,
		Signature: []byte("add_more_exclamation"),
	}
	pbProposal := proposal.ToProto()

	v := &types.Vote{
		ValidatorAddress: []byte("add_more_exclamation"),
		ValidatorIndex:   1,
		Height:           1,
		Round:            0,
		Timestamp:        date,
		Type:             types.SignedMsgType_PRECOMMIT,
		BlockID:          bi,
	}
	vpb := v.ToProto()
	v.Extension = []byte("extension")
	vextPb := v.ToProto()

	testCases := []struct {
		testName string
		cMsg     proto.Message
		expBytes string
	}{
		{"NewRoundStep", &cmtcons.Message{Sum: &cmtcons.Message_NewRoundStep{NewRoundStep: &cmtcons1.NewRoundStep{
			Height:                1,
			Round:                 1,
			Step:                  1,
			SecondsSinceStartTime: 1,
			LastCommitRound:       1,
		}}}, "0a0a08011001180120012801"},
		{"NewRoundStep Max", &cmtcons.Message{Sum: &cmtcons.Message_NewRoundStep{NewRoundStep: &cmtcons1.NewRoundStep{
			Height:                math.MaxInt64,
			Round:                 math.MaxInt32,
			Step:                  math.MaxUint32,
			SecondsSinceStartTime: math.MaxInt64,
			LastCommitRound:       math.MaxInt32,
		}}}, "0a2608ffffffffffffffff7f10ffffffff0718ffffffff0f20ffffffffffffffff7f28ffffffff07"},
		{"NewValidBlock", &cmtcons.Message{Sum: &cmtcons.Message_NewValidBlock{
			NewValidBlock: &cmtcons1.NewValidBlock{
				Height: 1, Round: 1, BlockPartSetHeader: pbPsh, BlockParts: pbBits, IsCommit: false}}},
			"1231080110011a24080112206164645f6d6f72655f6578636c616d6174696f6e5f6d61726b735f636f64652d22050801120100"},
		{"Proposal", &cmtcons.Message{Sum: &cmtcons.Message_Proposal{Proposal: &cmtcons1.Proposal{Proposal: *pbProposal}}},
			"1a720a7008201001180120012a480a206164645f6d6f72655f6578636c616d6174696f6e5f6d61726b735f636f64652d1224080112206164645f6d6f72655f6578636c616d6174696f6e5f6d61726b735f636f64652d320608c0b89fdc053a146164645f6d6f72655f6578636c616d6174696f6e"},
		{"ProposalPol", &cmtcons.Message{Sum: &cmtcons.Message_ProposalPol{
			ProposalPol: &cmtcons1.ProposalPOL{Height: 1, ProposalPolRound: 1}}},
			"2206080110011a00"},
		{"BlockPart", &cmtcons.Message{Sum: &cmtcons.Message_BlockPart{
			BlockPart: &cmtcons1.BlockPart{Height: 1, Round: 1, Part: *pbParts}}},
			"2a36080110011a3008011204746573741a26080110011a206164645f6d6f72655f6578636c616d6174696f6e5f6d61726b735f636f64652d"},
		{"Vote_without_ext", &cmtcons.Message{Sum: &cmtcons.Message_Vote{
			Vote: &cmtcons.Vote{Vote: vpb}}},
			"32700a6e0802100122480a206164645f6d6f72655f6578636c616d6174696f6e5f6d61726b735f636f64652d1224080112206164645f6d6f72655f6578636c616d6174696f6e5f6d61726b735f636f64652d2a0608c0b89fdc0532146164645f6d6f72655f6578636c616d6174696f6e3801"},
		{"Vote_with_ext", &cmtcons.Message{Sum: &cmtcons.Message_Vote{
			Vote: &cmtcons.Vote{Vote: vextPb}}},
			"327b0a790802100122480a206164645f6d6f72655f6578636c616d6174696f6e5f6d61726b735f636f64652d1224080112206164645f6d6f72655f6578636c616d6174696f6e5f6d61726b735f636f64652d2a0608c0b89fdc0532146164645f6d6f72655f6578636c616d6174696f6e38014a09657874656e73696f6e"},
		{"HasVote", &cmtcons.Message{Sum: &cmtcons.Message_HasVote{
			HasVote: &cmtcons1.HasVote{Height: 1, Round: 1, Type: types.SignedMsgType_PREVOTE, Index: 1}}},
			"3a080801100118012001"},
		{"HasVote", &cmtcons.Message{Sum: &cmtcons.Message_HasVote{
			HasVote: &cmtcons1.HasVote{Height: math.MaxInt64, Round: math.MaxInt32,
				Type: types.SignedMsgType_PREVOTE, Index: math.MaxInt32}}},
			"3a1808ffffffffffffffff7f10ffffffff07180120ffffffff07"},
		{"VoteSetMaj23", &cmtcons.Message{Sum: &cmtcons.Message_VoteSetMaj23{
			VoteSetMaj23: &cmtcons1.VoteSetMaj23{Height: 1, Round: 1, Type: types.SignedMsgType_PREVOTE, BlockID: pbBi}}},
			"425008011001180122480a206164645f6d6f72655f6578636c616d6174696f6e5f6d61726b735f636f64652d1224080112206164645f6d6f72655f6578636c616d6174696f6e5f6d61726b735f636f64652d"},
		{"VoteSetBits", &cmtcons.Message{Sum: &cmtcons.Message_VoteSetBits{
			VoteSetBits: &cmtcons1.VoteSetBits{Height: 1, Round: 1, Type: types.SignedMsgType_PREVOTE, BlockID: pbBi, Votes: *pbBits}}},
			"4a5708011001180122480a206164645f6d6f72655f6578636c616d6174696f6e5f6d61726b735f636f64652d1224080112206164645f6d6f72655f6578636c616d6174696f6e5f6d61726b735f636f64652d2a050801120100"},
	}

	for _, tc := range testCases {
		tc := tc
		t.Run(tc.testName, func(t *testing.T) {
			bz, err := proto.Marshal(tc.cMsg)
			require.NoError(t, err)

			require.Equal(t, tc.expBytes, hex.EncodeToString(bz))
		})
	}
}
