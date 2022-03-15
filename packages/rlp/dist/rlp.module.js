import{Buffer as r}from"buffer";export{Buffer}from"buffer";function n(e){if(Array.isArray(e)){for(var f=[],i=0;i<e.length;i++)f.push(n(e[i]));var u=r.concat(f);return r.concat([t(u.length,192),u])}var a=o(e);return 1===a.length&&a[0]<128?a:r.concat([t(a.length,128),a])}function t(n,t){if(n<56)return r.from([n+t]);var e=i(n),f=i(t+55+e.length/2);return r.from(f+e,"hex")}function e(n){if(!n||0===n.length)return r.from([]);var t=o(n),e=t[0];if(e<=127)return t.length;if(e<=183)return e-127;if(e<=191)return e-182;if(e<=247)return e-191;var f=e-246;return f+function(r,n){if("00"===r.slice(0,2))throw new Error("invalid RLP: extra zeros");return parseInt(r,16)}(t.slice(1,f).toString("hex"))}function f(r){return"0x"===r.slice(0,2)}function i(r){if(r<0)throw new Error("Invalid integer as argument, must be unsigned!");var n=r.toString(16);return n.length%2?"0"+n:n}function o(n){if(!r.isBuffer(n)){if("string"==typeof n)return f(n)?r.from((e="string"!=typeof(o=n)?o:f(o)?o.slice(2):o).length%2?"0"+e:e,"hex"):r.from(n);if("number"==typeof n)return n?(t=i(n),r.from(t,"hex")):r.from([]);if(null==n)return r.from([]);if(n instanceof Uint8Array)return r.from(n);throw new Error("invalid type")}var t,e,o;return n}export{n as encode,e as getLength,o as toBuffer};
//# sourceMappingURL=rlp.module.js.map
