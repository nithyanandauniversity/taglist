(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e,t,a){},47:function(e,t,a){e.exports=a(82)},52:function(e,t,a){},53:function(e,t,a){},82:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(31),i=a.n(r),l=(a(52),a(16)),o=a(18),s=a(19),u=a(21),d=a(20),g=a(22),m=(a(53),a(85)),b=a(87),j=a(88),O=a(86),f=(a(54),a(15),a(11)),h=a.n(f),p=(a(24),a(29),a(4)),v=(a(17),a(14)),E=a(12),w=function(e,t){switch(t.type){case"selectTag":return console.log("New Ta",t.data),Object(E.a)({},e,{selectedTag:t.data,isLoading:!0});case"selectImage":return Object(E.a)({},e,{selectedImage:t.data,isLoading:!0});case"addData":return console.log("actionData:",t.data),Object(E.a)({},e,t.data);case"modifySearchTags":case"modifyImageTags":return console.log("modified",t.data),Object(E.a)({},e,t.data);case"modifyTitle":return console.log("modified",t.data),Object(E.a)({},e,{title:t.data});case"modifyDescription":return console.log("modified",t.data),Object(E.a)({},e,{description:t.data});case"isLoading":return console.log("loading..",t.data.value),Object(E.a)({},e,{isLoading:!1});default:throw new Error}},y={selectedTag:null,currentImage:null,currentImageTags:null,taggedImages:null,tagList:null,searchResult:null,suggestions:null,images:null,tags:null,isLoading:!0},k=Object(n.createContext)(y),T=function(e){var t=e.children,a=Object(n.useReducer)(w,y),r=Object(l.a)(a,2),i=r[0],o=r[1];return c.a.createElement(k.Provider,{value:[i,o]},t)},I=(a(25),a(30),a(2)),L=(a(45),a(1)),N=a.n(L),x=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={},a}return Object(g.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;h.a.get("/taglist/assets/tags/annadhan.json").then(function(t){var a=t.data,n={name:"Anna Daan",description:"Consolidation of all images related to the keywor anna daan"};console.log(a),e.setState({taggedImages:a,selectedTag:n})})}},{key:"render",value:function(){var e=[].concat(Object(I.a)(N()(5,22)),Object(I.a)(N()(229,238)),[312,314,316,317],Object(I.a)(N()(319,321)),Object(I.a)(N()(324,327)),Object(I.a)(N()(329,333)),Object(I.a)(N()(367,369)),[371,392],Object(I.a)(N()(525,545)),Object(I.a)(N()(572,578)),Object(I.a)(N()(621,630)),Object(I.a)(N()(736,738)),Object(I.a)(N()(781,784)),[799,800,804,806],Object(I.a)(N()(919,937)),Object(I.a)(N()(976,982)),[1002,1005,1006],Object(I.a)(N()(1210,1217)),Object(I.a)(N()(2051,2056)),Object(I.a)(N()(2090,2093)),Object(I.a)(N()(2183,2185)),Object(I.a)(N()(2231,2239)),Object(I.a)(N()(2292,2293)),[2421],Object(I.a)(N()(2922,2947)),Object(I.a)(N()(2992,2995)),Object(I.a)(N()(3001,3007)),Object(I.a)(N()(3139,3164)),Object(I.a)(N()(3186,3199)),[3355,3356],Object(I.a)(N()(3411,3413)),[3533],Object(I.a)(N()(3707,3726)),Object(I.a)(N()(3809,3812)),Object(I.a)(N()(3919,3920)),Object(I.a)(N()(3959,3966)),Object(I.a)(N()(3970,3971)),Object(I.a)(N()(3981,3984)),[3993,3944],Object(I.a)(N()(3999,4005)),Object(I.a)(N()(3186,12726)));if(null==this.state.taggedImages)return c.a.createElement("h3",null,"Loading");var t=0;return c.a.createElement("div",{id:"preview",className:"customerdetails"},c.a.createElement(p.a,{className:"centeralign"},c.a.createElement(p.a.Header,null,c.a.createElement("center",null,c.a.createElement(v.a,null,c.a.createElement("h3",null,c.a.createElement("b",null,"Preview")))),c.a.createElement(p.a.Title,null,c.a.createElement("b",null,"Tag Name:")," ",c.a.createElement("div",{className:"badge primary"},this.state.selectedTag.name,"\xa0"),"  ",c.a.createElement("b",null,"Description:"),this.state.selectedTag.description),c.a.createElement("center",null,"This is preview of images related to this tag")),c.a.createElement(p.a.Body,null,c.a.createElement("br",null),this.state.taggedImages.map(function(a,n){if(e.indexOf(n)>-1)return c.a.createElement(p.a,{key:n,style:{width:"10%",float:"left"}},c.a.createElement(p.a.Img,{variant:"top",alt:a.description,title:a.description,src:a.url}),c.a.createElement(p.a.Body,null,c.a.createElement(p.a.Text,null,a.description.substring(0,150)),c.a.createElement("a",{href:a.npediaURL},"src-",n,",",++t)))}))))}}]),t}(n.Component),C=(a(79),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={queryString:e.location.search},a}return Object(g.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;h.a.get("/taglist/assets/tags/annadhan.json").then(function(t){var a=t.data,n={name:"Anna Daan",description:"Consolidation of all images related to the keywor anna daan"};console.log(a),e.setState({taggedImages:a,selectedTag:n})})}},{key:"render",value:function(){var e=[].concat(Object(I.a)(N()(5,22)),Object(I.a)(N()(229,238)),[312,314,316,317],Object(I.a)(N()(319,321)),Object(I.a)(N()(324,327)),Object(I.a)(N()(329,333)),Object(I.a)(N()(367,369)),[371,392],Object(I.a)(N()(525,545)),Object(I.a)(N()(572,578)),Object(I.a)(N()(621,630)),Object(I.a)(N()(736,738)),Object(I.a)(N()(781,784)),[799,800,804,806],Object(I.a)(N()(919,937)),Object(I.a)(N()(976,982)),[1002,1005,1006],Object(I.a)(N()(1210,1217)),Object(I.a)(N()(2051,2056)),Object(I.a)(N()(2090,2093)),Object(I.a)(N()(2183,2185)),Object(I.a)(N()(2231,2239)),Object(I.a)(N()(2292,2293)),[2421],Object(I.a)(N()(2922,2947)),Object(I.a)(N()(2992,2995)),Object(I.a)(N()(3001,3007)),Object(I.a)(N()(3139,3164)),Object(I.a)(N()(3186,3199)),[3355,3356],Object(I.a)(N()(3411,3413)),[3533],Object(I.a)(N()(3707,3726)),Object(I.a)(N()(3809,3812)),Object(I.a)(N()(3919,3920)),Object(I.a)(N()(3959,3966)),Object(I.a)(N()(3970,3971)),Object(I.a)(N()(3981,3984)),[3993,3944],Object(I.a)(N()(3999,4005)));if(null==this.state.taggedImages)return c.a.createElement("h3",null,"Loading...");var t=this.state.taggedImages,a=0;return c.a.createElement("div",{id:"preview",className:"customerdetails"},this.state.queryString?this.state.queryString:"",c.a.createElement(p.a,{className:"centeralign"},t.map(function(n,r){if(r%2!=1)return t.length-1==r&&t.push({url:"",description:""}),e.indexOf(r)>-1?c.a.createElement("div",{className:"imagesblock"},c.a.createElement("div",{className:"imagebox"},c.a.createElement("div",{style:{width:"45%"}},c.a.createElement("center",null,c.a.createElement("img",{src:t[r].url,style:{width:"100%"}}),c.a.createElement("p",null,t[r].description),c.a.createElement("a",{href:n.npediaURL},"src-",++a))),c.a.createElement("div",{style:{width:"45%"}},c.a.createElement("center",null,c.a.createElement("img",{src:t[r+1].url,style:{width:"100%"}}),c.a.createElement("p",null,t[r+1].description),c.a.createElement("a",{href:n.npediaURL},"src-",++a))))):void 0})))}}]),t}(n.Component)),D=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={path:"/"},a}return Object(g.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return console.log("Host URL/taglist"),c.a.createElement(T,null,c.a.createElement(m.a,{basename:"/taglist"},c.a.createElement("div",{className:"App"},c.a.createElement(b.a,null,c.a.createElement(j.a,{exact:!0,path:"/",render:function(){return c.a.createElement(O.a,{to:"/output"})}}),c.a.createElement(j.a,{exact:!0,path:"/outputall",component:x}),c.a.createElement(j.a,{exact:!0,path:"/output",component:C})))))}}]),t}(n.Component),R=D,S=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function U(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(c.a.createElement(R,null),document.getElementById("images-block")),function(){if("serviceWorker"in navigator){if(new URL("/taglist",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/taglist","/service-worker.js");S?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):U(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):U(e)})}}()}},[[47,1,2]]]);
//# sourceMappingURL=main.1bf777f7.chunk.js.map