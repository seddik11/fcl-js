!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("queue-microtask")):"function"==typeof define&&define.amd?define(["exports","queue-microtask"],e):e((n=n||self).utilActor={},n.queueMicrotask)}(this,function(n,e){function t(){return(t=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n}).apply(this,arguments)}function r(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function o(n,e,t){if(!n.s){if(t instanceof i){if(!t.s)return void(t.o=o.bind(null,n,e));1&e&&(e=t.s),t=t.v}if(t&&t.then)return void t.then(o.bind(null,n,e),o.bind(null,n,2));n.s=e,n.v=t;var r=n.o;r&&r(n)}}e=e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e;var i=function(){function n(){}return n.prototype.then=function(e,t){var r=new n,i=this.s;if(i){var u=1&i?e:t;if(u){try{o(r,1,u(this.v))}catch(n){o(r,2,n)}return r}return this}return this.o=function(n){try{var i=n.v;1&n.s?o(r,1,e?e(i):i):t?o(r,1,t(i)):o(r,2,i)}catch(n){o(r,2,n)}},r},n}();function u(n){return n instanceof i&&1&n.s}function c(n,e,t){for(var r;;){var c=n();if(u(c)&&(c=c.v),!c)return f;if(c.then){r=0;break}var f=t();if(f&&f.then){if(!u(f)){r=1;break}f=f.s}if(e){var s=e();if(s&&s.then&&!u(s)){r=2;break}}}var a=new i,l=o.bind(null,a,2);return(0===r?c.then(d):1===r?f.then(v):s.then(h)).then(void 0,l),a;function v(r){f=r;do{if(e&&(s=e())&&s.then&&!u(s))return void s.then(h).then(void 0,l);if(!(c=n())||u(c)&&!c.v)return void o(a,1,f);if(c.then)return void c.then(d).then(void 0,l);u(f=t())&&(f=f.v)}while(!f||!f.then);f.then(v).then(void 0,l)}function d(n){n?(f=t())&&f.then?f.then(v).then(void 0,l):v(f):o(a,1,f)}function h(){(c=n())?c.then?c.then(d).then(void 0,l):d(c):o(a,1,f)}}var f="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global||"object"==typeof window&&window.window===window&&window;f.FCL_REGISTRY=null==f.FCL_REGISTRY?{}:f.FCL_REGISTRY;var s=0,a=function(n,e,t,r){return void 0===r&&(r={}),new Promise(function(o,i){var u=r.expectReply||!1,c=null!=r.timeout?r.timeout:5e3;u&&c&&setTimeout(function(){return i(new Error("Timeout: "+c+"ms passed without a response."))},c);var s={to:n,from:r.from,tag:e,data:t,timeout:c,reply:o,reject:i};try{f.FCL_REGISTRY[n].mailbox.deliver(s),u||o(!0)}catch(n){console.error("FCL.Actor -- Could Not Deliver Message",s,n)}})},l=function(n){delete f.FCL_REGISTRY[n]},v=function(n,o){if(void 0===o&&(o=null),null==o&&(o=++s),null!=f.FCL_REGISTRY[o])return o;var i,u;f.FCL_REGISTRY[o]={addr:o,mailbox:(u=[],{deliver:function(n){try{return u.push(n),i&&(i(u.shift()),i=void 0),Promise.resolve()}catch(n){return Promise.reject(n)}},receive:function(){return new Promise(function(n){var e=u.shift();if(e)return n(e);i=n})}}),subs:new Set,kvs:{}};var v,d={self:function(){return o},receive:function(){return f.FCL_REGISTRY[o].mailbox.receive()},send:function(n,e,t,r){return void 0===r&&(r={}),r.from=o,a(n,e,t,r)},sendSelf:function(n,e,t){f.FCL_REGISTRY[o]&&a(o,n,e,t)},broadcast:function(n,e,t){void 0===t&&(t={}),t.from=o;for(var i,u=function(n,e){var t="undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(t)return(t=t.call(n)).next.bind(t);if(Array.isArray(n)||(t=function(n,e){if(n){if("string"==typeof n)return r(n,void 0);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?r(n,void 0):void 0}}(n))){t&&(n=t);var o=0;return function(){return o>=n.length?{done:!0}:{done:!1,value:n[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(f.FCL_REGISTRY[o].subs);!(i=u()).done;)a(i.value,n,e,t)},subscribe:function(n){return null!=n&&f.FCL_REGISTRY[o].subs.add(n)},unsubscribe:function(n){return null!=n&&f.FCL_REGISTRY[o].subs.delete(n)},subscriberCount:function(){return f.FCL_REGISTRY[o].subs.size},hasSubs:function(){return!!f.FCL_REGISTRY[o].subs.size},put:function(n,e){null!=n&&(f.FCL_REGISTRY[o].kvs[n]=e)},get:function(n,e){var t=f.FCL_REGISTRY[o].kvs[n];return null==t?e:t},delete:function(n){delete f.FCL_REGISTRY[o].kvs[n]},update:function(n,e){null!=n&&(f.FCL_REGISTRY[o].kvs[n]=e(f.FCL_REGISTRY[o].kvs[n]))},keys:function(){return Object.keys(f.FCL_REGISTRY[o].kvs)},all:function(){return f.FCL_REGISTRY[o].kvs},where:function(n){return Object.keys(f.FCL_REGISTRY[o].kvs).reduce(function(e,r){var i;return n.test(r)?t({},e,((i={})[r]=f.FCL_REGISTRY[o].kvs[r],i)):e},{})},merge:function(n){void 0===n&&(n={}),Object.keys(n).forEach(function(e){return f.FCL_REGISTRY[o].kvs[e]=n[e]})}};return"object"==typeof n&&(void 0===(v=n)&&(v={}),n=function(n){try{var e=function(){var e,t=c(function(){return!e&&1},void 0,function(){return Promise.resolve(n.receive()).then(function(t){var r=function(r,o){try{var i=function(r,o){try{var i=function(){function r(){return Promise.resolve(v[t.tag](n,t,t.data||{})).then(function(){})}var o=function(){if("EXIT"===t.tag){var r=function(){e=1},o=function(){if("function"==typeof v.TERMINATE)return Promise.resolve(v.TERMINATE(n,t,t.data||{})).then(function(){})}();return o&&o.then?o.then(r):r()}}();return o&&o.then?o.then(r):r()}()}catch(n){return o(n)}return i&&i.then?i.then(void 0,o):i}(0,function(e){console.error(n.self()+" Error",t,e)})}catch(n){return}return i&&i.then?i.then(o.bind(null,!1),o.bind(null,!0)):void 0}(0,function(n,e){});if(r&&r.then)return r.then(function(){})})}),r=function(){if(t&&t.then)return t.then(function(){})}();if(r&&r.then)return r.then(function(){})},t=function(){if("function"==typeof v.INIT)return Promise.resolve(v.INIT(n)).then(function(){})}();return Promise.resolve(t&&t.then?t.then(e):e())}catch(n){return Promise.reject(n)}}),e(function(){try{return Promise.resolve(n(d)).then(function(){l(o)})}catch(n){return Promise.reject(n)}}),o};n.EXIT="EXIT",n.INIT="INIT",n.SNAPSHOT="SNAPSHOT",n.SUBSCRIBE="SUBSCRIBE",n.TERMINATE="TERMINATE",n.UNSUBSCRIBE="UNSUBSCRIBE",n.UPDATED="UPDATED",n.kill=l,n.send=a,n.snapshoter=function(n,e){return e(n),a(n,"SNAPSHOT",null,{expectReply:!0,timeout:0})},n.spawn=v,n.subscriber=function(n,e,t){e(n);var r=v(function(e){try{var r;return e.send(n,"SUBSCRIBE"),Promise.resolve(c(function(){return!r&&1},void 0,function(){return Promise.resolve(e.receive()).then(function(o){if("@EXIT"===o.tag)return e.send(n,"UNSUBSCRIBE"),void(r=1);t(o.data)})}))}catch(n){return Promise.reject(n)}});return function(){return a(r,"@EXIT")}}});
//# sourceMappingURL=actor.umd.js.map
