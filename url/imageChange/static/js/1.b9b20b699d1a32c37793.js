webpackJsonp([1],{P1Pu:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"home",data:function(){return{imgNum:0,filesLength:0,imgLength:4,beginIndex:0,isControl:!1}},watch:{imgNum:function(e,t){var i=0==e&&t==this.filesLength;console.log("查看是否符合条件",i),this.filesLength>e&&!i?this.getFileData():(this.imgNum=0,this.isControl=!1)}},methods:{getFileData:function(){this.isControl=!0;var e=this.$refs.file.files;if((this.filesLength=e.length,this.filesLength>this.imgNum)&&"image"===e[this.imgNum].type.split("/")[0]){var t=new FileReader;t.readAsDataURL(e[this.imgNum]);var i=this;t.onloadend=function(){var e=t.result;i.downloadImg(e,i.imgNum+i.beginIndex+1,i.imgLength)}}},convertBase64UrlToBlob:function(e){for(var t=e.split(";base64,"),i=t[0].split(":")[1],n=window.atob(t[1]),o=n.length,a=new Uint8Array(o),r=0;r<o;r++)a[r]=n.charCodeAt(r);return new Blob([a],{type:i})},myBrowser:function(){var e=navigator.userAgent;return e.indexOf("OPR")>-1?"Opera":e.indexOf("Firefox")>-1?"FF":e.indexOf("Trident")>-1?"IE":e.indexOf("Edge")>-1?"Edge":e.indexOf("Chrome")>-1?"Chrome":e.indexOf("Safari")>-1?"Safari":void 0},downloadImg:function(e,t,i){console.log("查看下载地址",e),console.log("查看传递名称",t),console.log("查看传递长度",i);var n=t,o=i-(t+="").length;if(o>0)for(var a=0;a<o;a++)n="0"+n;console.log("查看处理后的名称",n);var r=this.convertBase64UrlToBlob(e);if("IE"==this.myBrowser())console.log("IE"),window.navigator.msSaveBlob(r,n+".jpg");else if("FF"==this.myBrowser())console.log("FF"),window.location.href=e;else{console.log("a标签");var l=document.createElement("a");l.download=n+".jpg",l.href=URL.createObjectURL(r),l.click()}this.imgNum+=1}}},o={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"homeDiv"},[i("div",{staticClass:"uploadDiv"},[i("div",{staticClass:"topInput"},[e._v("初始下标: "),i("input",{directives:[{name:"model",rawName:"v-model.number",value:e.beginIndex,expression:"beginIndex",modifiers:{number:!0}}],attrs:{type:"text",disabled:e.isControl,oninput:"value=value.replace(/[^\\d]/g,'')",placeholder:"需要小一位"},domProps:{value:e.beginIndex},on:{input:function(t){t.target.composing||(e.beginIndex=e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})]),e._v(" "),i("div",{staticClass:"topInput"},[e._v("文件长度: "),i("input",{directives:[{name:"model",rawName:"v-model.number",value:e.imgLength,expression:"imgLength",modifiers:{number:!0}}],attrs:{type:"text",disabled:e.isControl,oninput:"value=value.replace(/[^\\d]/g,'')",placeholder:"需要小一位"},domProps:{value:e.imgLength},on:{input:function(t){t.target.composing||(e.imgLength=e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})]),e._v(" "),i("div",{staticClass:"upload"},[i("p",[e._v("点击选择需要上传的文件")]),e._v(" "),i("input",{ref:"file",staticClass:"file",attrs:{type:"file",multiple:"multiple"},on:{change:e.getFileData}})])])])},staticRenderFns:[]};var a=i("VU/8")(n,o,!1,function(e){i("z/3X")},"data-v-5cbafea2",null);t.default=a.exports},"z/3X":function(e,t){}});