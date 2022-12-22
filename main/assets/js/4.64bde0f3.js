(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{622:function(e,t,a){e.exports=a.p+"assets/img/top-3-percent-send.9c7ceec9.png"},623:function(e,t,a){e.exports=a.p+"assets/img/send-rate-all.cebf0be8.png"},624:function(e,t,a){e.exports=a.p+"assets/img/top-3-percent-receive.3c0c4391.png"},625:function(e,t,a){e.exports=a.p+"assets/img/receive-rate-all.06c68a58.png"},789:function(e,t,a){"use strict";a.r(t);var n=a(1),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"rfc-27-p2p-message-bandwidth-report"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#rfc-27-p2p-message-bandwidth-report"}},[e._v("#")]),e._v(" RFC 27: P2P Message Bandwidth Report")]),e._v(" "),n("h2",{attrs:{id:"changelog"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),n("ul",[n("li",[e._v("Nov 7, 2022: initial draft (@williambanfield)")]),e._v(" "),n("li",[e._v("Nov 15, 2022: draft completed (@williambanfield)")])]),e._v(" "),n("h2",{attrs:{id:"abstract"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#abstract"}},[e._v("#")]),e._v(" Abstract")]),e._v(" "),n("p",[e._v("Node operators and application developers complain that Tendermint nodes consume\nlarges amounts of network bandwidth. This RFC catalogues the major sources of bandwidth\nconsumption within Tendermint and suggests modifications to Tendermint that may reduce\nbandwidth consumption for nodes.")]),e._v(" "),n("h2",{attrs:{id:"background"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#background"}},[e._v("#")]),e._v(" Background")]),e._v(" "),n("p",[e._v("Multiple teams running validators in production report that the validator\nconsumes a lot of bandwidth. They report that operators running on a network\nwith hundreds of validators consumes multiple terabytes of bandwidth per day.\nPrometheus data collected from a validator node running on the Osmosis chain\nshows that Tendermint sends and receives large amounts of data to peers. In the\nnearly three hours of observation, Tendermint sent nearly 42 gigabytes and\nreceived about 26 gigabytes, for an estimated 366 gigabytes sent daily and 208\ngigabytes received daily. While this is shy of the reported terabytes number,\noperators running multiple nodes for a 'sentry' pattern could easily send and\nreceive a terabyte of data.")]),e._v(" "),n("p",[e._v("Sending and receiving large amounts of data has a cost for node operators. Most\ncloud platforms charge for network traffic egress. Google Cloud charges between\n"),n("a",{attrs:{href:"https://cloud.google.com/vpc/network-pricing#vpc-pricing",target:"_blank",rel:"noopener noreferrer"}},[e._v("$.05 to $.12 per gigabyte of egress traffic"),n("OutboundLink")],1),e._v(", and ingress is\nfree. Hetzner "),n("a",{attrs:{href:"https://docs.hetzner.com/robot/general/traffic",target:"_blank",rel:"noopener noreferrer"}},[e._v("charges 1€ per TB used over the 10-20TB base bandwidth per\nmonth"),n("OutboundLink")],1),e._v(", which will be easily hit if multiple terabytes are\nsent and received per day. Using the values collected from the validator on\nOsmosis, a single node on Google cloud may cost $18 to $44 a day running on\nGoogle cloud. On Hetzner, the estimated 18TB a month of both sending and\nreceiving may cost between 0 and 10 Euro a month per node.")]),e._v(" "),n("h2",{attrs:{id:"discussion"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#discussion"}},[e._v("#")]),e._v(" Discussion")]),e._v(" "),n("h3",{attrs:{id:"overview-of-major-bandwidth-usage"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#overview-of-major-bandwidth-usage"}},[e._v("#")]),e._v(" Overview of Major Bandwidth Usage")]),e._v(" "),n("p",[e._v("To determine which components of Tendermint were consuming the most bandwidth,\nI gathered prometheus metrics from the "),n("a",{attrs:{href:"https://www.mintscan.io/osmosis/validators/osmovaloper1z0sh4s80u99l6y9d3vfy582p8jejeeu6tcucs2",target:"_blank",rel:"noopener noreferrer"}},[e._v("Blockpane"),n("OutboundLink")],1),e._v(" validator running\non the Osmosis network for several hours. The data reveal that three message\ntypes account for 98% of the total bandwidth consumed. These message types are\nas follows:")]),e._v(" "),n("ol",[n("li",[n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/proto/tendermint/consensus/types.proto#L44",target:"_blank",rel:"noopener noreferrer"}},[e._v("consensus.BlockPart"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/proto/tendermint/mempool/types.proto#L6",target:"_blank",rel:"noopener noreferrer"}},[e._v("mempool.Txs"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/proto/tendermint/consensus/types.proto#L51",target:"_blank",rel:"noopener noreferrer"}},[e._v("consensus.Vote"),n("OutboundLink")],1)])]),e._v(" "),n("p",[e._v("The image below of p2p data collected from the Blockpane validator illustrate\nthe total bandwidth consumption of these three message types.")]),e._v(" "),n("h4",{attrs:{id:"send"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#send"}},[e._v("#")]),e._v(" Send:")]),e._v(" "),n("h5",{attrs:{id:"top-3-percent"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#top-3-percent"}},[e._v("#")]),e._v(" Top 3 Percent:")]),e._v(" "),n("p",[n("img",{attrs:{src:a(622),alt:""}})]),e._v(" "),n("h5",{attrs:{id:"rate-for-all-messages"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#rate-for-all-messages"}},[e._v("#")]),e._v(" Rate For All Messages:")]),e._v(" "),n("p",[n("img",{attrs:{src:a(623),alt:""}})]),e._v(" "),n("h4",{attrs:{id:"receive"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#receive"}},[e._v("#")]),e._v(" Receive:")]),e._v(" "),n("h5",{attrs:{id:"top-3-percent-2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#top-3-percent-2"}},[e._v("#")]),e._v(" Top 3 Percent:")]),e._v(" "),n("p",[n("img",{attrs:{src:a(624),alt:""}})]),e._v(" "),n("h5",{attrs:{id:"rate-for-all-messages-2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#rate-for-all-messages-2"}},[e._v("#")]),e._v(" Rate For All Messages:")]),e._v(" "),n("p",[n("img",{attrs:{src:a(625),alt:""}})]),e._v(" "),n("h3",{attrs:{id:"investigation-of-message-usage"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#investigation-of-message-usage"}},[e._v("#")]),e._v(" Investigation of Message Usage")]),e._v(" "),n("p",[e._v("This section discusses the usage of each of the three highest consumption messages.")]),e._v(" "),n("h4",{attrs:{id:"blockpart-transmission"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#blockpart-transmission"}},[e._v("#")]),e._v(" BlockPart Transmission")]),e._v(" "),n("p",[e._v("Sending "),n("code",[e._v("BlockPart")]),e._v(" messages consumes the most bandwidth out of all p2p\nmessages types as observed in the Blockpane Osmosis validator. In the almost 3\nhour observation, the validator sent about 20 gigabytes of "),n("code",[e._v("BlockPart")]),e._v("\nmessages.")]),e._v(" "),n("p",[e._v("A block is proposed each round of Tendermint consensus. The paper does not\ndefine a specific way that the block is to be transmitted, just that all\nparticipants will receive it via a gossip network.")]),e._v(" "),n("p",[e._v("The Go implementation of Tendermint transmits the block in 'parts'. It\nserializes the block to wire-format proto and splits this byte representation\ninto a set of 4 kilobyte arrays and sends these arrays to its peers, each in a\nseparate message.")]),e._v(" "),n("p",[e._v("The logic for sending "),n("code",[e._v("BlockPart")]),e._v(" messages resides in the code for the\n"),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/consensus/reactor.go#L537",target:"_blank",rel:"noopener noreferrer"}},[e._v("consensus.Reactor"),n("OutboundLink")],1),e._v(". The consensus reactor starts a new\n"),n("code",[e._v("gossipDataRoutine")]),e._v(" for each peer it connects to. This routine repeatedly picks\na part of the block that Tendermint believes the peer does not know about yet\nand gossips it to the peer. The set of "),n("code",[e._v("BlockParts")]),e._v(" that Tendermint considers\nits peer as having is only updated in one of four ways:")]),e._v(" "),n("ol",[n("li",[e._v("Our peer tells us they have entered a new round "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/consensus/reactor.go#L266",target:"_blank",rel:"noopener noreferrer"}},[e._v("via a "),n("code",[e._v("NewRoundStep")]),e._v("\nmessage"),n("OutboundLink")],1),e._v(". This message is only sent when a node\nmoves to a new round or height and only resets the data we collect about a\npeer's blockpart state.")]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/consensus/reactor.go#L324",target:"_blank",rel:"noopener noreferrer"}},[e._v("We receive a block part from the peer"),n("OutboundLink")],1),e._v(".")]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/consensus/reactor.go#L566",target:"_blank",rel:"noopener noreferrer"}},[e._v("We send"),n("OutboundLink")],1),e._v(" "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/consensus/reactor.go#L684.",target:"_blank",rel:"noopener noreferrer"}},[e._v("the peer a block part"),n("OutboundLink")],1),e._v(".")]),e._v(" "),n("li",[e._v("Our peer tells us about the parts they have block "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/consensus/reactor.go#L268",target:"_blank",rel:"noopener noreferrer"}},[e._v("via "),n("code",[e._v("NewValidBlock")]),e._v("\nmessages"),n("OutboundLink")],1),e._v(". This message is only sent when the\npeer has a quorum of prevotes or precommits for a block.")])]),e._v(" "),n("p",[e._v("Each node receives block parts from all of its peers. The particular block part\nto send at any given time is randomly selected from the set of parts that the\npeer node is not yet known to have. Given that these are the only times that\nTendermint learns of its peers' block parts, it's very likely that a node has\nan incomplete understanding of its peers' block parts and is transmitting block\nparts to a peer that the peer has received from some other node.")]),e._v(" "),n("p",[e._v("Multiple potential mechanisms exist to reduce the number of duplicate block\nparts a node receives. One set of mechanisms relies on more frequently\ncommunicating the set of block parts a node needs to its peers. Another\npotential mechanism requires a larger overhaul to the way blocks are gossiped\nin the network.")]),e._v(" "),n("h4",{attrs:{id:"mempool-tx-transmission"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#mempool-tx-transmission"}},[e._v("#")]),e._v(" Mempool Tx Transmission")]),e._v(" "),n("p",[e._v("The Tendermint mempool stages transactions that are yet to be committed to the\nblockchain and communicates these transactions to its peers. Each message\ncontains one transaction. Data collected from the Blockpane node running on\nOsmosis indicates that the validator sent about 12 gigabytes of "),n("code",[e._v("Txs")]),e._v(" messages\nduring the nearly 3 hour observation period.")]),e._v(" "),n("p",[e._v("The Tendermint mempool starts a new "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/mempool/v0/reactor.go#L197",target:"_blank",rel:"noopener noreferrer"}},[e._v("broadcastTxRoutine"),n("OutboundLink")],1),e._v("\nfor each peer that it is informed of. The routine sends all transactions that\nthe mempool is aware of to all peers with few exceptions. The only exception is\nif the mempool received a transaction from a peer, then it marks it as such and\nwon't resend to that peer. Otherwise, it retains no information about which\ntransactions it already sent to a peer. In some cases it may therefore resend\ntransactions the peer already has. This can occur if the mempool removes a\ntransaction from the "),n("code",[e._v("CList")]),e._v(" data structure used to store the list of\ntransactions while it is about to be sent and if the transaction was the tail\nof the "),n("code",[e._v("CList")]),e._v(" during removal. This will be more likely to occur if a large\nnumber of transactions from the end of the list are removed during "),n("code",[e._v("RecheckTx")]),e._v(",\nsince multiple transactions will become the tail and then be deleted. It is\nunclear at the moment how frequently this occurs on production chains.")]),e._v(" "),n("p",[e._v("Beyond ensuring that transactions are rebroadcast to peers less frequently,\nthere is not a simple scheme to communicate fewer transactions to peers. Peers\ncannot communicate what transactions they need since they do not know which\ntransactions exist on the network.")]),e._v(" "),n("h4",{attrs:{id:"vote-transmission"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#vote-transmission"}},[e._v("#")]),e._v(" Vote Transmission")]),e._v(" "),n("p",[e._v("Tendermint votes, both prevotes and precommits, are central to Tendermint\nconsensus and are gossiped by all nodes to all peers during each consensus\nround. Data collected from the Blockpane node running on Osmosis indicates that\nabout 9 gigabytes of "),n("code",[e._v("Vote")]),e._v(" messages were sent during the nearly 3 hour period\nof observation. Examination of the "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/proto/tendermint/types/types.pb.go#L468",target:"_blank",rel:"noopener noreferrer"}},[e._v("Vote message"),n("OutboundLink")],1),e._v(" indicates that it\ncontains 184 bytes of data, with the proto encoding adding a few additional\nbytes when transmitting.")]),e._v(" "),n("p",[e._v("The Tendermint consensus reactor starts a new\n"),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/consensus/reactor.go#L694",target:"_blank",rel:"noopener noreferrer"}},[e._v("gossipVotesRoutine"),n("OutboundLink")],1),e._v(" for each peer that it connects to.\nThe reactor sends all votes to all peers unless it knows that the peer already\nhas the vote or the reactor learns that the peer is in a different round and\nthat thus the vote no longer applies. Tendermint learns that a peer has a vote\nin one of 4 ways:")]),e._v(" "),n("ol",[n("li",[e._v("Tendermint sent the peer the vote.")]),e._v(" "),n("li",[e._v("Tendermint received the vote from the peer.")]),e._v(" "),n("li",[e._v("The peer "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/consensus/reactor.go#L1429",target:"_blank",rel:"noopener noreferrer"}},[e._v("sent a "),n("code",[e._v("HasVote")]),e._v(" message"),n("OutboundLink")],1),e._v(". This message is broadcast\nto all peers "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/consensus/state.go#L2083",target:"_blank",rel:"noopener noreferrer"}},[e._v("each time validator receives a vote it hasn't seen before\ncorresponding to its current height and round"),n("OutboundLink")],1),e._v(".")]),e._v(" "),n("li",[e._v("The peer "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/consensus/reactor.go#L1445",target:"_blank",rel:"noopener noreferrer"}},[e._v("sent a "),n("code",[e._v("VoteSetBits")]),e._v(" message"),n("OutboundLink")],1),e._v(". This message is\n"),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/consensus/reactor.go#L306",target:"_blank",rel:"noopener noreferrer"}},[e._v("sent as a response to a peer that sends a "),n("code",[e._v("VoteSetMaj23")]),n("OutboundLink")],1),e._v(".")])]),e._v(" "),n("p",[e._v("Given that Tendermint informs all peers of "),n("em",[e._v("each")]),e._v(" vote message it receives, all\nnodes should be well informed of which votes their peers have. Given that the\nvote messages were the third largest consumer of bandwidth in the observation\non Osmosis, it's possible that this system is not currently working correctly.\nFurther analysis should examine where votes may be being retransmitted.")]),e._v(" "),n("h3",{attrs:{id:"suggested-improvements-to-lower-message-transmission-bandwidth"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#suggested-improvements-to-lower-message-transmission-bandwidth"}},[e._v("#")]),e._v(" Suggested Improvements to Lower Message Transmission Bandwidth")]),e._v(" "),n("h4",{attrs:{id:"gossip-known-blockpart-data"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#gossip-known-blockpart-data"}},[e._v("#")]),e._v(" Gossip Known BlockPart Data")]),e._v(" "),n("p",[e._v("The "),n("code",[e._v("BlockPart")]),e._v(" messages, by far, account for the majority of the data sent to\neach peer. At the moment, peers do not inform the node of which block parts\nthey already have. This means that each block part is "),n("em",[e._v("very likely")]),e._v(" to be\ntransmitted many times to each node. This frivolous consumption is even worse\nin networks with large blocks.")]),e._v(" "),n("p",[e._v("The very simple solution to this issue is to copy the technique used in\nconsensus for informing peers when the node receives a vote. The consensus\nreactor can be augmented with a "),n("code",[e._v("HasBlockPart")]),e._v(" message that is broadcast to\neach peer every time the node receives a block part. By informing each peer\nevery time the node receives a block part, we can drastically reduce the amount\nof duplicate data sent to each node. There would be no algorithmic way of\nenforcing that a peer accurately reports its block parts, so providing this\nmessage would be a somewhat altruistic action on the part of the node. Such a\nsystem "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/issues/627",target:"_blank",rel:"noopener noreferrer"}},[e._v("has been proposed in the past"),n("OutboundLink")],1),e._v(" as well, so this is certainly not\ntotally new ground.")]),e._v(" "),n("p",[e._v("Measuring the size of duplicately received blockparts before and after this\nchange would help validate this approach.")]),e._v(" "),n("h4",{attrs:{id:"compress-transmitted-data"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#compress-transmitted-data"}},[e._v("#")]),e._v(" Compress Transmitted Data")]),e._v(" "),n("p",[e._v("Tendermint's data is sent uncompressed on the wire. The messages are not\ncompressed before sending and the transport performs no compression either.\nSome of the information communicated by Tendermint is a poor candidate for\ncompression: Data such as digital signatures and hashes have high entropy and\ntherefore do not compress well. However, transactions may contain lots of\ninformation that has less entropy. Compression within Tendermint may be added\nat several levels. Compression may be performed at the "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/p2p/conn/connection.go#L889-L918",target:"_blank",rel:"noopener noreferrer"}},[e._v("Tendermint 'packet'\nlevel"),n("OutboundLink")],1),e._v(" or at the "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/ff0f98892f24aac11e46aeff2b6d2c0ad816701a/p2p/peer.go#L285",target:"_blank",rel:"noopener noreferrer"}},[e._v("Tendermint message send\nlevel"),n("OutboundLink")],1),e._v(".")]),e._v(" "),n("h4",{attrs:{id:"transmit-less-data-during-block-gossip"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#transmit-less-data-during-block-gossip"}},[e._v("#")]),e._v(" Transmit Less Data During Block Gossip")]),e._v(" "),n("p",[e._v("Block, vote, and mempool gossiping transmit much of same data. The mempool\nreactor gossips candidate transactions to each peer. The consensus reactor,\nwhen gossiping the votes, sends vote metadata and the digital signature of that\nsigns over that metadata. Finally, when a block is proposed, the proposing node\namalgamates the received votes, a set of transaction, and adds a header to\nproduce the block. This block is then serialized and gossiped as a list of\nbytes. However, the data that the block contains, namely the votes and the\ntransactions were most likely "),n("em",[e._v("already transmitted to the nodes on the network")]),e._v("\nvia mempool transaction gossip and consensus vote gossip.")]),e._v(" "),n("p",[e._v("Therefore, block gossip can be updated to transmit a representation of the data\ncontained in the block that assumes the peers will already have most of this\ndata. Namely, the block gossip can be updated to only send 1) a list of\ntransaction hashes and 2) a bit array of votes selected for the block along\nwith the header and other required block metadata.")]),e._v(" "),n("p",[e._v("This new proposed method for gossiping block data could accompany a slight\nupdate to the mempool transaction gossip and consensus vote gossip. Since all\nof the contents of each block will not be gossiped together, it's possible that\nsome nodes are missing a proposed transaction or the vote of a validator\nindicated in the new block gossip format during block gossip. The mempool and\nconsensus reactors may therefore be updated to provide a "),n("code",[e._v("NeedTxs")]),e._v(" and\n"),n("code",[e._v("NeedVotes")]),e._v(" message. Each of these messages would allow a node to request a set\nof data from their peers. When a node receives one of these, it will then\ntransmit the Tx/Votes indicate in the associated message regardless of whether\nit believes it has transmitted them to the peer before. The gossip layer will\nensure that each peer eventually receives all of the data in the block.\nHowever, if a transaction is needed immediately by a peer so that it can verify\nand execute a block during consensus, a mechanism such as the "),n("code",[e._v("NeedTxs")]),e._v(" and\n"),n("code",[e._v("NeedVotes")]),e._v(" messages should be added to ensure it receives the messages\nquickly.")]),e._v(" "),n("p",[e._v("The same logic may applied for evidence transmission as well, since all nodes\nshould receive evidence and therefore do not need to re-transmit it in a block\npart.")]),e._v(" "),n("p",[e._v("A similar idea has been proposed in the past as "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/issues/7932",target:"_blank",rel:"noopener noreferrer"}},[e._v("Compact Block\nPropagation"),n("OutboundLink")],1),e._v(".")]),e._v(" "),n("h2",{attrs:{id:"references"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")])])}),[],!1,null,null,null);t.default=s.exports}}]);