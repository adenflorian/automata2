parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"g1fQ":[function(require,module,exports) {
module.exports="precision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D state;\n\nvoid main(void) {\n    vec2 coord = vec2(gl_FragCoord) / 1024.0;\n\n    gl_FragColor = texture2D(state, coord);\n}\n";
},{}],"4NlF":[function(require,module,exports) {
module.exports="precision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D previousState;\n\nfloat size = 1024.0;\nfloat fadeRate = 0.003;\n\nint wasPixelAlive(float pixel) {\n  return pixel == 1.0\n    ? 1\n    : 0;\n}\n\nint wasAlive(vec2 coord) {\n  if (\n    coord.x < 0.0 || \n    coord.x > size || \n    coord.y < 0.0 || \n    coord.y > size\n  ) return 0;\n\n  vec4 px = texture2D(previousState, coord / size);\n\n  return wasPixelAlive(px.r);\n}\n\nvoid main(void) {\n  vec2 coord = gl_FragCoord.xy;\n  vec2 coordNormalized = coord / size;\n  vec4 px = texture2D(previousState, coordNormalized);\n\n  int aliveNeighbors =\n    wasAlive(coord + vec2(-1.0, -1.0)) +\n    wasAlive(coord + vec2(-1.0, 0.0)) +\n    wasAlive(coord + vec2(-1.0, 1.0)) +\n    wasAlive(coord + vec2(0.0, -1.0)) +\n    wasAlive(coord + vec2(0.0, 1.0)) +\n    wasAlive(coord + vec2(1.0, -1.0)) +\n    wasAlive(coord + vec2(1.0, 0.0)) +\n    wasAlive(coord + vec2(1.0, 1.0));\n\n  bool nowAlive = wasAlive(coord) == 1\n    ? aliveNeighbors == 2 || aliveNeighbors == 3\n    : aliveNeighbors == 3;\n  \n  gl_FragColor = nowAlive\n    ? vec4(1.0, coordNormalized.x / 1.0, coordNormalized.y / 1.0, 1.0) \n    : px - vec4(fadeRate, fadeRate, fadeRate, 1.0);\n}\n";
},{}],"XBDg":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=e(require("./display.glsl")),a=e(require("./conway.glsl"));console.log("start");var t=new Image;t.onload=function(){var e=document.getElementById("canvas").getContext("webgl");function E(r,a){var t=e.createShader(r);return e.shaderSource(t,a),e.compileShader(t),e.getShaderParameter(t,e.COMPILE_STATUS)||console.error("Could not compile shader",r,a,e.getShaderInfoLog(t)),t}var T=E(e.VERTEX_SHADER,"\n            attribute vec2 coord;\n            void main(void) {\n                gl_Position = vec4(coord, 0.0, 1.0);\n            }\n        "),o=E(e.FRAGMENT_SHADER,r.default),n=E(e.FRAGMENT_SHADER,a.default);function R(r,a){var t=e.createProgram();return e.attachShader(t,r),e.attachShader(t,a),e.linkProgram(t),e.getProgramParameter(t,e.LINK_STATUS)||console.error("Error linking program",e.getProgramInfoLog(t)),t}var i=R(T,o),u=R(T,n);e.useProgram(u);var A=e.getAttribLocation(u,"coord"),f=e.getUniformLocation(u,"previousState"),_=(e.getAttribLocation(i,"coord"),e.getUniformLocation(i,"state")),m=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,m),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,1,1,-1,1]),e.STATIC_DRAW),e.vertexAttribPointer(A,2,e.FLOAT,!1,0,0);var F=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,F),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint8Array([0,1,2,3]),e.STATIC_DRAW);var c=e.createTexture();e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,c),e.texImage2D(e.TEXTURE_2D,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.generateMipmap(e.TEXTURE_2D);var U=e.createTexture();e.activeTexture(e.TEXTURE0+1),e.bindTexture(e.TEXTURE_2D,U),e.texImage2D(e.TEXTURE_2D,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.generateMipmap(e.TEXTURE_2D);var d=[e.createFramebuffer(),e.createFramebuffer()];e.bindFramebuffer(e.FRAMEBUFFER,d[0]),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,c,0),e.bindFramebuffer(e.FRAMEBUFFER,d[1]),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,U,0);var g=0;requestAnimationFrame(function r(){var a=1-g;e.bindFramebuffer(e.FRAMEBUFFER,d[g]);e.useProgram(u);e.enableVertexAttribArray(A);e.uniform1i(f,a);e.drawElements(e.TRIANGLE_FAN,4,e.UNSIGNED_BYTE,0);e.bindFramebuffer(e.FRAMEBUFFER,null);e.useProgram(i);e.uniform1i(_,g);e.drawElements(e.TRIANGLE_FAN,4,e.UNSIGNED_BYTE,0);g=a;requestAnimationFrame(r)})},t.src="/game-of-life.png";
},{"./display.glsl":"g1fQ","./conway.glsl":"4NlF"}]},{},["XBDg"], null)
//# sourceMappingURL=/fisher.97a31e6b.map