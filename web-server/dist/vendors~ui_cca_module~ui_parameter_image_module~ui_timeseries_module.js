(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{327:function(e,t,r){"use strict";t.__esModule=!0;var i=function(e){return e&&e.__esModule?e:{default:e}}(r(374));t.default=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return(0,i.default)(e)}},328:function(e,t,r){var i,n,s;
/*!
	Papa Parse
	v4.3.2
	https://github.com/mholt/PapaParse
*/n=[],void 0===(s="function"==typeof(i=function(){"use strict";var e,t="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==t?t:{},r=!t.document&&!!t.postMessage,i=r&&/(\?|&)papaworker(=|&|$)/.test(t.location.search),n=!1,s={},a=0,o={parse:function(r,i){var u=(i=i||{}).dynamicTyping||!1;if(w(u)&&(i.dynamicTypingFunction=u,u={}),i.dynamicTyping=u,i.worker&&o.WORKERS_SUPPORTED){var h=function(){if(!o.WORKERS_SUPPORTED)return!1;if(!n&&null===o.SCRIPT_PATH)throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.");var r=o.SCRIPT_PATH||e;r+=(-1!==r.indexOf("?")?"&":"?")+"papaworker";var i=new t.Worker(r);return i.onmessage=g,i.id=a++,s[i.id]=i,i}();return h.userStep=i.step,h.userChunk=i.chunk,h.userComplete=i.complete,h.userError=i.error,i.step=w(i.step),i.chunk=w(i.chunk),i.complete=w(i.complete),i.error=w(i.error),delete i.worker,void h.postMessage({input:r,config:i,workerId:h.id})}var p=null;return"string"==typeof r?p=i.download?new f(i):new l(i):!0===r.readable&&w(r.read)&&w(r.on)?p=new d(i):(t.File&&r instanceof File||r instanceof Object)&&(p=new c(i)),p.stream(r)},unparse:function(e,t){var r=!1,i=!0,n=",",s="\r\n",a='"';"object"==typeof t&&("string"==typeof t.delimiter&&1===t.delimiter.length&&-1===o.BAD_DELIMITERS.indexOf(t.delimiter)&&(n=t.delimiter),("boolean"==typeof t.quotes||t.quotes instanceof Array)&&(r=t.quotes),"string"==typeof t.newline&&(s=t.newline),"string"==typeof t.quoteChar&&(a=t.quoteChar),"boolean"==typeof t.header&&(i=t.header));var u=new RegExp(a,"g");if("string"==typeof e&&(e=JSON.parse(e)),e instanceof Array){if(!e.length||e[0]instanceof Array)return f(null,e);if("object"==typeof e[0])return f(h(e[0]),e)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),e.data instanceof Array&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=e.data[0]instanceof Array?e.fields:h(e.data[0])),e.data[0]instanceof Array||"object"==typeof e.data[0]||(e.data=[e.data])),f(e.fields||[],e.data||[]);throw"exception: Unable to serialize unrecognized input";function h(e){if("object"!=typeof e)return[];var t=[];for(var r in e)t.push(r);return t}function f(e,t){var r="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var a=e instanceof Array&&e.length>0,o=!(t[0]instanceof Array);if(a&&i){for(var u=0;u<e.length;u++)u>0&&(r+=n),r+=c(e[u],u);t.length>0&&(r+=s)}for(var h=0;h<t.length;h++){for(var f=a?e.length:t[h].length,l=0;l<f;l++){l>0&&(r+=n);var d=a&&o?e[l]:l;r+=c(t[h][d],l)}h<t.length-1&&(r+=s)}return r}function c(e,t){if(void 0===e||null===e)return"";e=e.toString().replace(u,a+a);var i="boolean"==typeof r&&r||r instanceof Array&&r[t]||function(e,t){for(var r=0;r<t.length;r++)if(e.indexOf(t[r])>-1)return!0;return!1}(e,o.BAD_DELIMITERS)||e.indexOf(n)>-1||" "===e.charAt(0)||" "===e.charAt(e.length-1);return i?a+e+a:e}}};if(o.RECORD_SEP=String.fromCharCode(30),o.UNIT_SEP=String.fromCharCode(31),o.BYTE_ORDER_MARK="\ufeff",o.BAD_DELIMITERS=["\r","\n",'"',o.BYTE_ORDER_MARK],o.WORKERS_SUPPORTED=!r&&!!t.Worker,o.SCRIPT_PATH=null,o.LocalChunkSize=10485760,o.RemoteChunkSize=5242880,o.DefaultDelimiter=",",o.Parser=_,o.ParserHandle=p,o.NetworkStreamer=f,o.FileStreamer=c,o.StringStreamer=l,o.ReadableStreamStreamer=d,t.jQuery){var u=t.jQuery;u.fn.parse=function(e){var r=e.config||{},i=[];return this.each(function(e){var n="INPUT"===u(this).prop("tagName").toUpperCase()&&"file"===u(this).attr("type").toLowerCase()&&t.FileReader;if(!n||!this.files||0===this.files.length)return!0;for(var s=0;s<this.files.length;s++)i.push({file:this.files[s],inputElem:this,instanceConfig:u.extend({},r)})}),n(),this;function n(){if(0!==i.length){var t=i[0];if(w(e.before)){var r=e.before(t.file,t.inputElem);if("object"==typeof r){if("abort"===r.action)return void function(t,r,i,n){w(e.error)&&e.error({name:t},r,i,n)}("AbortError",t.file,t.inputElem,r.reason);if("skip"===r.action)return void s();"object"==typeof r.config&&(t.instanceConfig=u.extend(t.instanceConfig,r.config))}else if("skip"===r)return void s()}var n=t.instanceConfig.complete;t.instanceConfig.complete=function(e){w(n)&&n(e,t.file,t.inputElem),s()},o.parse(t.file,t.instanceConfig)}else w(e.complete)&&e.complete()}function s(){i.splice(0,1),n()}}}function h(e){this._handle=null,this._paused=!1,this._finished=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=y(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new p(t),this._handle.streamer=this,this._config=t}.call(this,e),this.parseChunk=function(e){if(this.isFirstChunk&&w(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(e);void 0!==r&&(e=r)}this.isFirstChunk=!1;var n=this._partialLine+e;this._partialLine="";var s=this._handle.parse(n,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var a=s.meta.cursor;this._finished||(this._partialLine=n.substring(a-this._baseIndex),this._baseIndex=a),s&&s.data&&(this._rowCount+=s.data.length);var u=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(i)t.postMessage({results:s,workerId:o.WORKER_ID,finished:u});else if(w(this._config.chunk)){if(this._config.chunk(s,this._handle),this._paused)return;s=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(s.data),this._completeResults.errors=this._completeResults.errors.concat(s.errors),this._completeResults.meta=s.meta),!u||!w(this._config.complete)||s&&s.meta.aborted||this._config.complete(this._completeResults,this._input),u||s&&s.meta.paused||this._nextChunk(),s}},this._sendError=function(e){w(this._config.error)?this._config.error(e):i&&this._config.error&&t.postMessage({workerId:o.WORKER_ID,error:e,finished:!1})}}function f(e){var t;(e=e||{}).chunkSize||(e.chunkSize=o.RemoteChunkSize),h.call(this,e),this._nextChunk=r?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),r||(t.onload=k(this._chunkLoaded,this),t.onerror=k(this._chunkError,this)),t.open("GET",this._input,!r),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var i in e)t.setRequestHeader(i,e[i])}if(this._config.chunkSize){var n=this._start+this._config.chunkSize-1;t.setRequestHeader("Range","bytes="+this._start+"-"+n),t.setRequestHeader("If-None-Match","webkit-no-cache")}try{t.send()}catch(e){this._chunkError(e.message)}r&&0===t.status?this._chunkError():this._start+=this._config.chunkSize}},this._chunkLoaded=function(){4==t.readyState&&(t.status<200||t.status>=400?this._chunkError():(this._finished=!this._config.chunkSize||this._start>function(e){var t=e.getResponseHeader("Content-Range");return null===t?-1:parseInt(t.substr(t.lastIndexOf("/")+1))}(t),this.parseChunk(t.responseText)))},this._chunkError=function(e){var r=t.statusText||e;this._sendError(r)}}function c(e){var t,r;(e=e||{}).chunkSize||(e.chunkSize=o.LocalChunkSize),h.call(this,e);var i="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,r=e.slice||e.webkitSlice||e.mozSlice,i?((t=new FileReader).onload=k(this._chunkLoaded,this),t.onerror=k(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var n=Math.min(this._start+this._config.chunkSize,this._input.size);e=r.call(e,this._start,n)}var s=t.readAsText(e,this._config.encoding);i||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function l(e){var t;e=e||{},h.call(this,e),this.stream=function(e){return t=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e=this._config.chunkSize,r=e?t.substr(0,e):t;return t=e?t.substr(e):"",this._finished=!t,this.parseChunk(r)}}}function d(e){e=e||{},h.call(this,e);var t=[],r=!0;this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._nextChunk=function(){t.length?this.parseChunk(t.shift()):r=!0},this._streamData=k(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),r&&(r=!1,this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=k(function(e){this._streamCleanUp(),this._sendError(e.message)},this),this._streamEnd=k(function(){this._streamCleanUp(),this._finished=!0,this._streamData("")},this),this._streamCleanUp=k(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function p(e){var t,r,i,n=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,s=this,a=0,u=!1,h=!1,f=[],c={data:[],errors:[],meta:{}};if(w(e.step)){var l=e.step;e.step=function(t){if(c=t,p())d();else{if(d(),0===c.data.length)return;a+=t.data.length,e.preview&&a>e.preview?r.abort():l(c,s)}}}function d(){if(c&&i&&(m("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+o.DefaultDelimiter+"'"),i=!1),e.skipEmptyLines)for(var t=0;t<c.data.length;t++)1===c.data[t].length&&""===c.data[t][0]&&c.data.splice(t--,1);return p()&&function(){if(c){for(var e=0;p()&&e<c.data.length;e++)for(var t=0;t<c.data[e].length;t++)f.push(c.data[e][t]);c.data.splice(0,1)}}(),function(){if(!c||!e.header&&!e.dynamicTyping)return c;for(var t=0;t<c.data.length;t++){for(var r=e.header?{}:[],i=0;i<c.data[t].length;i++){var n=i,s=c.data[t][i];e.header&&(n=i>=f.length?"__parsed_extra":f[i]),s=g(n,s),"__parsed_extra"===n?(r[n]=r[n]||[],r[n].push(s)):r[n]=s}c.data[t]=r,e.header&&(i>f.length?m("FieldMismatch","TooManyFields","Too many fields: expected "+f.length+" fields but parsed "+i,t):i<f.length&&m("FieldMismatch","TooFewFields","Too few fields: expected "+f.length+" fields but parsed "+i,t))}return e.header&&c.meta&&(c.meta.fields=f),c}()}function p(){return e.header&&0===f.length}function g(t,r){return function(t){return e.dynamicTypingFunction&&void 0===e.dynamicTyping[t]&&(e.dynamicTyping[t]=e.dynamicTypingFunction(t)),!0===(e.dynamicTyping[t]||e.dynamicTyping)}(t)?"true"===r||"TRUE"===r||"false"!==r&&"FALSE"!==r&&function(e){return n.test(e)?parseFloat(e):e}(r):r}function m(e,t,r,i){c.errors.push({type:e,code:t,message:r,row:i})}this.parse=function(n,s,a){if(e.newline||(e.newline=function(e){var t=(e=e.substr(0,1048576)).split("\r"),r=e.split("\n"),i=r.length>1&&r[0].length<t[0].length;if(1===t.length||i)return"\n";for(var n=0,s=0;s<t.length;s++)"\n"===t[s][0]&&n++;return n>=t.length/2?"\r\n":"\r"}(n)),i=!1,e.delimiter)w(e.delimiter)&&(e.delimiter=e.delimiter(n),c.meta.delimiter=e.delimiter);else{var h=function(t,r){for(var i,n,s,a=[",","\t","|",";",o.RECORD_SEP,o.UNIT_SEP],u=0;u<a.length;u++){var h=a[u],f=0,c=0;s=void 0;for(var l=new _({delimiter:h,newline:r,preview:10}).parse(t),d=0;d<l.data.length;d++){var p=l.data[d].length;c+=p,void 0!==s?p>1&&(f+=Math.abs(p-s),s=p):s=p}l.data.length>0&&(c/=l.data.length),(void 0===n||f<n)&&c>1.99&&(n=f,i=h)}return e.delimiter=i,{successful:!!i,bestDelimiter:i}}(n,e.newline);h.successful?e.delimiter=h.bestDelimiter:(i=!0,e.delimiter=o.DefaultDelimiter),c.meta.delimiter=e.delimiter}var f=y(e);return e.preview&&e.header&&f.preview++,t=n,r=new _(f),c=r.parse(t,s,a),d(),u?{meta:{paused:!0}}:c||{meta:{paused:!1}}},this.paused=function(){return u},this.pause=function(){u=!0,r.abort(),t=t.substr(r.getCharIndex())},this.resume=function(){u=!1,s.streamer.parseChunk(t)},this.aborted=function(){return h},this.abort=function(){h=!0,r.abort(),c.meta.aborted=!0,w(e.complete)&&e.complete(c),t=""}}function _(e){var t=(e=e||{}).delimiter,r=e.newline,i=e.comments,n=e.step,s=e.preview,a=e.fastMode,u=e.quoteChar||'"';if(("string"!=typeof t||o.BAD_DELIMITERS.indexOf(t)>-1)&&(t=","),i===t)throw"Comment character same as delimiter";!0===i?i="#":("string"!=typeof i||o.BAD_DELIMITERS.indexOf(i)>-1)&&(i=!1),"\n"!=r&&"\r"!=r&&"\r\n"!=r&&(r="\n");var h=0,f=!1;this.parse=function(e,o,c){if("string"!=typeof e)throw"Input must be a string";var l=e.length,d=t.length,p=r.length,_=i.length,g=w(n);h=0;var m=[],v=[],y=[],k=0;if(!e)return A();if(a||!1!==a&&-1===e.indexOf(u)){for(var b=e.split(r),C=0;C<b.length;C++){var y=b[C];if(h+=y.length,C!==b.length-1)h+=r.length;else if(c)return A();if(!i||y.substr(0,_)!==i){if(g){if(m=[],I(y.split(t)),L(),f)return A()}else I(y.split(t));if(s&&C>=s)return m=m.slice(0,s),A(!0)}}return A()}for(var R=e.indexOf(t,h),E=e.indexOf(r,h),S=new RegExp(u+u,"g");;)if(e[h]!==u)if(i&&0===y.length&&e.substr(h,_)===i){if(-1===E)return A();h=E+p,E=e.indexOf(r,h),R=e.indexOf(t,h)}else if(-1!==R&&(R<E||-1===E))y.push(e.substring(h,R)),h=R+d,R=e.indexOf(t,h);else{if(-1===E)break;if(y.push(e.substring(h,E)),D(E+p),g&&(L(),f))return A();if(s&&m.length>=s)return A(!0)}else{var x=h;for(h++;;){var x=e.indexOf(u,x+1);if(-1===x)return c||v.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:m.length,index:h}),T();if(x===l-1){var O=e.substring(h,x).replace(S,u);return T(O)}if(e[x+1]!==u){if(e[x+1]===t){y.push(e.substring(h,x).replace(S,u)),h=x+1+d,R=e.indexOf(t,h),E=e.indexOf(r,h);break}if(e.substr(x+1,p)===r){if(y.push(e.substring(h,x).replace(S,u)),D(x+1+p),R=e.indexOf(t,h),g&&(L(),f))return A();if(s&&m.length>=s)return A(!0);break}}else x++}}return T();function I(e){m.push(e),k=h}function T(t){return c?A():(void 0===t&&(t=e.substr(h)),y.push(t),h=l,I(y),g&&L(),A())}function D(t){h=t,I(y),y=[],E=e.indexOf(r,h)}function A(e){return{data:m,errors:v,meta:{delimiter:t,linebreak:r,aborted:f,truncated:!!e,cursor:k+(o||0)}}}function L(){n(A()),m=[],v=[]}},this.abort=function(){f=!0},this.getCharIndex=function(){return h}}function g(e){var t=e.data,r=s[t.workerId],i=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){i=!0,m(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:v,resume:v};if(w(r.userStep)){for(var a=0;a<t.results.data.length&&(r.userStep({data:[t.results.data[a]],errors:t.results.errors,meta:t.results.meta},n),!i);a++);delete t.results}else w(r.userChunk)&&(r.userChunk(t.results,n,t.file),delete t.results)}t.finished&&!i&&m(t.workerId,t.results)}function m(e,t){var r=s[e];w(r.userComplete)&&r.userComplete(t),r.terminate(),delete s[e]}function v(){throw"Not implemented."}function y(e){if("object"!=typeof e)return e;var t=e instanceof Array?[]:{};for(var r in e)t[r]=y(e[r]);return t}function k(e,t){return function(){e.apply(t,arguments)}}function w(e){return"function"==typeof e}return i?t.onmessage=function(e){var r=e.data;if(void 0===o.WORKER_ID&&r&&(o.WORKER_ID=r.workerId),"string"==typeof r.input)t.postMessage({workerId:o.WORKER_ID,results:o.parse(r.input,r.config),finished:!0});else if(t.File&&r.input instanceof File||r.input instanceof Object){var i=o.parse(r.input,r.config);i&&t.postMessage({workerId:o.WORKER_ID,results:i,finished:!0})}}:o.WORKERS_SUPPORTED&&(e=function(){var e=document.getElementsByTagName("script");return e.length?e[e.length-1].src:""}(),document.body?document.addEventListener("DOMContentLoaded",function(){n=!0},!0):n=!0),f.prototype=Object.create(h.prototype),f.prototype.constructor=f,c.prototype=Object.create(h.prototype),c.prototype.constructor=c,l.prototype=Object.create(l.prototype),l.prototype.constructor=l,d.prototype=Object.create(h.prototype),d.prototype.constructor=d,o})?i.apply(t,n):i)||(e.exports=s)},374:function(e,t,r){e.exports={default:r(375),__esModule:!0}},375:function(e,t,r){r(78),r(376),e.exports=r(7).Array.from},376:function(e,t,r){"use strict";var i=r(21),n=r(11),s=r(44),a=r(102),o=r(103),u=r(52),h=r(377),f=r(101);n(n.S+n.F*!r(104)(function(e){Array.from(e)}),"Array",{from:function(e){var t,r,n,c,l=s(e),d="function"==typeof this?this:Array,p=arguments.length,_=p>1?arguments[1]:void 0,g=void 0!==_,m=0,v=f(l);if(g&&(_=i(_,p>2?arguments[2]:void 0,2)),void 0==v||d==Array&&o(v))for(r=new d(t=u(l.length));t>m;m++)h(r,m,g?_(l[m],m):l[m]);else for(c=v.call(l),r=new d;!(n=c.next()).done;m++)h(r,m,g?a(c,_,[n.value,m],!0):n.value);return r.length=m,r}})},377:function(e,t,r){"use strict";var i=r(17),n=r(39);e.exports=function(e,t,r){t in e?i.f(e,t,n(0,r)):e[t]=r}}}]);
//# sourceMappingURL=vendors~ui_cca_module~ui_parameter_image_module~ui_timeseries_module.js.map