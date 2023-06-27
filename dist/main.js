var utils;(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{TagEditor:()=>n});var o=function(){function e(){}return e.GetElementBySelector=function(e){var t=document.querySelector(e);return t?{element:t,error:null}:{element:null,error:new Error("can't find any html element with selector name \"".concat(e,'"'))}},e}(),n=function(){function e(e){var t,n,r=this;this.Tags=[],this.setConfig=function(e){var t;null==e.SelectorNameTagEditor&&(e.SelectorNameTagEditor="#block_TagEditor"),null==e.SelectorNameOutput&&(e.SelectorNameOutput="#output_TagEditor"),null==e.HasDoubles&&(e.HasDoubles=!1),null==e.ToLower&&(e.ToLower=!0),null==e.MaxTagsCount&&(e.MaxTagsCount=0),null==e.MaxTagLength&&(e.MaxTagLength=0),null==e.DefaultTags&&(e.DefaultTags=[]),null==e.Separators&&(e.Separators=[" "]),r.Tags=null!==(t=e.DefaultTags)&&void 0!==t?t:[],r.config=e},this.setConfig(e);try{var a=o.GetElementBySelector(null!==(t=this.config.SelectorNameOutput)&&void 0!==t?t:"#output_TagEditor"),i=a.element;(l=a.error)&&console.warn("GetElementBySelector: ".concat(l.message)),this.domElement_TagsOutput=i;var l,s=o.GetElementBySelector(null!==(n=this.config.SelectorNameTagEditor)&&void 0!==n?n:"#block_TagEditor");if(i=s.element,l=s.error)throw new Error("GetElementBySelector: ".concat(l.message));this.domElement_TagEditorDiv=i,null==this.domElement_TagEditorDiv.querySelector("input")&&this.domElement_TagEditorDiv.appendChild(document.createElement("input")),this.domElement_TagEditorInput=this.domElement_TagEditorDiv.querySelector("input"),this.domElement_TagEditorInput.addEventListener("keyup",(function(e){r.config.Separators.includes(e.key)&&(r.domElement_TagEditorInput.value="")})),this.domElement_TagEditorInput.addEventListener("keydown",(function(e){if(r.config.Separators.includes(e.key)||"Enter"===e.key){var t=r.domElement_TagEditorInput.value;r.AddTag(t),r.domElement_TagEditorInput.value=""}else"Backspace"===e.key&&""==r.domElement_TagEditorInput.value&&(t=r.RemoveLastTag(),r.domElement_TagEditorInput.value=t+" ")})),this.domElement_TagEditorInput.addEventListener("focusout",(function(e){var t=r.domElement_TagEditorInput.value;r.AddTag(t),r.domElement_TagEditorInput.value=""})),this.AddTag(this.domElement_TagEditorInput.value),this.domElement_TagEditorInput.value=""}catch(l){return void console.error("TagEditor.constructor throws error:",l.message)}}return e.prototype.IsValidName=function(e){return this.config.ToLower&&(e=e.toLowerCase()),!(""==e||0!=this.config.MaxTagsCount&&this.Tags.length>=this.config.MaxTagsCount||!this.config.HasDoubles&&this.Tags.includes(e)||0!=this.config.MaxTagLength&&this.config.MaxTagLength<e.length)},e.prototype.AddTag=function(e){for(var t,o=[e],n=0;n<this.config.Separators.length;n++){for(var r=this.config.Separators[n],a=[],i=0;i<o.length;i++)for(var l=o[i].split(r),s=0;s<l.length;s++){var u=l[s];this.IsValidName(u)&&(this.config.ToLower&&(u=u.toLowerCase()),a.push(u))}o=a}o=o.filter((function(e,t,o){return o.indexOf(e)===t})),(t=this.Tags).push.apply(t,o),this.RefreshTags()},e.prototype.RemoveLastTag=function(){var e=this.Tags.pop();return this.RefreshTags(),null!=e?e:""},e.prototype.RemoveTag=function(e){return this.Tags=this.Tags.filter((function(t,o,n){return t!=e})),this.RefreshTags(),null!=e?e:""},e.prototype.RefreshTags=function(){for(var t=this;this.domElement_TagEditorDiv.firstChild!=this.domElement_TagEditorInput;)this.domElement_TagEditorDiv.removeChild(this.domElement_TagEditorDiv.firstChild);this.Tags.slice().reverse().forEach((function(o,n){var r=e.CreateTag(o,(function(){t.RemoveTag(o)}));t.domElement_TagEditorDiv.prepend(r)})),this.domElement_TagsOutput.value=this.Tags.join(" ")},e.prototype.Clear=function(){this.Tags=[],this.RefreshTags()},e.CreateTag=function(e,t){var o=document.createElement("div");o.setAttribute("class","btn-tag");var n=document.createElement("span");n.innerHTML=e;var r=document.createElement("span");return r.setAttribute("class","remove"),r.innerHTML="×",r.addEventListener("click",null!=t?function(){t(),o.remove()}:function(){o.remove()}),o.appendChild(n),o.appendChild(r),o},e}();utils=t})();