(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(e,t,a){},42:function(e,t,a){e.exports=a(76)},47:function(e,t,a){},48:function(e,t,a){},73:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},76:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(24),r=a.n(i),l=(a(47),a(12)),c=a(13),o=a(16),g=a(14),u=a(17),d=(a(48),a(9)),m=a(10),h=a.n(m),f=(a(35),a(25)),p=a(20),v=a.n(p),E=(a(23),a(3)),b=a(11),w=a(18),T=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(g.a)(t).call(this,e))).handleInputChange=function(){},a.loadImageTags=function(e,t){console.log("this.state.tagged[index]",a.state.tagged[e]);var n=a.state.tagged[e],s=n.tags?n.tags:[],i=a.state.suggestions.filter(function(e){if(s.indexOf(e["@rid"])>-1)return e});return console.log("Slected Image",n,s,i),a.setState({tags:i,currentImage:n})},a.state={tags:[],isLoading:!0},a.reactTags=s.a.createRef(),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"getTagListData",value:function(){var e=this;h.a.get("assets/tags/tags.json").then(function(t){h.a.get("assets/tags/images.json").then(function(a){var n=e.props.selectedTag["@rid"],s=a.data.filter(function(e){if(e.tags&&e.tags.indexOf(n)>-1)return e}),i=s[0]?s[0]:[],r=i.tags?i.tags:[],l=t.data.filter(function(e){if(r.indexOf(e["@rid"])>-1)return e});e.setState({tagList:t.data,searchResult:t.data,suggestions:t.data,tags:l,tagged:s,currentImage:i,images:a.data,isLoading:!1})})})}},{key:"componentDidMount",value:function(){this.getTagListData()}},{key:"onDelete",value:function(e){var t=this.state.tags.slice(0);t.splice(e,1),this.setState({tags:t,tagModified:!0})}},{key:"onAddition",value:function(e){var t=[].concat(this.state.tags,e);this.setState({tags:t,tagModified:!0})}},{key:"render",value:function(){var e=this;if(this.state.isLoading)return s.a.createElement(s.a.Fragment,null,s.a.createElement(d.a,{variant:"primary",disabled:!0},s.a.createElement(b.a,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true"}),s.a.createElement("span",{className:"sr-only"},"Loading..."))," ",s.a.createElement(d.a,{variant:"primary",disabled:!0},s.a.createElement(b.a,{as:"span",animation:"grow",size:"sm",role:"status","aria-hidden":"true"}),"Loading..."));var t=this.props.selectedTag["@rid"],a=this.props.selectedTag,n=this.state.suggestions,i=this.state.images.filter(function(e){if(e.tags&&e.tags.indexOf(t)>-1)return e}),r=i[0]?i[0]:[],l=r.tags?r.tags:[],c=n.filter(function(e){if(l.indexOf(e["@rid"])>-1)return e});return console.log("From renderer selectedTag",a,r,c),s.a.createElement("div",null,s.a.createElement("div",{id:"editTags"},s.a.createElement(E.a,{className:"centeralign"},s.a.createElement(E.a.Header,null,s.a.createElement("center",null,s.a.createElement(w.a,null,s.a.createElement("h3",null,s.a.createElement("b",null,"Edit Tags")))),s.a.createElement(E.a.Title,null,s.a.createElement("b",null,"Tag Name:")," ",s.a.createElement("div",{className:"badge primary"},a.name,"\xa0"),"  ",s.a.createElement("b",null,"Description:"),a.description),s.a.createElement("center",null,"This Tag is taggged to below images, each image will have their own tag list, which can be added or removed.")),s.a.createElement(E.a.Body,null,s.a.createElement("br",null),s.a.createElement(f.Carousel,{onChange:function(t,a){return e.loadImageTags(t,a)},dynamicHeight:!0,showIndicators:!1},i.map(function(t){return s.a.createElement("div",{key:t["@rid"]},s.a.createElement("form",{style:{textAlign:"left"}},s.a.createElement("label",null,"Title: "),s.a.createElement("input",{className:"form-control",name:"title",type:"text",value:t.title,onChange:e.handleInputChange}),s.a.createElement("label",null,"Description: "),s.a.createElement("input",{className:"form-control",name:"description",type:"text",value:t.description,onChange:e.handleInputChange})),"File:",t.name,", Path: ",t.path,", Title: ",t.title,", Dimension:",t.width,"x",t.height,s.a.createElement("img",{src:"http://drive.google.com/thumbnail?id="+t.id,onError:function(e){e.target.onerror=null,e.target.src="https://via.placeholder.com/600x200.png?text=..."}}),s.a.createElement("br",null))})),s.a.createElement(v.a,{ref:this.reactTags,tags:this.state.tags,autoresize:!1,suggestions:this.state.suggestions,onDelete:this.onDelete.bind(this),onAddition:this.onAddition.bind(this),minQueryLength:1,classNames:{root:"react-tags",rootFocused:"is-focused",selected:"react-tags__selected",selectedTag:"react-tags__selected-tag",selectedTagName:"react-tags__selected-tag-name",search:"react-tags__search",searchWrapper:"react-tags__search-wrapper",searchInput:"react-tags__search-input",suggestions:"react-tags__suggestions",suggestionActive:"is-active",suggestionDisabled:"is-disabled"}})))))}}]),t}(n.Component),y=(a(73),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(g.a)(t).call(this,e))).handleInputChange=function(e){},a.state={isLoading:!1},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"getTagListData",value:function(){var e=this;h.a.get("assets/tags/tags.json").then(function(t){h.a.get("assets/tags/images.json").then(function(a){console.log("res",t.data,a.data),e.setState({tagList:t.data,searchResult:t.data,suggestions:t.data,images:a.data,isLoading:!1})})})}},{key:"componentDidMount",value:function(){this.getTagListData()}},{key:"componentDidUpdate",value:function(e){this.props.val!==e.val&&this.getTagDetails(this.props.val)}},{key:"onDelete",value:function(e){var t=this.state.tags.slice(0);t.splice(e,1),this.setState({tags:t})}},{key:"onAddition",value:function(e){var t=[].concat(this.state.tags,e);this.setState({tags:t})}},{key:"render",value:function(){if(!this.props.showPreview)return s.a.createElement("div",null);if(1==this.state.isLoading)return s.a.createElement(s.a.Fragment,null,s.a.createElement(d.a,{variant:"primary",disabled:!0},s.a.createElement(b.a,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true"}),s.a.createElement("span",{className:"sr-only"},"Loading..."))," ",s.a.createElement(d.a,{variant:"primary",disabled:!0},s.a.createElement(b.a,{as:"span",animation:"grow",size:"sm",role:"status","aria-hidden":"true"}),"Loading..."));var e=this.props.selectedTag["@rid"],t=this.state.images;if(!this.state.tagList)return s.a.createElement("p",null,"Loading Data");var a=this.props.selectedTag,n=t.filter(function(t){if(t.tags&&t.tags.indexOf(e)>-1)return t});return s.a.createElement("div",{id:"preview",className:"customerdetails"},s.a.createElement(E.a,{bsStyle:"info",className:"centeralign"},s.a.createElement(E.a.Header,null,s.a.createElement("center",null,s.a.createElement(w.a,null,s.a.createElement("h3",null,s.a.createElement("b",null,"Preview")))),s.a.createElement(E.a.Title,null,s.a.createElement("b",null,"Tag Name:")," ",s.a.createElement("div",{className:"badge primary"},a.name,"\xa0"),"  ",s.a.createElement("b",null,"Description:"),a.description),s.a.createElement("center",null,"This is preview of images related to this tag")),s.a.createElement(E.a.Body,null,s.a.createElement("br",null),n.map(function(e,t){return s.a.createElement(E.a,{style:{width:"50%",float:"left"}},s.a.createElement(E.a.Img,{variant:"top",src:"http://drive.google.com/thumbnail?id="+e.id}),s.a.createElement(E.a.Body,null,s.a.createElement(E.a.Title,null,e.title),s.a.createElement(E.a.Text,null,e.description)))}))))}}]),t}(n.Component)),k=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(g.a)(t).call(this,e))).state={tags:[],searchResult:[],isLoading:!0,showPreview:!1},a.reactTags=s.a.createRef(),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.getTagListData()}},{key:"getTagListData",value:function(){var e=this;h.a.get("assets/tags/tags.json").then(function(t){h.a.get("assets/tags/images.json").then(function(a){e.setState({tagList:t.data,searchResult:t.data,suggestions:t.data,images:a.data,selectedTag:t.data[5],tags:[t.data[5],t.data[6],t.data[7]],isLoading:!1})})})}},{key:"onDelete",value:function(e){var t=this,a=this.state.tags.slice(0);a.splice(e,1);var n=[];a.map(function(e){t.state.tagList.filter(function(t){t===e&&n.push(t)})}),this.setState({tags:a,searchResult:n})}},{key:"onAddition",value:function(e){var t=this,a=[].concat(this.state.tags,e),n=[];a.map(function(e){t.state.tagList.filter(function(t){t===e&&n.push(t)})}),this.setState({tags:a,searchResult:n})}},{key:"render",value:function(){var e=this;return!this.state.tagList||this.state.isLoading?s.a.createElement(s.a.Fragment,null,s.a.createElement(d.a,{variant:"primary",disabled:!0},s.a.createElement(b.a,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true"}),s.a.createElement("span",{className:"sr-only"},"Loading..."))," ",s.a.createElement(d.a,{variant:"primary",disabled:!0},s.a.createElement(b.a,{as:"span",animation:"grow",size:"sm",role:"status","aria-hidden":"true"}),"Loading...")):s.a.createElement("div",null,s.a.createElement("header",{className:"App-header"},s.a.createElement("div",null,s.a.createElement(v.a,{ref:this.reactTags,tags:this.state.tags,suggestions:this.state.suggestions,onDelete:this.onDelete.bind(this),onAddition:this.onAddition.bind(this),autoresize:!1,placeholderText:"\xab searchTags",minQueryLength:1,classNames:{root:"react-tags",rootFocused:"is-focused",selected:"react-tags__selected",selectedTag:"react-tags__selected-tag",selectedTagName:"react-tags__selected-tag-name",search:"react-tags__search",searchWrapper:"react-tags__search-wrapper",searchInput:"react-tags__search-input",suggestions:"react-tags__suggestions",suggestionActive:"is-active",suggestionDisabled:"is-disabled"}}))),s.a.createElement("div",{className:"row addmargin"},s.a.createElement("div",{className:"col-md-2 margin-top-0 parentDiv"},s.a.createElement(w.a,null,s.a.createElement("h3",null,"Serach Results")),0===this.state.searchResult.length?"no tags to show":this.state.searchResult.filter(function(t){if(e.state.tags.indexOf(t)>-1)return t}).map(function(t){return s.a.createElement(E.a,{key:t["@rid"],className:"centeralign"},s.a.createElement(E.a.Header,null,s.a.createElement(E.a.Title,null,t.name)),s.a.createElement(E.a.Text,null,s.a.createElement(d.a,{variant:"info",block:!0,size:"lg",onClick:function(){console.log("Current:",t["@rid"]),e.setState({selectedTag:t})}},"Click to View Details")))})),s.a.createElement("div",{className:"col-md-8"},s.a.createElement(T,{selectedTag:this.state.selectedTag}),s.a.createElement(d.a,{variant:"primary",block:!0,size:"lg",onClick:function(){e.setState({showPreview:!e.state.showPreview})}},this.state.showPreview?"Hide Preview":"Show Preview"),s.a.createElement(y,{selectedTag:this.state.selectedTag,showPreview:this.state.showPreview})),s.a.createElement("div",{className:"col-md-2 parentDiv"},s.a.createElement(w.a,null,s.a.createElement("h3",null,"All Tags")),this.state.tagList.map(function(t){return s.a.createElement(E.a,{key:t["@rid"],className:"centeralign"},s.a.createElement(E.a.Header,null,s.a.createElement(E.a.Title,null,t.name)),s.a.createElement(E.a.Text,null,s.a.createElement(d.a,{variant:"info",block:!0,size:"lg",onClick:function(){console.log("CurrentTag:",t["@rid"]),e.setState({selectedTag:t})}},"Click to View Details")))}))))}}]),t}(n.Component),L=a(83),D=a(85),j=a(84),O=a(82),_=(a(74),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(g.a)(t).call(this,e))).state={path:"/"},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return console.log("Host URL/taglist"),s.a.createElement(L.a,{basename:"/taglist"},s.a.createElement("div",{className:"App"},s.a.createElement(D.a,null,s.a.createElement(j.a,{exact:!0,path:"/",render:function(){return s.a.createElement(O.a,{to:"/taglist"})}}),s.a.createElement(j.a,{exact:!0,path:"/taglist",component:k}),s.a.createElement(j.a,{exact:!0,path:"/output",component:y}))))}}]),t}(n.Component)),N=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function x(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}r.a.render(s.a.createElement(_,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/taglist",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/taglist","/service-worker.js");N?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):x(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):x(e)})}}()}},[[42,1,2]]]);
//# sourceMappingURL=main.bf33b6ca.chunk.js.map