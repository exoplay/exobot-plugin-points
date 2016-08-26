require("source-map-support").install();
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("@exoplay/exobot")):"function"==typeof define&&define.amd?define(["@exoplay/exobot"],e):"object"==typeof exports?exports["points.js"]=e(require("@exoplay/exobot")):t["points.js"]=e(t["@exoplay/exobot"])}(this,function(t){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};return e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,e,r){Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e){t.exports=require("@exoplay/exobot")},function(t,e,r){"use strict";function n(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,r){function n(o,i){try{var s=e[o](i),u=s.value}catch(a){return void r(a)}return s.done?void t(u):Promise.resolve(u).then(function(t){return n("next",t)},function(t){return n("throw",t)})}return n("next")})}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e,r,n,o){var i={};return Object.keys(n).forEach(function(t){i[t]=n[t]}),i.enumerable=!!i.enumerable,i.configurable=!!i.configurable,("value"in i||i.initializer)&&(i.writable=!0),i=r.slice().reverse().reduce(function(r,n){return n(t,e,r)||r},i),o&&void 0!==i.initializer&&(i.value=i.initializer?i.initializer.call(o):void 0,i.initializer=void 0),void 0===i.initializer&&(Object.defineProperty(t,e,i),i=null),i}var a=r(0),p=a&&a.__esModule?function(){return a["default"]}:function(){return a};r.d(p,"a",p),r.d(e,"nameToId",function(){return j}),r.d(e,"Points",function(){return P});var c,l,f,h,b,y,d,v,g,m,w=function(){function t(t,e){var r=[],n=!0,o=!1,i=void 0;try{for(var s,u=t[Symbol.iterator]();!(n=(s=u.next()).done)&&(r.push(s.value),!e||r.length!==e);n=!0);}catch(a){o=!0,i=a}finally{try{!n&&u["return"]&&u["return"]()}finally{if(o)throw i}}return r}return function(e,r){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),x=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),O=function k(t,e,r){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,e);if(void 0===n){var o=Object.getPrototypeOf(t);return null===o?void 0:k(o,e,r)}if("value"in n)return n.value;var i=n.get;if(void 0!==i)return i.call(r)},j=function(t){return t.replace(/[^\w]/g,"").toLowerCase()},P=(c=r.i(a.permissionGroup)("points"),l=r.i(a.help)('thing++ or thing-- to add or remove points. Optionally, "thing++ for <reason>"'),f=r.i(a.listen)(/^([\s\w'@.\-:]*)\s*([\+\-]{2})(?:\s+for (.*))?$/i),h=r.i(a.permissionGroup)("points"),b=r.i(a.help)("/top <n> to show top <n> users."),y=r.i(a.respond)(/^tops?\s*(\d*)?$/i),d=r.i(a.permissionGroup)("points"),v=r.i(a.help)("/score <user> to show score for a user."),g=r.i(a.respond)(/^score(?: for)?(.*)$/i),m=function(t){function e(){return o(this,e),i(this,Object.getPrototypeOf(e).apply(this,arguments))}return s(e,t),x(e,[{key:"register",value:function(t){O(Object.getPrototypeOf(e.prototype),"register",this).call(this,t),this.database("points",{things:{},tops:[]})}},{key:"changePoints",value:function(){function t(t){return e.apply(this,arguments)}var e=n(regeneratorRuntime.mark(function r(t){var e,n,o,i,s=w(t,4),u=s[1],a=s[2],p=s[3];return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return u=u.trim(),e=j(u),t.next=4,this.databaseInitialized();case 4:return n=this.bot.db.get("points.things."+e).value(),n||(n=this.buildPoints(u,e)),"++"===a?n.points=n.points+1:n.points=n.points-1,p&&(o=j(p),i=n.reasons[o]||{score:0,reason:p},i.score++,n.reasons[o]=i),this.bot.db.set("points.things."+e,n).value(),this.bot.db.write(),this.updateTops(),t.abrupt("return",u+" has "+n.points+" points.");case 12:case"end":return t.stop()}},r,this)}));return t}()},{key:"tops",value:function(){function t(t){return e.apply(this,arguments)}var e=n(regeneratorRuntime.mark(function r(t){var e,n,o,i=w(t,2),s=i[1],u=void 0===s?10:s;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.databaseInitialized();case 2:return u>25&&(u=25),e=this.bot.db.get("points.things").value(),n=this.bot.db.get("points.tops").slice(0,u).value(),o=["Top "+Math.min(u,n.length)+":"],n.forEach(function(t){return o.push(e[t].name+": "+e[t].points)}),t.abrupt("return",o.join("\n"));case 8:case"end":return t.stop()}},r,this)}));return t}()},{key:"score",value:function(){function t(t){return e.apply(this,arguments)}var e=n(regeneratorRuntime.mark(function r(t){var e,n,o,i,s,u=w(t,2),a=u[1];return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=a.trim(),e=j(a),t.next=4,this.databaseInitialized();case 4:return n=this.bot.db.get("points.things."+e).value(),o=n.reasons,i=[a+" has "+n.points+" points."],s=Object.keys(n.reasons),s.length>0&&(i.push("Here are some reasons:"),s.forEach(function(t){i.push(o[t].reason+": "+o[t].score+" points")})),t.abrupt("return",i.join("\n"));case 10:case"end":return t.stop()}},r,this)}));return t}()},{key:"updateTops",value:function(){function t(){return e.apply(this,arguments)}var e=n(regeneratorRuntime.mark(function r(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.databaseInitialized();case 2:t=this.bot.db.get("points.things").orderBy("points","desc").map("id").value(),this.bot.db.set("points.tops",t).value(),this.bot.db.write();case 5:case"end":return e.stop()}},r,this)}));return t}()},{key:"buildPoints",value:function(t,e){return{name:t,id:e,points:0,reasons:{}}}}]),e}(a.ChatPlugin),u(m.prototype,"changePoints",[c,l,f],Object.getOwnPropertyDescriptor(m.prototype,"changePoints"),m.prototype),u(m.prototype,"tops",[h,b,y],Object.getOwnPropertyDescriptor(m.prototype,"tops"),m.prototype),u(m.prototype,"score",[d,v,g],Object.getOwnPropertyDescriptor(m.prototype,"score"),m.prototype),m)}])});
//# sourceMappingURL=points.js.map