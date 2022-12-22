(window.webpackJsonp=window.webpackJsonp||[]).push([[109],{714:function(e,t,a){"use strict";a.r(t);var s=a(1),n=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"adr-035-documentation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adr-035-documentation"}},[e._v("#")]),e._v(" ADR 035: Documentation")]),e._v(" "),a("p",[e._v("Author: @zramsay (Zach Ramsay)")]),e._v(" "),a("h2",{attrs:{id:"changelog"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),a("h3",{attrs:{id:"november-2nd-2018"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#november-2nd-2018"}},[e._v("#")]),e._v(" November 2nd 2018")]),e._v(" "),a("ul",[a("li",[e._v("initial write-up")])]),e._v(" "),a("h2",{attrs:{id:"context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),a("p",[e._v("The Tendermint documentation has undergone several changes until settling on the current model. Originally, the documentation was hosted on the website and had to be updated asynchronously from the code. Along with the other repositories requiring documentation, the whole stack moved to using Read The Docs to automatically generate, publish, and host the documentation. This, however, was insufficient; the RTD site had advertisement, it wasn't easily accessible to devs, didn't collect metrics, was another set of external links, etc.")]),e._v(" "),a("h2",{attrs:{id:"decision"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),a("p",[e._v("For two reasons, the decision was made to use VuePress:")]),e._v(" "),a("ol",[a("li",[e._v("ability to get metrics (implemented on both Tendermint and SDK)")]),e._v(" "),a("li",[e._v("host the documentation on the website as a "),a("code",[e._v("/docs")]),e._v(" endpoint.")])]),e._v(" "),a("p",[e._v("This is done while maintaining synchrony between the docs and code, i.e., the website is built whenever the docs are updated.")]),e._v(" "),a("h2",{attrs:{id:"status"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),a("p",[e._v("The two points above have been implemented; the "),a("code",[e._v("config.js")]),e._v(" has a Google Analytics identifier and the documentation workflow has been up and running largely without problems for several months. Details about the documentation build & workflow can be found "),a("RouterLink",{attrs:{to:"/DOCS_README.html"}},[e._v("here")])],1),e._v(" "),a("h2",{attrs:{id:"consequences"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),a("p",[e._v('Because of the organizational seperation between Tendermint & Cosmos, there is a challenge of "what goes where" for certain aspects of documentation.')]),e._v(" "),a("h3",{attrs:{id:"positive"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),a("p",[e._v("This architecture is largely positive relative to prior docs arrangements.")]),e._v(" "),a("h3",{attrs:{id:"negative"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),a("p",[e._v("A significant portion of the docs automation / build process is in private repos with limited access/visibility to devs. However, these tasks are handled by the SRE team.")]),e._v(" "),a("h3",{attrs:{id:"neutral"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#neutral"}},[e._v("#")]),e._v(" Neutral")])])}),[],!1,null,null,null);t.default=n.exports}}]);