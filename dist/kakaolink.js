/*
 * MIT License
 *
 * Copyright (c) 2021 naijun0403
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

(function (module, exports, require) {

    /*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
    var CryptoJS=CryptoJS||function(u, p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
        r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
                32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
                2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
        q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
                a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
            e)).finalize(b)}}});var n=d.algo={};return d}(Math);
    (function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
        l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
    (function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
        _doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
            f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
                m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
                E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
            4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
    (function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
        l)}})();
    CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
        finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
        c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
            e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
            this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
            1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
        decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
            b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
    (function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
        16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
        8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
            d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();

    exports.CryptoJS = CryptoJS;

    const base64 = {};

    base64.byteLength = byteLength;
    base64.toByteArray = toByteArray;
    base64.fromByteArray = fromByteArray;

    var lookup = []
    var revLookup = []
    var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    for (var i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i]
        revLookup[code.charCodeAt(i)] = i
    }

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
    revLookup['-'.charCodeAt(0)] = 62
    revLookup['_'.charCodeAt(0)] = 63

    function getLens (b64) {
        var len = b64.length

        if (len % 4 > 0) {
            throw new Error('Invalid string. Length must be a multiple of 4')
        }

        // Trim off extra bytes after placeholder bytes are found
        // See: https://github.com/beatgammit/base64-js/issues/42
        var validLen = b64.indexOf('=')
        if (validLen === -1) validLen = len

        var placeHoldersLen = validLen === len
            ? 0
            : 4 - (validLen % 4)

        return [validLen, placeHoldersLen]
    }

// base64 is 4/3 + up to two characters of the original data
    function byteLength (b64) {
        var lens = getLens(b64)
        var validLen = lens[0]
        var placeHoldersLen = lens[1]
        return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
    }

    function _byteLength (b64, validLen, placeHoldersLen) {
        return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
    }

    function toByteArray (b64) {
        var tmp
        var lens = getLens(b64)
        var validLen = lens[0]
        var placeHoldersLen = lens[1]

        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

        var curByte = 0

        // if there are placeholders, only get up to the last complete 4 chars
        var len = placeHoldersLen > 0
            ? validLen - 4
            : validLen

        var i
        for (i = 0; i < len; i += 4) {
            tmp =
                (revLookup[b64.charCodeAt(i)] << 18) |
                (revLookup[b64.charCodeAt(i + 1)] << 12) |
                (revLookup[b64.charCodeAt(i + 2)] << 6) |
                revLookup[b64.charCodeAt(i + 3)]
            arr[curByte++] = (tmp >> 16) & 0xFF
            arr[curByte++] = (tmp >> 8) & 0xFF
            arr[curByte++] = tmp & 0xFF
        }

        if (placeHoldersLen === 2) {
            tmp =
                (revLookup[b64.charCodeAt(i)] << 2) |
                (revLookup[b64.charCodeAt(i + 1)] >> 4)
            arr[curByte++] = tmp & 0xFF
        }

        if (placeHoldersLen === 1) {
            tmp =
                (revLookup[b64.charCodeAt(i)] << 10) |
                (revLookup[b64.charCodeAt(i + 1)] << 4) |
                (revLookup[b64.charCodeAt(i + 2)] >> 2)
            arr[curByte++] = (tmp >> 8) & 0xFF
            arr[curByte++] = tmp & 0xFF
        }

        return arr
    }

    function tripletToBase64 (num) {
        return lookup[num >> 18 & 0x3F] +
            lookup[num >> 12 & 0x3F] +
            lookup[num >> 6 & 0x3F] +
            lookup[num & 0x3F]
    }

    function encodeChunk (uint8, start, end) {
        var tmp
        var output = []
        for (var i = start; i < end; i += 3) {
            tmp =
                ((uint8[i] << 16) & 0xFF0000) +
                ((uint8[i + 1] << 8) & 0xFF00) +
                (uint8[i + 2] & 0xFF)
            output.push(tripletToBase64(tmp))
        }
        return output.join('')
    }

    function fromByteArray (uint8) {
        var tmp
        var len = uint8.length
        var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
        var parts = []
        var maxChunkLength = 16383 // must be multiple of 3

        // go through the array every three bytes, we'll deal with trailing stuff later
        for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
            parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
        }

        // pad the end with zeros, but make sure to not forget the extra bytes
        if (extraBytes === 1) {
            tmp = uint8[len - 1]
            parts.push(
                lookup[tmp >> 2] +
                lookup[(tmp << 4) & 0x3F] +
                '=='
            )
        } else if (extraBytes === 2) {
            tmp = (uint8[len - 2] << 8) + uint8[len - 1]
            parts.push(
                lookup[tmp >> 10] +
                lookup[(tmp >> 4) & 0x3F] +
                lookup[(tmp << 2) & 0x3F] +
                '='
            )
        }

        return parts.join('')
    }

    const ieee754 = {};

    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    ieee754.read = function (buffer, offset, isLE, mLen, nBytes) {
        let e, m
        const eLen = (nBytes * 8) - mLen - 1
        const eMax = (1 << eLen) - 1
        const eBias = eMax >> 1
        let nBits = -7
        let i = isLE ? (nBytes - 1) : 0
        const d = isLE ? -1 : 1
        let s = buffer[offset + i]

        i += d

        e = s & ((1 << (-nBits)) - 1)
        s >>= (-nBits)
        nBits += eLen
        while (nBits > 0) {
            e = (e * 256) + buffer[offset + i]
            i += d
            nBits -= 8
        }

        m = e & ((1 << (-nBits)) - 1)
        e >>= (-nBits)
        nBits += mLen
        while (nBits > 0) {
            m = (m * 256) + buffer[offset + i]
            i += d
            nBits -= 8
        }

        if (e === 0) {
            e = 1 - eBias
        } else if (e === eMax) {
            return m ? NaN : ((s ? -1 : 1) * Infinity)
        } else {
            m = m + Math.pow(2, mLen)
            e = e - eBias
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
    }

    ieee754.write = function (buffer, value, offset, isLE, mLen, nBytes) {
        let e, m, c
        let eLen = (nBytes * 8) - mLen - 1
        const eMax = (1 << eLen) - 1
        const eBias = eMax >> 1
        const rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
        let i = isLE ? 0 : (nBytes - 1)
        const d = isLE ? 1 : -1
        const s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

        value = Math.abs(value)

        if (isNaN(value) || value === Infinity) {
            m = isNaN(value) ? 1 : 0
            e = eMax
        } else {
            e = Math.floor(Math.log(value) / Math.LN2)
            if (value * (c = Math.pow(2, -e)) < 1) {
                e--
                c *= 2
            }
            if (e + eBias >= 1) {
                value += rt / c
            } else {
                value += rt * Math.pow(2, 1 - eBias)
            }
            if (value * c >= 2) {
                e++
                c /= 2
            }

            if (e + eBias >= eMax) {
                m = 0
                e = eMax
            } else if (e + eBias >= 1) {
                m = ((value * c) - 1) * Math.pow(2, mLen)
                e = e + eBias
            } else {
                m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
                e = 0
            }
        }

        while (mLen >= 8) {
            buffer[offset + i] = m & 0xff
            i += d
            m /= 256
            mLen -= 8
        }

        e = (e << mLen) | m
        eLen += mLen
        while (eLen > 0) {
            buffer[offset + i] = e & 0xff
            i += d
            e /= 256
            eLen -= 8
        }

        buffer[offset + i - d] |= s * 128
    }

    /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
    /* eslint-disable no-proto */

    'use strict'

    const buffer = {};

    var customInspectSymbol =
        (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
            ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
            : null

    buffer.Buffer = Buffer
    buffer.SlowBuffer = SlowBuffer
    buffer.INSPECT_MAX_BYTES = 50

    var K_MAX_LENGTH = 0x7fffffff
    buffer.kMaxLength = K_MAX_LENGTH

    /**
     * If `Buffer.TYPED_ARRAY_SUPPORT`:
     *   === true    Use Uint8Array implementation (fastest)
     *   === false   Print warning and recommend using `buffer` v4.x which has an Object
     *               implementation (most compatible, even IE6)
     *
     * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
     * Opera 11.6+, iOS 4.2+.
     *
     * We report that the browser does not support typed arrays if they are not subclassable
     * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
     * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
     * for __proto__ and has a buggy typed array implementation.
     */
    Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

    if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
        typeof console.error === 'function') {
        console.error(
            'This browser lacks typed array (Uint8Array) support which is required by ' +
            '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
        )
    }

    function typedArraySupport () {
        // Can type array instances can be augmented?
        try {
            var arr = new Uint8Array(1)
            var proto = { foo: function () { return 42 } }
            Object.setPrototypeOf(proto, Uint8Array.prototype)
            Object.setPrototypeOf(arr, proto)
            return arr.foo() === 42
        } catch (e) {
            return false
        }
    }

    Object.defineProperty(Buffer.prototype, 'parent', {
        enumerable: true,
        get: function () {
            if (!Buffer.isBuffer(this)) return undefined
            return this.buffer
        }
    })

    Object.defineProperty(Buffer.prototype, 'offset', {
        enumerable: true,
        get: function () {
            if (!Buffer.isBuffer(this)) return undefined
            return this.byteOffset
        }
    })

    function createBuffer (length) {
        if (length > K_MAX_LENGTH) {
            throw new RangeError('The value "' + length + '" is invalid for option "size"')
        }
        // Return an augmented `Uint8Array` instance
        var buf = new Uint8Array(length)
        Object.setPrototypeOf(buf, Buffer.prototype)
        return buf
    }

    /**
     * The Buffer constructor returns instances of `Uint8Array` that have their
     * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
     * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
     * and the `Uint8Array` methods. Square bracket notation works as expected -- it
     * returns a single octet.
     *
     * The `Uint8Array` prototype remains unmodified.
     */

    function Buffer (arg, encodingOrOffset, length) {
        // Common case.
        if (typeof arg === 'number') {
            if (typeof encodingOrOffset === 'string') {
                throw new TypeError(
                    'The "string" argument must be of type string. Received type number'
                )
            }
            return allocUnsafe(arg)
        }
        return from(arg, encodingOrOffset, length)
    }

    Buffer.poolSize = 8192 // not used by this implementation

    function from (value, encodingOrOffset, length) {
        if (typeof value === 'string') {
            return fromString(value, encodingOrOffset)
        }

        if (ArrayBuffer.isView(value)) {
            return fromArrayView(value)
        }

        if (value == null) {
            throw new TypeError(
                'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
                'or Array-like Object. Received type ' + (typeof value)
            )
        }

        if (isInstance(value, ArrayBuffer) ||
            (value && isInstance(value.buffer, ArrayBuffer))) {
            return fromArrayBuffer(value, encodingOrOffset, length)
        }

        if (typeof SharedArrayBuffer !== 'undefined' &&
            (isInstance(value, SharedArrayBuffer) ||
                (value && isInstance(value.buffer, SharedArrayBuffer)))) {
            return fromArrayBuffer(value, encodingOrOffset, length)
        }

        if (typeof value === 'number') {
            throw new TypeError(
                'The "value" argument must not be of type number. Received type number'
            )
        }

        var valueOf = value.valueOf && value.valueOf()
        if (valueOf != null && valueOf !== value) {
            return Buffer.from(valueOf, encodingOrOffset, length)
        }

        var b = fromObject(value)
        if (b) return b

        if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
            typeof value[Symbol.toPrimitive] === 'function') {
            return Buffer.from(
                value[Symbol.toPrimitive]('string'), encodingOrOffset, length
            )
        }

        throw new TypeError(
            'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
            'or Array-like Object. Received type ' + (typeof value)
        )
    }

    /**
     * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
     * if value is a number.
     * Buffer.from(str[, encoding])
     * Buffer.from(array)
     * Buffer.from(buffer)
     * Buffer.from(arrayBuffer[, byteOffset[, length]])
     **/
    Buffer.from = function (value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length)
    }

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
    Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
    Object.setPrototypeOf(Buffer, Uint8Array)

    function assertSize (size) {
        if (typeof size !== 'number') {
            throw new TypeError('"size" argument must be of type number')
        } else if (size < 0) {
            throw new RangeError('The value "' + size + '" is invalid for option "size"')
        }
    }

    function alloc (size, fill, encoding) {
        assertSize(size)
        if (size <= 0) {
            return createBuffer(size)
        }
        if (fill !== undefined) {
            // Only pay attention to encoding if it's a string. This
            // prevents accidentally sending in a number that would
            // be interpreted as a start offset.
            return typeof encoding === 'string'
                ? createBuffer(size).fill(fill, encoding)
                : createBuffer(size).fill(fill)
        }
        return createBuffer(size)
    }

    /**
     * Creates a new filled Buffer instance.
     * alloc(size[, fill[, encoding]])
     **/
    Buffer.alloc = function (size, fill, encoding) {
        return alloc(size, fill, encoding)
    }

    function allocUnsafe (size) {
        assertSize(size)
        return createBuffer(size < 0 ? 0 : checked(size) | 0)
    }

    /**
     * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
     * */
    Buffer.allocUnsafe = function (size) {
        return allocUnsafe(size)
    }
    /**
     * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
     */
    Buffer.allocUnsafeSlow = function (size) {
        return allocUnsafe(size)
    }

    function fromString (string, encoding) {
        if (typeof encoding !== 'string' || encoding === '') {
            encoding = 'utf8'
        }

        if (!Buffer.isEncoding(encoding)) {
            throw new TypeError('Unknown encoding: ' + encoding)
        }

        var length = byteLength(string, encoding) | 0
        var buf = createBuffer(length)

        var actual = buf.write(string, encoding)

        if (actual !== length) {
            // Writing a hex string, for example, that contains invalid characters will
            // cause everything after the first invalid character to be ignored. (e.g.
            // 'abxxcd' will be treated as 'ab')
            buf = buf.slice(0, actual)
        }

        return buf
    }

    function fromArrayLike (array) {
        var length = array.length < 0 ? 0 : checked(array.length) | 0
        var buf = createBuffer(length)
        for (var i = 0; i < length; i += 1) {
            buf[i] = array[i] & 255
        }
        return buf
    }

    function fromArrayView (arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
            var copy = new Uint8Array(arrayView)
            return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
        }
        return fromArrayLike(arrayView)
    }

    function fromArrayBuffer (array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
            throw new RangeError('"offset" is outside of buffer bounds')
        }

        if (array.byteLength < byteOffset + (length || 0)) {
            throw new RangeError('"length" is outside of buffer bounds')
        }

        var buf
        if (byteOffset === undefined && length === undefined) {
            buf = new Uint8Array(array)
        } else if (length === undefined) {
            buf = new Uint8Array(array, byteOffset)
        } else {
            buf = new Uint8Array(array, byteOffset, length)
        }

        // Return an augmented `Uint8Array` instance
        Object.setPrototypeOf(buf, Buffer.prototype)

        return buf
    }

    function fromObject (obj) {
        if (Buffer.isBuffer(obj)) {
            var len = checked(obj.length) | 0
            var buf = createBuffer(len)

            if (buf.length === 0) {
                return buf
            }

            obj.copy(buf, 0, 0, len)
            return buf
        }

        if (obj.length !== undefined) {
            if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
                return createBuffer(0)
            }
            return fromArrayLike(obj)
        }

        if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
            return fromArrayLike(obj.data)
        }
    }

    function checked (length) {
        // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
        // length is NaN (which is otherwise coerced to zero.)
        if (length >= K_MAX_LENGTH) {
            throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
        }
        return length | 0
    }

    function SlowBuffer (length) {
        if (+length != length) { // eslint-disable-line eqeqeq
            length = 0
        }
        return Buffer.alloc(+length)
    }

    Buffer.isBuffer = function isBuffer (b) {
        return b != null && b._isBuffer === true &&
            b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
    }

    Buffer.compare = function compare (a, b) {
        if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
        if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
        if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
            throw new TypeError(
                'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
            )
        }

        if (a === b) return 0

        var x = a.length
        var y = b.length

        for (var i = 0, len = Math.min(x, y); i < len; ++i) {
            if (a[i] !== b[i]) {
                x = a[i]
                y = b[i]
                break
            }
        }

        if (x < y) return -1
        if (y < x) return 1
        return 0
    }

    Buffer.isEncoding = function isEncoding (encoding) {
        switch (String(encoding).toLowerCase()) {
            case 'hex':
            case 'utf8':
            case 'utf-8':
            case 'ascii':
            case 'latin1':
            case 'binary':
            case 'base64':
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return true
            default:
                return false
        }
    }

    Buffer.concat = function concat (list, length) {
        if (!Array.isArray(list)) {
            throw new TypeError('"list" argument must be an Array of Buffers')
        }

        if (list.length === 0) {
            return Buffer.alloc(0)
        }

        var i
        if (length === undefined) {
            length = 0
            for (i = 0; i < list.length; ++i) {
                length += list[i].length
            }
        }

        var buffer = Buffer.allocUnsafe(length)
        var pos = 0
        for (i = 0; i < list.length; ++i) {
            var buf = list[i]
            if (isInstance(buf, Uint8Array)) {
                if (pos + buf.length > buffer.length) {
                    Buffer.from(buf).copy(buffer, pos)
                } else {
                    Uint8Array.prototype.set.call(
                        buffer,
                        buf,
                        pos
                    )
                }
            } else if (!Buffer.isBuffer(buf)) {
                throw new TypeError('"list" argument must be an Array of Buffers')
            } else {
                buf.copy(buffer, pos)
            }
            pos += buf.length
        }
        return buffer
    }

    function byteLength (string, encoding) {
        if (Buffer.isBuffer(string)) {
            return string.length
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
            return string.byteLength
        }
        if (typeof string !== 'string') {
            throw new TypeError(
                'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
                'Received type ' + typeof string
            )
        }

        var len = string.length
        var mustMatch = (arguments.length > 2 && arguments[2] === true)
        if (!mustMatch && len === 0) return 0

        // Use a for loop to avoid recursion
        var loweredCase = false
        for (;;) {
            switch (encoding) {
                case 'ascii':
                case 'latin1':
                case 'binary':
                    return len
                case 'utf8':
                case 'utf-8':
                    return utf8ToBytes(string).length
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                    return len * 2
                case 'hex':
                    return len >>> 1
                case 'base64':
                    return base64ToBytes(string).length
                default:
                    if (loweredCase) {
                        return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
                    }
                    encoding = ('' + encoding).toLowerCase()
                    loweredCase = true
            }
        }
    }
    Buffer.byteLength = byteLength

    function slowToString (encoding, start, end) {
        var loweredCase = false

        // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
        // property of a typed array.

        // This behaves neither like String nor Uint8Array in that we set start/end
        // to their upper/lower bounds if the value passed is out of range.
        // undefined is handled specially as per ECMA-262 6th Edition,
        // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
        if (start === undefined || start < 0) {
            start = 0
        }
        // Return early if start > this.length. Done here to prevent potential uint32
        // coercion fail below.
        if (start > this.length) {
            return ''
        }

        if (end === undefined || end > this.length) {
            end = this.length
        }

        if (end <= 0) {
            return ''
        }

        // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
        end >>>= 0
        start >>>= 0

        if (end <= start) {
            return ''
        }

        if (!encoding) encoding = 'utf8'

        while (true) {
            switch (encoding) {
                case 'hex':
                    return hexSlice(this, start, end)

                case 'utf8':
                case 'utf-8':
                    return utf8Slice(this, start, end)

                case 'ascii':
                    return asciiSlice(this, start, end)

                case 'latin1':
                case 'binary':
                    return latin1Slice(this, start, end)

                case 'base64':
                    return base64Slice(this, start, end)

                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                    return utf16leSlice(this, start, end)

                default:
                    if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
                    encoding = (encoding + '').toLowerCase()
                    loweredCase = true
            }
        }
    }

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
    Buffer.prototype._isBuffer = true

    function swap (b, n, m) {
        var i = b[n]
        b[n] = b[m]
        b[m] = i
    }

    Buffer.prototype.swap16 = function swap16 () {
        var len = this.length
        if (len % 2 !== 0) {
            throw new RangeError('Buffer size must be a multiple of 16-bits')
        }
        for (var i = 0; i < len; i += 2) {
            swap(this, i, i + 1)
        }
        return this
    }

    Buffer.prototype.swap32 = function swap32 () {
        var len = this.length
        if (len % 4 !== 0) {
            throw new RangeError('Buffer size must be a multiple of 32-bits')
        }
        for (var i = 0; i < len; i += 4) {
            swap(this, i, i + 3)
            swap(this, i + 1, i + 2)
        }
        return this
    }

    Buffer.prototype.swap64 = function swap64 () {
        var len = this.length
        if (len % 8 !== 0) {
            throw new RangeError('Buffer size must be a multiple of 64-bits')
        }
        for (var i = 0; i < len; i += 8) {
            swap(this, i, i + 7)
            swap(this, i + 1, i + 6)
            swap(this, i + 2, i + 5)
            swap(this, i + 3, i + 4)
        }
        return this
    }

    Buffer.prototype.toString = function toString () {
        var length = this.length
        if (length === 0) return ''
        if (arguments.length === 0) return utf8Slice(this, 0, length)
        return slowToString.apply(this, arguments)
    }

    Buffer.prototype.toLocaleString = Buffer.prototype.toString

    Buffer.prototype.equals = function equals (b) {
        if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
        if (this === b) return true
        return Buffer.compare(this, b) === 0
    }

    Buffer.prototype.inspect = function inspect () {
        var str = ''
        var max = buffer.INSPECT_MAX_BYTES
        str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
        if (this.length > max) str += ' ... '
        return '<Buffer ' + str + '>'
    }
    if (customInspectSymbol) {
        Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
    }

    Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
            target = Buffer.from(target, target.offset, target.byteLength)
        }
        if (!Buffer.isBuffer(target)) {
            throw new TypeError(
                'The "target" argument must be one of type Buffer or Uint8Array. ' +
                'Received type ' + (typeof target)
            )
        }

        if (start === undefined) {
            start = 0
        }
        if (end === undefined) {
            end = target ? target.length : 0
        }
        if (thisStart === undefined) {
            thisStart = 0
        }
        if (thisEnd === undefined) {
            thisEnd = this.length
        }

        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
            throw new RangeError('out of range index')
        }

        if (thisStart >= thisEnd && start >= end) {
            return 0
        }
        if (thisStart >= thisEnd) {
            return -1
        }
        if (start >= end) {
            return 1
        }

        start >>>= 0
        end >>>= 0
        thisStart >>>= 0
        thisEnd >>>= 0

        if (this === target) return 0

        var x = thisEnd - thisStart
        var y = end - start
        var len = Math.min(x, y)

        var thisCopy = this.slice(thisStart, thisEnd)
        var targetCopy = target.slice(start, end)

        for (var i = 0; i < len; ++i) {
            if (thisCopy[i] !== targetCopy[i]) {
                x = thisCopy[i]
                y = targetCopy[i]
                break
            }
        }

        if (x < y) return -1
        if (y < x) return 1
        return 0
    }

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
    function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
        // Empty buffer means no match
        if (buffer.length === 0) return -1

        // Normalize byteOffset
        if (typeof byteOffset === 'string') {
            encoding = byteOffset
            byteOffset = 0
        } else if (byteOffset > 0x7fffffff) {
            byteOffset = 0x7fffffff
        } else if (byteOffset < -0x80000000) {
            byteOffset = -0x80000000
        }
        byteOffset = +byteOffset // Coerce to Number.
        if (numberIsNaN(byteOffset)) {
            // byteOffset: if it's undefined, null, NaN, "foo", etc, search whole buffer
            byteOffset = dir ? 0 : (buffer.length - 1)
        }

        // Normalize byteOffset: negative offsets start from the end of the buffer
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset
        if (byteOffset >= buffer.length) {
            if (dir) return -1
            else byteOffset = buffer.length - 1
        } else if (byteOffset < 0) {
            if (dir) byteOffset = 0
            else return -1
        }

        // Normalize val
        if (typeof val === 'string') {
            val = Buffer.from(val, encoding)
        }

        // Finally, search either indexOf (if dir is true) or lastIndexOf
        if (Buffer.isBuffer(val)) {
            // Special case: looking for empty string/buffer always fails
            if (val.length === 0) {
                return -1
            }
            return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
        } else if (typeof val === 'number') {
            val = val & 0xFF // Search for a byte value [0-255]
            if (typeof Uint8Array.prototype.indexOf === 'function') {
                if (dir) {
                    return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
                } else {
                    return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
                }
            }
            return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
        }

        throw new TypeError('val must be string, number or Buffer')
    }

    function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
        var indexSize = 1
        var arrLength = arr.length
        var valLength = val.length

        if (encoding !== undefined) {
            encoding = String(encoding).toLowerCase()
            if (encoding === 'ucs2' || encoding === 'ucs-2' ||
                encoding === 'utf16le' || encoding === 'utf-16le') {
                if (arr.length < 2 || val.length < 2) {
                    return -1
                }
                indexSize = 2
                arrLength /= 2
                valLength /= 2
                byteOffset /= 2
            }
        }

        function read (buf, i) {
            if (indexSize === 1) {
                return buf[i]
            } else {
                return buf.readUInt16BE(i * indexSize)
            }
        }

        var i
        if (dir) {
            var foundIndex = -1
            for (i = byteOffset; i < arrLength; i++) {
                if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                    if (foundIndex === -1) foundIndex = i
                    if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
                } else {
                    if (foundIndex !== -1) i -= i - foundIndex
                    foundIndex = -1
                }
            }
        } else {
            if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
            for (i = byteOffset; i >= 0; i--) {
                var found = true
                for (var j = 0; j < valLength; j++) {
                    if (read(arr, i + j) !== read(val, j)) {
                        found = false
                        break
                    }
                }
                if (found) return i
            }
        }

        return -1
    }

    Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1
    }

    Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
    }

    Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
    }

    function hexWrite (buf, string, offset, length) {
        offset = Number(offset) || 0
        var remaining = buf.length - offset
        if (!length) {
            length = remaining
        } else {
            length = Number(length)
            if (length > remaining) {
                length = remaining
            }
        }

        var strLen = string.length

        if (length > strLen / 2) {
            length = strLen / 2
        }
        for (var i = 0; i < length; ++i) {
            var parsed = parseInt(string.substr(i * 2, 2), 16)
            if (numberIsNaN(parsed)) return i
            buf[offset + i] = parsed
        }
        return i
    }

    function utf8Write (buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
    }

    function asciiWrite (buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length)
    }

    function base64Write (buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length)
    }

    function ucs2Write (buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
    }

    Buffer.prototype.write = function write (string, offset, length, encoding) {
        // Buffer#write(string)
        if (offset === undefined) {
            encoding = 'utf8'
            length = this.length
            offset = 0
            // Buffer#write(string, encoding)
        } else if (length === undefined && typeof offset === 'string') {
            encoding = offset
            length = this.length
            offset = 0
            // Buffer#write(string, offset[, length][, encoding])
        } else if (isFinite(offset)) {
            offset = offset >>> 0
            if (isFinite(length)) {
                length = length >>> 0
                if (encoding === undefined) encoding = 'utf8'
            } else {
                encoding = length
                length = undefined
            }
        } else {
            throw new Error(
                'Buffer.write(string, encoding, offset[, length]) is no longer supported'
            )
        }

        var remaining = this.length - offset
        if (length === undefined || length > remaining) length = remaining

        if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
            throw new RangeError('Attempt to write outside buffer bounds')
        }

        if (!encoding) encoding = 'utf8'

        var loweredCase = false
        for (;;) {
            switch (encoding) {
                case 'hex':
                    return hexWrite(this, string, offset, length)

                case 'utf8':
                case 'utf-8':
                    return utf8Write(this, string, offset, length)

                case 'ascii':
                case 'latin1':
                case 'binary':
                    return asciiWrite(this, string, offset, length)

                case 'base64':
                    // Warning: maxLength not taken into account in base64Write
                    return base64Write(this, string, offset, length)

                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                    return ucs2Write(this, string, offset, length)

                default:
                    if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
                    encoding = ('' + encoding).toLowerCase()
                    loweredCase = true
            }
        }
    }

    Buffer.prototype.toJSON = function toJSON () {
        return {
            type: 'Buffer',
            data: Array.prototype.slice.call(this._arr || this, 0)
        }
    }

    function base64Slice (buf, start, end) {
        if (start === 0 && end === buf.length) {
            return base64.fromByteArray(buf)
        } else {
            return base64.fromByteArray(buf.slice(start, end))
        }
    }

    function utf8Slice (buf, start, end) {
        end = Math.min(buf.length, end)
        var res = []

        var i = start
        while (i < end) {
            var firstByte = buf[i]
            var codePoint = null
            var bytesPerSequence = (firstByte > 0xEF)
                ? 4
                : (firstByte > 0xDF)
                    ? 3
                    : (firstByte > 0xBF)
                        ? 2
                        : 1

            if (i + bytesPerSequence <= end) {
                var secondByte, thirdByte, fourthByte, tempCodePoint

                switch (bytesPerSequence) {
                    case 1:
                        if (firstByte < 0x80) {
                            codePoint = firstByte
                        }
                        break
                    case 2:
                        secondByte = buf[i + 1]
                        if ((secondByte & 0xC0) === 0x80) {
                            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
                            if (tempCodePoint > 0x7F) {
                                codePoint = tempCodePoint
                            }
                        }
                        break
                    case 3:
                        secondByte = buf[i + 1]
                        thirdByte = buf[i + 2]
                        if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
                            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                                codePoint = tempCodePoint
                            }
                        }
                        break
                    case 4:
                        secondByte = buf[i + 1]
                        thirdByte = buf[i + 2]
                        fourthByte = buf[i + 3]
                        if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
                            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                                codePoint = tempCodePoint
                            }
                        }
                }
            }

            if (codePoint === null) {
                // we did not generate a valid codePoint so insert a
                // replacement char (U+FFFD) and advance only 1 byte
                codePoint = 0xFFFD
                bytesPerSequence = 1
            } else if (codePoint > 0xFFFF) {
                // encode to utf16 (surrogate pair dance)
                codePoint -= 0x10000
                res.push(codePoint >>> 10 & 0x3FF | 0xD800)
                codePoint = 0xDC00 | codePoint & 0x3FF
            }

            res.push(codePoint)
            i += bytesPerSequence
        }

        return decodeCodePointsArray(res)
    }

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
    var MAX_ARGUMENTS_LENGTH = 0x1000

    function decodeCodePointsArray (codePoints) {
        var len = codePoints.length
        if (len <= MAX_ARGUMENTS_LENGTH) {
            return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
        }

        // Decode in chunks to avoid "call stack size exceeded".
        var res = ''
        var i = 0
        while (i < len) {
            res += String.fromCharCode.apply(
                String,
                codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
            )
        }
        return res
    }

    function asciiSlice (buf, start, end) {
        var ret = ''
        end = Math.min(buf.length, end)

        for (var i = start; i < end; ++i) {
            ret += String.fromCharCode(buf[i] & 0x7F)
        }
        return ret
    }

    function latin1Slice (buf, start, end) {
        var ret = ''
        end = Math.min(buf.length, end)

        for (var i = start; i < end; ++i) {
            ret += String.fromCharCode(buf[i])
        }
        return ret
    }

    function hexSlice (buf, start, end) {
        var len = buf.length

        if (!start || start < 0) start = 0
        if (!end || end < 0 || end > len) end = len

        var out = ''
        for (var i = start; i < end; ++i) {
            out += hexSliceLookupTable[buf[i]]
        }
        return out
    }

    function utf16leSlice (buf, start, end) {
        var bytes = buf.slice(start, end)
        var res = ''
        // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
        for (var i = 0; i < bytes.length - 1; i += 2) {
            res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
        }
        return res
    }

    Buffer.prototype.slice = function slice (start, end) {
        var len = this.length
        start = ~~start
        end = end === undefined ? len : ~~end

        if (start < 0) {
            start += len
            if (start < 0) start = 0
        } else if (start > len) {
            start = len
        }

        if (end < 0) {
            end += len
            if (end < 0) end = 0
        } else if (end > len) {
            end = len
        }

        if (end < start) end = start

        var newBuf = this.subarray(start, end)
        // Return an augmented `Uint8Array` instance
        Object.setPrototypeOf(newBuf, Buffer.prototype)

        return newBuf
    }

    /*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
    function checkOffset (offset, ext, length) {
        if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
        if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
    }

    Buffer.prototype.readUintLE =
        Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
            offset = offset >>> 0
            byteLength = byteLength >>> 0
            if (!noAssert) checkOffset(offset, byteLength, this.length)

            var val = this[offset]
            var mul = 1
            var i = 0
            while (++i < byteLength && (mul *= 0x100)) {
                val += this[offset + i] * mul
            }

            return val
        }

    Buffer.prototype.readUintBE =
        Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
            offset = offset >>> 0
            byteLength = byteLength >>> 0
            if (!noAssert) {
                checkOffset(offset, byteLength, this.length)
            }

            var val = this[offset + --byteLength]
            var mul = 1
            while (byteLength > 0 && (mul *= 0x100)) {
                val += this[offset + --byteLength] * mul
            }

            return val
        }

    Buffer.prototype.readUint8 =
        Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 1, this.length)
            return this[offset]
        }

    Buffer.prototype.readUint16LE =
        Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 2, this.length)
            return this[offset] | (this[offset + 1] << 8)
        }

    Buffer.prototype.readUint16BE =
        Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 2, this.length)
            return (this[offset] << 8) | this[offset + 1]
        }

    Buffer.prototype.readUint32LE =
        Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 4, this.length)

            return ((this[offset]) |
                    (this[offset + 1] << 8) |
                    (this[offset + 2] << 16)) +
                (this[offset + 3] * 0x1000000)
        }

    Buffer.prototype.readUint32BE =
        Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 4, this.length)

            return (this[offset] * 0x1000000) +
                ((this[offset + 1] << 16) |
                    (this[offset + 2] << 8) |
                    this[offset + 3])
        }

    Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
        offset = offset >>> 0
        byteLength = byteLength >>> 0
        if (!noAssert) checkOffset(offset, byteLength, this.length)

        var val = this[offset]
        var mul = 1
        var i = 0
        while (++i < byteLength && (mul *= 0x100)) {
            val += this[offset + i] * mul
        }
        mul *= 0x80

        if (val >= mul) val -= Math.pow(2, 8 * byteLength)

        return val
    }

    Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
        offset = offset >>> 0
        byteLength = byteLength >>> 0
        if (!noAssert) checkOffset(offset, byteLength, this.length)

        var i = byteLength
        var mul = 1
        var val = this[offset + --i]
        while (i > 0 && (mul *= 0x100)) {
            val += this[offset + --i] * mul
        }
        mul *= 0x80

        if (val >= mul) val -= Math.pow(2, 8 * byteLength)

        return val
    }

    Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 1, this.length)
        if (!(this[offset] & 0x80)) return (this[offset])
        return ((0xff - this[offset] + 1) * -1)
    }

    Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 2, this.length)
        var val = this[offset] | (this[offset + 1] << 8)
        return (val & 0x8000) ? val | 0xFFFF0000 : val
    }

    Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 2, this.length)
        var val = this[offset + 1] | (this[offset] << 8)
        return (val & 0x8000) ? val | 0xFFFF0000 : val
    }

    Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 4, this.length)

        return (this[offset]) |
            (this[offset + 1] << 8) |
            (this[offset + 2] << 16) |
            (this[offset + 3] << 24)
    }

    Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 4, this.length)

        return (this[offset] << 24) |
            (this[offset + 1] << 16) |
            (this[offset + 2] << 8) |
            (this[offset + 3])
    }

    Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 4, this.length)
        return ieee754.read(this, offset, true, 23, 4)
    }

    Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 4, this.length)
        return ieee754.read(this, offset, false, 23, 4)
    }

    Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 8, this.length)
        return ieee754.read(this, offset, true, 52, 8)
    }

    Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 8, this.length)
        return ieee754.read(this, offset, false, 52, 8)
    }

    function checkInt (buf, value, offset, ext, max, min) {
        if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
        if (offset + ext > buf.length) throw new RangeError('Index out of range')
    }

    Buffer.prototype.writeUintLE =
        Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
            value = +value
            offset = offset >>> 0
            byteLength = byteLength >>> 0
            if (!noAssert) {
                var maxBytes = Math.pow(2, 8 * byteLength) - 1
                checkInt(this, value, offset, byteLength, maxBytes, 0)
            }

            var mul = 1
            var i = 0
            this[offset] = value & 0xFF
            while (++i < byteLength && (mul *= 0x100)) {
                this[offset + i] = (value / mul) & 0xFF
            }

            return offset + byteLength
        }

    Buffer.prototype.writeUintBE =
        Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
            value = +value
            offset = offset >>> 0
            byteLength = byteLength >>> 0
            if (!noAssert) {
                var maxBytes = Math.pow(2, 8 * byteLength) - 1
                checkInt(this, value, offset, byteLength, maxBytes, 0)
            }

            var i = byteLength - 1
            var mul = 1
            this[offset + i] = value & 0xFF
            while (--i >= 0 && (mul *= 0x100)) {
                this[offset + i] = (value / mul) & 0xFF
            }

            return offset + byteLength
        }

    Buffer.prototype.writeUint8 =
        Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
            this[offset] = (value & 0xff)
            return offset + 1
        }

    Buffer.prototype.writeUint16LE =
        Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
            this[offset] = (value & 0xff)
            this[offset + 1] = (value >>> 8)
            return offset + 2
        }

    Buffer.prototype.writeUint16BE =
        Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
            this[offset] = (value >>> 8)
            this[offset + 1] = (value & 0xff)
            return offset + 2
        }

    Buffer.prototype.writeUint32LE =
        Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
            this[offset + 3] = (value >>> 24)
            this[offset + 2] = (value >>> 16)
            this[offset + 1] = (value >>> 8)
            this[offset] = (value & 0xff)
            return offset + 4
        }

    Buffer.prototype.writeUint32BE =
        Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
            this[offset] = (value >>> 24)
            this[offset + 1] = (value >>> 16)
            this[offset + 2] = (value >>> 8)
            this[offset + 3] = (value & 0xff)
            return offset + 4
        }

    Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) {
            var limit = Math.pow(2, (8 * byteLength) - 1)

            checkInt(this, value, offset, byteLength, limit - 1, -limit)
        }

        var i = 0
        var mul = 1
        var sub = 0
        this[offset] = value & 0xFF
        while (++i < byteLength && (mul *= 0x100)) {
            if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                sub = 1
            }
            this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
        }

        return offset + byteLength
    }

    Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) {
            var limit = Math.pow(2, (8 * byteLength) - 1)

            checkInt(this, value, offset, byteLength, limit - 1, -limit)
        }

        var i = byteLength - 1
        var mul = 1
        var sub = 0
        this[offset + i] = value & 0xFF
        while (--i >= 0 && (mul *= 0x100)) {
            if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                sub = 1
            }
            this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
        }

        return offset + byteLength
    }

    Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
        if (value < 0) value = 0xff + value + 1
        this[offset] = (value & 0xff)
        return offset + 1
    }

    Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
        this[offset] = (value & 0xff)
        this[offset + 1] = (value >>> 8)
        return offset + 2
    }

    Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
        this[offset] = (value >>> 8)
        this[offset + 1] = (value & 0xff)
        return offset + 2
    }

    Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
        this[offset] = (value & 0xff)
        this[offset + 1] = (value >>> 8)
        this[offset + 2] = (value >>> 16)
        this[offset + 3] = (value >>> 24)
        return offset + 4
    }

    Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
        if (value < 0) value = 0xffffffff + value + 1
        this[offset] = (value >>> 24)
        this[offset + 1] = (value >>> 16)
        this[offset + 2] = (value >>> 8)
        this[offset + 3] = (value & 0xff)
        return offset + 4
    }

    function checkIEEE754 (buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError('Index out of range')
        if (offset < 0) throw new RangeError('Index out of range')
    }

    function writeFloat (buf, value, offset, littleEndian, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) {
            checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4)
        return offset + 4
    }

    Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert)
    }

    Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert)
    }

    function writeDouble (buf, value, offset, littleEndian, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) {
            checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8)
        return offset + 8
    }

    Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert)
    }

    Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert)
    }

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
    Buffer.prototype.copy = function copy (target, targetStart, start, end) {
        if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
        if (!start) start = 0
        if (!end && end !== 0) end = this.length
        if (targetStart >= target.length) targetStart = target.length
        if (!targetStart) targetStart = 0
        if (end > 0 && end < start) end = start

        // Copy 0 bytes; we're done
        if (end === start) return 0
        if (target.length === 0 || this.length === 0) return 0

        // Fatal error conditions
        if (targetStart < 0) {
            throw new RangeError('targetStart out of bounds')
        }
        if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
        if (end < 0) throw new RangeError('sourceEnd out of bounds')

        // Are we oob?
        if (end > this.length) end = this.length
        if (target.length - targetStart < end - start) {
            end = target.length - targetStart + start
        }

        var len = end - start

        if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
            // Use built-in when available, missing from IE11
            this.copyWithin(targetStart, start, end)
        } else {
            Uint8Array.prototype.set.call(
                target,
                this.subarray(start, end),
                targetStart
            )
        }

        return len
    }

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
    Buffer.prototype.fill = function fill (val, start, end, encoding) {
        // Handle string cases:
        if (typeof val === 'string') {
            if (typeof start === 'string') {
                encoding = start
                start = 0
                end = this.length
            } else if (typeof end === 'string') {
                encoding = end
                end = this.length
            }
            if (encoding !== undefined && typeof encoding !== 'string') {
                throw new TypeError('encoding must be a string')
            }
            if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
                throw new TypeError('Unknown encoding: ' + encoding)
            }
            if (val.length === 1) {
                var code = val.charCodeAt(0)
                if ((encoding === 'utf8' && code < 128) ||
                    encoding === 'latin1') {
                    // Fast path: If `val` fits into a single byte, use that numeric value.
                    val = code
                }
            }
        } else if (typeof val === 'number') {
            val = val & 255
        } else if (typeof val === 'boolean') {
            val = Number(val)
        }

        // Invalid ranges are not set to a default, so can range check early.
        if (start < 0 || this.length < start || this.length < end) {
            throw new RangeError('Out of range index')
        }

        if (end <= start) {
            return this
        }

        start = start >>> 0
        end = end === undefined ? this.length : end >>> 0

        if (!val) val = 0

        var i
        if (typeof val === 'number') {
            for (i = start; i < end; ++i) {
                this[i] = val
            }
        } else {
            var bytes = Buffer.isBuffer(val)
                ? val
                : Buffer.from(val, encoding)
            var len = bytes.length
            if (len === 0) {
                throw new TypeError('The value "' + val +
                    '" is invalid for argument "value"')
            }
            for (i = 0; i < end - start; ++i) {
                this[i + start] = bytes[i % len]
            }
        }

        return this
    }

// HELPER FUNCTIONS
// ================

    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

    function base64clean (str) {
        // Node takes equal signs as end of the Base64 encoding
        str = str.split('=')[0]
        // Node strips out invalid characters like \n and \t from the string, base64-js does not
        str = str.trim().replace(INVALID_BASE64_RE, '')
        // Node converts strings with length < 2 to ''
        if (str.length < 2) return ''
        // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
        while (str.length % 4 !== 0) {
            str = str + '='
        }
        return str
    }

    function utf8ToBytes (string, units) {
        units = units || Infinity
        var codePoint
        var length = string.length
        var leadSurrogate = null
        var bytes = []

        for (var i = 0; i < length; ++i) {
            codePoint = string.charCodeAt(i)

            // is surrogate component
            if (codePoint > 0xD7FF && codePoint < 0xE000) {
                // last char was a lead
                if (!leadSurrogate) {
                    // no lead yet
                    if (codePoint > 0xDBFF) {
                        // unexpected trail
                        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
                        continue
                    } else if (i + 1 === length) {
                        // unpaired lead
                        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
                        continue
                    }

                    // valid lead
                    leadSurrogate = codePoint

                    continue
                }

                // 2 leads in a row
                if (codePoint < 0xDC00) {
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
                    leadSurrogate = codePoint
                    continue
                }

                // valid surrogate pair
                codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
            } else if (leadSurrogate) {
                // valid bmp char, but last char was a lead
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
            }

            leadSurrogate = null

            // encode utf8
            if (codePoint < 0x80) {
                if ((units -= 1) < 0) break
                bytes.push(codePoint)
            } else if (codePoint < 0x800) {
                if ((units -= 2) < 0) break
                bytes.push(
                    codePoint >> 0x6 | 0xC0,
                    codePoint & 0x3F | 0x80
                )
            } else if (codePoint < 0x10000) {
                if ((units -= 3) < 0) break
                bytes.push(
                    codePoint >> 0xC | 0xE0,
                    codePoint >> 0x6 & 0x3F | 0x80,
                    codePoint & 0x3F | 0x80
                )
            } else if (codePoint < 0x110000) {
                if ((units -= 4) < 0) break
                bytes.push(
                    codePoint >> 0x12 | 0xF0,
                    codePoint >> 0xC & 0x3F | 0x80,
                    codePoint >> 0x6 & 0x3F | 0x80,
                    codePoint & 0x3F | 0x80
                )
            } else {
                throw new Error('Invalid code point')
            }
        }

        return bytes
    }

    function asciiToBytes (str) {
        var byteArray = []
        for (var i = 0; i < str.length; ++i) {
            // Node's code seems to be doing this and not & 0x7F..
            byteArray.push(str.charCodeAt(i) & 0xFF)
        }
        return byteArray
    }

    function utf16leToBytes (str, units) {
        var c, hi, lo
        var byteArray = []
        for (var i = 0; i < str.length; ++i) {
            if ((units -= 2) < 0) break

            c = str.charCodeAt(i)
            hi = c >> 8
            lo = c % 256
            byteArray.push(lo)
            byteArray.push(hi)
        }

        return byteArray
    }

    function base64ToBytes (str) {
        return base64.toByteArray(base64clean(str))
    }

    function blitBuffer (src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
            if ((i + offset >= dst.length) || (i >= src.length)) break
            dst[i + offset] = src[i]
        }
        return i
    }

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check, but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
    function isInstance (obj, type) {
        return obj instanceof type ||
            (obj != null && obj.constructor != null && obj.constructor.name != null &&
                obj.constructor.name === type.name)
    }
    function numberIsNaN (obj) {
        // For IE11 support
        return obj !== obj // eslint-disable-line no-self-compare
    }

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
    var hexSliceLookupTable = (function () {
        var alphabet = '0123456789abcdef'
        var table = new Array(256)
        for (var i = 0; i < 16; ++i) {
            var i16 = i * 16
            for (var j = 0; j < 16; ++j) {
                table[i16 + j] = alphabet[i] + alphabet[j]
            }
        }
        return table
    })()

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

    'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
    function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    const qsDecode = function(qs, sep, eq, options) {
        sep = sep || '&';
        eq = eq || '=';
        var obj = {};

        if (typeof qs !== 'string' || qs.length === 0) {
            return obj;
        }

        var regexp = /\+/g;
        qs = qs.split(sep);

        var maxKeys = 1000;
        if (options && typeof options.maxKeys === 'number') {
            maxKeys = options.maxKeys;
        }

        var len = qs.length;
        // maxKeys <= 0 means that we should not limit keys count
        if (maxKeys > 0 && len > maxKeys) {
            len = maxKeys;
        }

        for (var i = 0; i < len; ++i) {
            var x = qs[i].replace(regexp, '%20'),
                idx = x.indexOf(eq),
                kstr, vstr, k, v;

            if (idx >= 0) {
                kstr = x.substr(0, idx);
                vstr = x.substr(idx + 1);
            } else {
                kstr = x;
                vstr = '';
            }

            k = decodeURIComponent(kstr);
            v = decodeURIComponent(vstr);

            if (!hasOwnProperty(obj, k)) {
                obj[k] = v;
            } else if (Array.isArray(obj[k])) {
                obj[k].push(v);
            } else {
                obj[k] = [obj[k], v];
            }
        }

        return obj;
    };

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

    'use strict';

    var stringifyPrimitive = function(v) {
        switch (typeof v) {
            case 'string':
                return v;

            case 'boolean':
                return v ? 'true' : 'false';

            case 'number':
                return isFinite(v) ? v : '';

            default:
                return '';
        }
    };

    const qsEncode = function(obj, sep, eq, name) {
        sep = sep || '&';
        eq = eq || '=';
        if (obj === null) {
            obj = undefined;
        }

        if (typeof obj === 'object') {
            return Object.keys(obj).map(function(k) {
                var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                if (Array.isArray(obj[k])) {
                    return obj[k].map(function(v) {
                        return ks + encodeURIComponent(stringifyPrimitive(v));
                    }).join(sep);
                } else {
                    return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
                }
            }).filter(Boolean).join(sep);

        }

        if (!name) return '';
        return encodeURIComponent(stringifyPrimitive(name)) + eq +
            encodeURIComponent(stringifyPrimitive(obj));
    };

    const qs = {};

    qs.decode = qs.parse = qsDecode;
    qs.encode = qs.stringify = qsEncode;

    const stack = [];

    const setTimeout_support = function (callback, timeout) {
        const args = Array.from(arguments);

        // function arguments
        args.pop();
        args.pop();

        if (isGreenApp()) {
            return setTimeout(callback, timeout, args);
        }

        const timer = new java.util.Timer();
        const task = new java.util.TimerTask({
            run: function () {
                callback.call(this, args);
            }
        });
        timer.schedule(task, timeout);

        const id = ++stack.size;
        stack[id] = timer;

        return id;
    }

    const clearTimeout_support = (id) => {
        if (isGreenApp()) {
            return clearTimeout(id);
        }

        const timer = stack[id];
        if (timer === undefined) {
            return undefined;
        }

        timer.cancel();
    }

    const timers = {
        setTimeout: setTimeout_support,
        clearTimeout: clearTimeout_support,
    }

    /* @preserve
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2017 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

    /** @type { PromiseConstructor } */ let Promise;

    /**
     * bluebird build version 3.5.0
     * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
     */

    !function(e){if("object"==typeof exports&&"undefined"!=typeof module)Promise=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Promise=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise) {
                var SomePromiseArray = Promise._SomePromiseArray;
                function any(promises) {
                    var ret = new SomePromiseArray(promises);
                    var promise = ret.promise();
                    ret.setHowMany(1);
                    ret.setUnwrap();
                    ret.init();
                    return promise;
                }

                Promise.any = function (promises) {
                    return any(promises);
                };

                Promise.prototype.any = function () {
                    return any(this);
                };

            };

        },{}],2:[function(_dereq_,module,exports){
            "use strict";
            var firstLineError;
            try {throw new Error(); } catch (e) {firstLineError = e;}
            var schedule = _dereq_("./schedule");
            var Queue = _dereq_("./queue");
            var util = _dereq_("./util");

            function Async() {
                this._customScheduler = false;
                this._isTickUsed = false;
                this._lateQueue = new Queue(16);
                this._normalQueue = new Queue(16);
                this._haveDrainedQueues = false;
                this._trampolineEnabled = true;
                var self = this;
                this.drainQueues = function () {
                    self._drainQueues();
                };
                this._schedule = schedule;
            }

            Async.prototype.setScheduler = function(fn) {
                var prev = this._schedule;
                this._schedule = fn;
                this._customScheduler = true;
                return prev;
            };

            Async.prototype.hasCustomScheduler = function() {
                return this._customScheduler;
            };

            Async.prototype.enableTrampoline = function() {
                this._trampolineEnabled = true;
            };

            Async.prototype.disableTrampolineIfNecessary = function() {
                if (util.hasDevTools) {
                    this._trampolineEnabled = false;
                }
            };

            Async.prototype.haveItemsQueued = function () {
                return this._isTickUsed || this._haveDrainedQueues;
            };


            Async.prototype.fatalError = function(e, isNode) {
                if (isNode) {
                    process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
                        "\n");
                    process.exit(2);
                } else {
                    this.throwLater(e);
                }
            };

            Async.prototype.throwLater = function(fn, arg) {
                if (arguments.length === 1) {
                    arg = fn;
                    fn = function () { throw arg; };
                }
                if (typeof timers.setTimeout !== "undefined") {
                    timers.setTimeout(function() {
                        fn(arg);
                    }, 0);
                } else try {
                    this._schedule(function() {
                        fn(arg);
                    });
                } catch (e) {
                    throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
                }
            };

            function AsyncInvokeLater(fn, receiver, arg) {
                this._lateQueue.push(fn, receiver, arg);
                this._queueTick();
            }

            function AsyncInvoke(fn, receiver, arg) {
                this._normalQueue.push(fn, receiver, arg);
                this._queueTick();
            }

            function AsyncSettlePromises(promise) {
                this._normalQueue._pushOne(promise);
                this._queueTick();
            }

            if (!util.hasDevTools) {
                Async.prototype.invokeLater = AsyncInvokeLater;
                Async.prototype.invoke = AsyncInvoke;
                Async.prototype.settlePromises = AsyncSettlePromises;
            } else {
                Async.prototype.invokeLater = function (fn, receiver, arg) {
                    if (this._trampolineEnabled) {
                        AsyncInvokeLater.call(this, fn, receiver, arg);
                    } else {
                        this._schedule(function() {
                            timers.setTimeout(function() {
                                fn.call(receiver, arg);
                            }, 100);
                        });
                    }
                };

                Async.prototype.invoke = function (fn, receiver, arg) {
                    if (this._trampolineEnabled) {
                        AsyncInvoke.call(this, fn, receiver, arg);
                    } else {
                        this._schedule(function() {
                            fn.call(receiver, arg);
                        });
                    }
                };

                Async.prototype.settlePromises = function(promise) {
                    if (this._trampolineEnabled) {
                        AsyncSettlePromises.call(this, promise);
                    } else {
                        this._schedule(function() {
                            promise._settlePromises();
                        });
                    }
                };
            }

            Async.prototype._drainQueue = function(queue) {
                while (queue.length() > 0) {
                    var fn = queue.shift();
                    if (typeof fn !== "function") {
                        fn._settlePromises();
                        continue;
                    }
                    var receiver = queue.shift();
                    var arg = queue.shift();
                    fn.call(receiver, arg);
                }
            };

            Async.prototype._drainQueues = function () {
                this._drainQueue(this._normalQueue);
                this._reset();
                this._haveDrainedQueues = true;
                this._drainQueue(this._lateQueue);
            };

            Async.prototype._queueTick = function () {
                if (!this._isTickUsed) {
                    this._isTickUsed = true;
                    this._schedule(this.drainQueues);
                }
            };

            Async.prototype._reset = function () {
                this._isTickUsed = false;
            };

            module.exports = Async;
            module.exports.firstLineError = firstLineError;

        },{"./queue":26,"./schedule":29,"./util":36}],3:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
                var calledBind = false;
                var rejectThis = function(_, e) {
                    this._reject(e);
                };

                var targetRejected = function(e, context) {
                    context.promiseRejectionQueued = true;
                    context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
                };

                var bindingResolved = function(thisArg, context) {
                    if (((this._bitField & 50397184) === 0)) {
                        this._resolveCallback(context.target);
                    }
                };

                var bindingRejected = function(e, context) {
                    if (!context.promiseRejectionQueued) this._reject(e);
                };

                Promise.prototype.bind = function (thisArg) {
                    if (!calledBind) {
                        calledBind = true;
                        Promise.prototype._propagateFrom = debug.propagateFromFunction();
                        Promise.prototype._boundValue = debug.boundValueFunction();
                    }
                    var maybePromise = tryConvertToPromise(thisArg);
                    var ret = new Promise(INTERNAL);
                    ret._propagateFrom(this, 1);
                    var target = this._target();
                    ret._setBoundTo(maybePromise);
                    if (maybePromise instanceof Promise) {
                        var context = {
                            promiseRejectionQueued: false,
                            promise: ret,
                            target: target,
                            bindingPromise: maybePromise
                        };
                        target._then(INTERNAL, targetRejected, undefined, ret, context);
                        maybePromise._then(
                            bindingResolved, bindingRejected, undefined, ret, context);
                        ret._setOnCancel(maybePromise);
                    } else {
                        ret._resolveCallback(target);
                    }
                    return ret;
                };

                Promise.prototype._setBoundTo = function (obj) {
                    if (obj !== undefined) {
                        this._bitField = this._bitField | 2097152;
                        this._boundTo = obj;
                    } else {
                        this._bitField = this._bitField & (~2097152);
                    }
                };

                Promise.prototype._isBound = function () {
                    return (this._bitField & 2097152) === 2097152;
                };

                Promise.bind = function (thisArg, value) {
                    return Promise.resolve(value).bind(thisArg);
                };
            };

        },{}],4:[function(_dereq_,module,exports){
            "use strict";
            var old;
            if (typeof Promise !== "undefined") old = Promise;
            function noConflict() {
                try { if (Promise === bluebird) Promise = old; }
                catch (e) {}
                return bluebird;
            }
            var bluebird = _dereq_("./promise")();
            bluebird.noConflict = noConflict;
            module.exports = bluebird;

        },{"./promise":22}],5:[function(_dereq_,module,exports){
            "use strict";
            var cr = Object.create;
            if (cr) {
                var callerCache = cr(null);
                var getterCache = cr(null);
                callerCache[" size"] = getterCache[" size"] = 0;
            }

            module.exports = function(Promise) {
                var util = _dereq_("./util");
                var canEvaluate = util.canEvaluate;
                var isIdentifier = util.isIdentifier;

                var getMethodCaller;
                var getGetter;
                if (!true) {
                    var makeMethodCaller = function (methodName) {
                        return new Function("ensureMethod", "                                    \n\
        return function(obj) {                                               \n\
            'use strict'                                                     \n\
            var len = this.length;                                           \n\
            ensureMethod(obj, 'methodName');                                 \n\
            switch(len) {                                                    \n\
                case 1: return obj.methodName(this[0]);                      \n\
                case 2: return obj.methodName(this[0], this[1]);             \n\
                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                case 0: return obj.methodName();                             \n\
                default:                                                     \n\
                    return obj.methodName.apply(obj, this);                  \n\
            }                                                                \n\
        };                                                                   \n\
        ".replace(/methodName/g, methodName))(ensureMethod);
                    };

                    var makeGetter = function (propertyName) {
                        return new Function("obj", "                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName", propertyName));
                    };

                    var getCompiled = function(name, compiler, cache) {
                        var ret = cache[name];
                        if (typeof ret !== "function") {
                            if (!isIdentifier(name)) {
                                return null;
                            }
                            ret = compiler(name);
                            cache[name] = ret;
                            cache[" size"]++;
                            if (cache[" size"] > 512) {
                                var keys = Object.keys(cache);
                                for (var i = 0; i < 256; ++i) delete cache[keys[i]];
                                cache[" size"] = keys.length - 256;
                            }
                        }
                        return ret;
                    };

                    getMethodCaller = function(name) {
                        return getCompiled(name, makeMethodCaller, callerCache);
                    };

                    getGetter = function(name) {
                        return getCompiled(name, makeGetter, getterCache);
                    };
                }

                function ensureMethod(obj, methodName) {
                    var fn;
                    if (obj != null) fn = obj[methodName];
                    if (typeof fn !== "function") {
                        var message = "Object " + util.classString(obj) + " has no method '" +
                            util.toString(methodName) + "'";
                        throw new Promise.TypeError(message);
                    }
                    return fn;
                }

                function caller(obj) {
                    var methodName = this.pop();
                    var fn = ensureMethod(obj, methodName);
                    return fn.apply(obj, this);
                }
                Promise.prototype.call = function (methodName) {
                    var args = [].slice.call(arguments, 1);;
                    if (!true) {
                        if (canEvaluate) {
                            var maybeCaller = getMethodCaller(methodName);
                            if (maybeCaller !== null) {
                                return this._then(
                                    maybeCaller, undefined, undefined, args, undefined);
                            }
                        }
                    }
                    args.push(methodName);
                    return this._then(caller, undefined, undefined, args, undefined);
                };

                function namedGetter(obj) {
                    return obj[this];
                }
                function indexedGetter(obj) {
                    var index = +this;
                    if (index < 0) index = Math.max(0, index + obj.length);
                    return obj[index];
                }
                Promise.prototype.get = function (propertyName) {
                    var isIndex = (typeof propertyName === "number");
                    var getter;
                    if (!isIndex) {
                        if (canEvaluate) {
                            var maybeGetter = getGetter(propertyName);
                            getter = maybeGetter !== null ? maybeGetter : namedGetter;
                        } else {
                            getter = namedGetter;
                        }
                    } else {
                        getter = indexedGetter;
                    }
                    return this._then(getter, undefined, undefined, propertyName, undefined);
                };
            };

        },{"./util":36}],6:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise, PromiseArray, apiRejection, debug) {
                var util = _dereq_("./util");
                var tryCatch = util.tryCatch;
                var errorObj = util.errorObj;
                var async = Promise._async;

                Promise.prototype["break"] = Promise.prototype.cancel = function() {
                    if (!debug.cancellation()) return this._warn("cancellation is disabled");

                    var promise = this;
                    var child = promise;
                    while (promise._isCancellable()) {
                        if (!promise._cancelBy(child)) {
                            if (child._isFollowing()) {
                                child._followee().cancel();
                            } else {
                                child._cancelBranched();
                            }
                            break;
                        }

                        var parent = promise._cancellationParent;
                        if (parent == null || !parent._isCancellable()) {
                            if (promise._isFollowing()) {
                                promise._followee().cancel();
                            } else {
                                promise._cancelBranched();
                            }
                            break;
                        } else {
                            if (promise._isFollowing()) promise._followee().cancel();
                            promise._setWillBeCancelled();
                            child = promise;
                            promise = parent;
                        }
                    }
                };

                Promise.prototype._branchHasCancelled = function() {
                    this._branchesRemainingToCancel--;
                };

                Promise.prototype._enoughBranchesHaveCancelled = function() {
                    return this._branchesRemainingToCancel === undefined ||
                        this._branchesRemainingToCancel <= 0;
                };

                Promise.prototype._cancelBy = function(canceller) {
                    if (canceller === this) {
                        this._branchesRemainingToCancel = 0;
                        this._invokeOnCancel();
                        return true;
                    } else {
                        this._branchHasCancelled();
                        if (this._enoughBranchesHaveCancelled()) {
                            this._invokeOnCancel();
                            return true;
                        }
                    }
                    return false;
                };

                Promise.prototype._cancelBranched = function() {
                    if (this._enoughBranchesHaveCancelled()) {
                        this._cancel();
                    }
                };

                Promise.prototype._cancel = function() {
                    if (!this._isCancellable()) return;
                    this._setCancelled();
                    async.invoke(this._cancelPromises, this, undefined);
                };

                Promise.prototype._cancelPromises = function() {
                    if (this._length() > 0) this._settlePromises();
                };

                Promise.prototype._unsetOnCancel = function() {
                    this._onCancelField = undefined;
                };

                Promise.prototype._isCancellable = function() {
                    return this.isPending() && !this._isCancelled();
                };

                Promise.prototype.isCancellable = function() {
                    return this.isPending() && !this.isCancelled();
                };

                Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
                    if (util.isArray(onCancelCallback)) {
                        for (var i = 0; i < onCancelCallback.length; ++i) {
                            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
                        }
                    } else if (onCancelCallback !== undefined) {
                        if (typeof onCancelCallback === "function") {
                            if (!internalOnly) {
                                var e = tryCatch(onCancelCallback).call(this._boundValue());
                                if (e === errorObj) {
                                    this._attachExtraTrace(e.e);
                                    async.throwLater(e.e);
                                }
                            }
                        } else {
                            onCancelCallback._resultCancelled(this);
                        }
                    }
                };

                Promise.prototype._invokeOnCancel = function() {
                    var onCancelCallback = this._onCancel();
                    this._unsetOnCancel();
                    async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
                };

                Promise.prototype._invokeInternalOnCancel = function() {
                    if (this._isCancellable()) {
                        this._doInvokeOnCancel(this._onCancel(), true);
                        this._unsetOnCancel();
                    }
                };

                Promise.prototype._resultCancelled = function() {
                    this.cancel();
                };

            };

        },{"./util":36}],7:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(NEXT_FILTER) {
                var util = _dereq_("./util");
                var getKeys = _dereq_("./es5").keys;
                var tryCatch = util.tryCatch;
                var errorObj = util.errorObj;

                function catchFilter(instances, cb, promise) {
                    return function(e) {
                        var boundTo = promise._boundValue();
                        predicateLoop: for (var i = 0; i < instances.length; ++i) {
                            var item = instances[i];

                            if (item === Error ||
                                (item != null && item.prototype instanceof Error)) {
                                if (e instanceof item) {
                                    return tryCatch(cb).call(boundTo, e);
                                }
                            } else if (typeof item === "function") {
                                var matchesPredicate = tryCatch(item).call(boundTo, e);
                                if (matchesPredicate === errorObj) {
                                    return matchesPredicate;
                                } else if (matchesPredicate) {
                                    return tryCatch(cb).call(boundTo, e);
                                }
                            } else if (util.isObject(e)) {
                                var keys = getKeys(item);
                                for (var j = 0; j < keys.length; ++j) {
                                    var key = keys[j];
                                    if (item[key] != e[key]) {
                                        continue predicateLoop;
                                    }
                                }
                                return tryCatch(cb).call(boundTo, e);
                            }
                        }
                        return NEXT_FILTER;
                    };
                }

                return catchFilter;
            };

        },{"./es5":13,"./util":36}],8:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise) {
                var longStackTraces = false;
                var contextStack = [];

                Promise.prototype._promiseCreated = function() {};
                Promise.prototype._pushContext = function() {};
                Promise.prototype._popContext = function() {return null;};
                Promise._peekContext = Promise.prototype._peekContext = function() {};

                function Context() {
                    this._trace = new Context.CapturedTrace(peekContext());
                }
                Context.prototype._pushContext = function () {
                    if (this._trace !== undefined) {
                        this._trace._promiseCreated = null;
                        contextStack.push(this._trace);
                    }
                };

                Context.prototype._popContext = function () {
                    if (this._trace !== undefined) {
                        var trace = contextStack.pop();
                        var ret = trace._promiseCreated;
                        trace._promiseCreated = null;
                        return ret;
                    }
                    return null;
                };

                function createContext() {
                    if (longStackTraces) return new Context();
                }

                function peekContext() {
                    var lastIndex = contextStack.length - 1;
                    if (lastIndex >= 0) {
                        return contextStack[lastIndex];
                    }
                    return undefined;
                }
                Context.CapturedTrace = null;
                Context.create = createContext;
                Context.deactivateLongStackTraces = function() {};
                Context.activateLongStackTraces = function() {
                    var Promise_pushContext = Promise.prototype._pushContext;
                    var Promise_popContext = Promise.prototype._popContext;
                    var Promise_PeekContext = Promise._peekContext;
                    var Promise_peekContext = Promise.prototype._peekContext;
                    var Promise_promiseCreated = Promise.prototype._promiseCreated;
                    Context.deactivateLongStackTraces = function() {
                        Promise.prototype._pushContext = Promise_pushContext;
                        Promise.prototype._popContext = Promise_popContext;
                        Promise._peekContext = Promise_PeekContext;
                        Promise.prototype._peekContext = Promise_peekContext;
                        Promise.prototype._promiseCreated = Promise_promiseCreated;
                        longStackTraces = false;
                    };
                    longStackTraces = true;
                    Promise.prototype._pushContext = Context.prototype._pushContext;
                    Promise.prototype._popContext = Context.prototype._popContext;
                    Promise._peekContext = Promise.prototype._peekContext = peekContext;
                    Promise.prototype._promiseCreated = function() {
                        var ctx = this._peekContext();
                        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
                    };
                };
                return Context;
            };

        },{}],9:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise, Context) {
                var getDomain = Promise._getDomain;
                var async = Promise._async;
                var Warning = _dereq_("./errors").Warning;
                var util = _dereq_("./util");
                var canAttachTrace = util.canAttachTrace;
                var unhandledRejectionHandled;
                var possiblyUnhandledRejection;
                var bluebirdFramePattern =
                    /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
                var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
                var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
                var stackFramePattern = null;
                var formatStack = null;
                var indentStackFrames = false;
                var printWarning;
                var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 &&
                    (true ||
                        util.env("BLUEBIRD_DEBUG") ||
                        util.env("NODE_ENV") === "development"));

                var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 &&
                    (debugging || util.env("BLUEBIRD_WARNINGS")));

                var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
                    (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));

                var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
                    (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

                Promise.prototype.suppressUnhandledRejections = function() {
                    var target = this._target();
                    target._bitField = ((target._bitField & (~1048576)) |
                        524288);
                };

                Promise.prototype._ensurePossibleRejectionHandled = function () {
                    if ((this._bitField & 524288) !== 0) return;
                    this._setRejectionIsUnhandled();
                    async.invokeLater(this._notifyUnhandledRejection, this, undefined);
                };

                Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
                    fireRejectionEvent("rejectionHandled",
                        unhandledRejectionHandled, undefined, this);
                };

                Promise.prototype._setReturnedNonUndefined = function() {
                    this._bitField = this._bitField | 268435456;
                };

                Promise.prototype._returnedNonUndefined = function() {
                    return (this._bitField & 268435456) !== 0;
                };

                Promise.prototype._notifyUnhandledRejection = function () {
                    if (this._isRejectionUnhandled()) {
                        var reason = this._settledValue();
                        this._setUnhandledRejectionIsNotified();
                        fireRejectionEvent("unhandledRejection",
                            possiblyUnhandledRejection, reason, this);
                    }
                };

                Promise.prototype._setUnhandledRejectionIsNotified = function () {
                    this._bitField = this._bitField | 262144;
                };

                Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
                    this._bitField = this._bitField & (~262144);
                };

                Promise.prototype._isUnhandledRejectionNotified = function () {
                    return (this._bitField & 262144) > 0;
                };

                Promise.prototype._setRejectionIsUnhandled = function () {
                    this._bitField = this._bitField | 1048576;
                };

                Promise.prototype._unsetRejectionIsUnhandled = function () {
                    this._bitField = this._bitField & (~1048576);
                    if (this._isUnhandledRejectionNotified()) {
                        this._unsetUnhandledRejectionIsNotified();
                        this._notifyUnhandledRejectionIsHandled();
                    }
                };

                Promise.prototype._isRejectionUnhandled = function () {
                    return (this._bitField & 1048576) > 0;
                };

                Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
                    return warn(message, shouldUseOwnTrace, promise || this);
                };

                Promise.onPossiblyUnhandledRejection = function (fn) {
                    var domain = getDomain();
                    possiblyUnhandledRejection =
                        typeof fn === "function" ? (domain === null ?
                                fn : util.domainBind(domain, fn))
                            : undefined;
                };

                Promise.onUnhandledRejectionHandled = function (fn) {
                    var domain = getDomain();
                    unhandledRejectionHandled =
                        typeof fn === "function" ? (domain === null ?
                                fn : util.domainBind(domain, fn))
                            : undefined;
                };

                var disableLongStackTraces = function() {};
                Promise.longStackTraces = function () {
                    if (async.haveItemsQueued() && !config.longStackTraces) {
                        throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
                    }
                    if (!config.longStackTraces && longStackTracesIsSupported()) {
                        var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
                        var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
                        config.longStackTraces = true;
                        disableLongStackTraces = function() {
                            if (async.haveItemsQueued() && !config.longStackTraces) {
                                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
                            }
                            Promise.prototype._captureStackTrace = Promise_captureStackTrace;
                            Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
                            Context.deactivateLongStackTraces();
                            async.enableTrampoline();
                            config.longStackTraces = false;
                        };
                        Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
                        Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
                        Context.activateLongStackTraces();
                        async.disableTrampolineIfNecessary();
                    }
                };

                Promise.hasLongStackTraces = function () {
                    return config.longStackTraces && longStackTracesIsSupported();
                };

                var fireDomEvent = (function() {
                    try {
                        if (typeof CustomEvent === "function") {
                            var event = new CustomEvent("CustomEvent");
                            util.global.dispatchEvent(event);
                            return function(name, event) {
                                var domEvent = new CustomEvent(name.toLowerCase(), {
                                    detail: event,
                                    cancelable: true
                                });
                                return !util.global.dispatchEvent(domEvent);
                            };
                        } else if (typeof Event === "function") {
                            var event = new Event("CustomEvent");
                            util.global.dispatchEvent(event);
                            return function(name, event) {
                                var domEvent = new Event(name.toLowerCase(), {
                                    cancelable: true
                                });
                                domEvent.detail = event;
                                return !util.global.dispatchEvent(domEvent);
                            };
                        } else {
                            var event = document.createEvent("CustomEvent");
                            event.initCustomEvent("testingtheevent", false, true, {});
                            util.global.dispatchEvent(event);
                            return function(name, event) {
                                var domEvent = document.createEvent("CustomEvent");
                                domEvent.initCustomEvent(name.toLowerCase(), false, true,
                                    event);
                                return !util.global.dispatchEvent(domEvent);
                            };
                        }
                    } catch (e) {}
                    return function() {
                        return false;
                    };
                })();

                var fireGlobalEvent = (function() {
                    if (util.isNode) {
                        return function() {
                            return process.emit.apply(process, arguments);
                        };
                    } else {
                        if (!util.global) {
                            return function() {
                                return false;
                            };
                        }
                        return function(name) {
                            var methodName = "on" + name.toLowerCase();
                            var method = util.global[methodName];
                            if (!method) return false;
                            method.apply(util.global, [].slice.call(arguments, 1));
                            return true;
                        };
                    }
                })();

                function generatePromiseLifecycleEventObject(name, promise) {
                    return {promise: promise};
                }

                var eventToObjectGenerator = {
                    promiseCreated: generatePromiseLifecycleEventObject,
                    promiseFulfilled: generatePromiseLifecycleEventObject,
                    promiseRejected: generatePromiseLifecycleEventObject,
                    promiseResolved: generatePromiseLifecycleEventObject,
                    promiseCancelled: generatePromiseLifecycleEventObject,
                    promiseChained: function(name, promise, child) {
                        return {promise: promise, child: child};
                    },
                    warning: function(name, warning) {
                        return {warning: warning};
                    },
                    unhandledRejection: function (name, reason, promise) {
                        return {reason: reason, promise: promise};
                    },
                    rejectionHandled: generatePromiseLifecycleEventObject
                };

                var activeFireEvent = function (name) {
                    var globalEventFired = false;
                    try {
                        globalEventFired = fireGlobalEvent.apply(null, arguments);
                    } catch (e) {
                        async.throwLater(e);
                        globalEventFired = true;
                    }

                    var domEventFired = false;
                    try {
                        domEventFired = fireDomEvent(name,
                            eventToObjectGenerator[name].apply(null, arguments));
                    } catch (e) {
                        async.throwLater(e);
                        domEventFired = true;
                    }

                    return domEventFired || globalEventFired;
                };

                Promise.config = function(opts) {
                    opts = Object(opts);
                    if ("longStackTraces" in opts) {
                        if (opts.longStackTraces) {
                            Promise.longStackTraces();
                        } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
                            disableLongStackTraces();
                        }
                    }
                    if ("warnings" in opts) {
                        var warningsOption = opts.warnings;
                        config.warnings = !!warningsOption;
                        wForgottenReturn = config.warnings;

                        if (util.isObject(warningsOption)) {
                            if ("wForgottenReturn" in warningsOption) {
                                wForgottenReturn = !!warningsOption.wForgottenReturn;
                            }
                        }
                    }
                    if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
                        if (async.haveItemsQueued()) {
                            throw new Error(
                                "cannot enable cancellation after promises are in use");
                        }
                        Promise.prototype._clearCancellationData =
                            cancellationClearCancellationData;
                        Promise.prototype._propagateFrom = cancellationPropagateFrom;
                        Promise.prototype._onCancel = cancellationOnCancel;
                        Promise.prototype._setOnCancel = cancellationSetOnCancel;
                        Promise.prototype._attachCancellationCallback =
                            cancellationAttachCancellationCallback;
                        Promise.prototype._execute = cancellationExecute;
                        propagateFromFunction = cancellationPropagateFrom;
                        config.cancellation = true;
                    }
                    if ("monitoring" in opts) {
                        if (opts.monitoring && !config.monitoring) {
                            config.monitoring = true;
                            Promise.prototype._fireEvent = activeFireEvent;
                        } else if (!opts.monitoring && config.monitoring) {
                            config.monitoring = false;
                            Promise.prototype._fireEvent = defaultFireEvent;
                        }
                    }
                    return Promise;
                };

                function defaultFireEvent() { return false; }

                Promise.prototype._fireEvent = defaultFireEvent;
                Promise.prototype._execute = function(executor, resolve, reject) {
                    try {
                        executor(resolve, reject);
                    } catch (e) {
                        return e;
                    }
                };
                Promise.prototype._onCancel = function () {};
                Promise.prototype._setOnCancel = function (handler) { ; };
                Promise.prototype._attachCancellationCallback = function(onCancel) {
                    ;
                };
                Promise.prototype._captureStackTrace = function () {};
                Promise.prototype._attachExtraTrace = function () {};
                Promise.prototype._clearCancellationData = function() {};
                Promise.prototype._propagateFrom = function (parent, flags) {
                    ;
                    ;
                };

                function cancellationExecute(executor, resolve, reject) {
                    var promise = this;
                    try {
                        executor(resolve, reject, function(onCancel) {
                            if (typeof onCancel !== "function") {
                                throw new TypeError("onCancel must be a function, got: " +
                                    util.toString(onCancel));
                            }
                            promise._attachCancellationCallback(onCancel);
                        });
                    } catch (e) {
                        return e;
                    }
                }

                function cancellationAttachCancellationCallback(onCancel) {
                    if (!this._isCancellable()) return this;

                    var previousOnCancel = this._onCancel();
                    if (previousOnCancel !== undefined) {
                        if (util.isArray(previousOnCancel)) {
                            previousOnCancel.push(onCancel);
                        } else {
                            this._setOnCancel([previousOnCancel, onCancel]);
                        }
                    } else {
                        this._setOnCancel(onCancel);
                    }
                }

                function cancellationOnCancel() {
                    return this._onCancelField;
                }

                function cancellationSetOnCancel(onCancel) {
                    this._onCancelField = onCancel;
                }

                function cancellationClearCancellationData() {
                    this._cancellationParent = undefined;
                    this._onCancelField = undefined;
                }

                function cancellationPropagateFrom(parent, flags) {
                    if ((flags & 1) !== 0) {
                        this._cancellationParent = parent;
                        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
                        if (branchesRemainingToCancel === undefined) {
                            branchesRemainingToCancel = 0;
                        }
                        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
                    }
                    if ((flags & 2) !== 0 && parent._isBound()) {
                        this._setBoundTo(parent._boundTo);
                    }
                }

                function bindingPropagateFrom(parent, flags) {
                    if ((flags & 2) !== 0 && parent._isBound()) {
                        this._setBoundTo(parent._boundTo);
                    }
                }
                var propagateFromFunction = bindingPropagateFrom;

                function boundValueFunction() {
                    var ret = this._boundTo;
                    if (ret !== undefined) {
                        if (ret instanceof Promise) {
                            if (ret.isFulfilled()) {
                                return ret.value();
                            } else {
                                return undefined;
                            }
                        }
                    }
                    return ret;
                }

                function longStackTracesCaptureStackTrace() {
                    this._trace = new CapturedTrace(this._peekContext());
                }

                function longStackTracesAttachExtraTrace(error, ignoreSelf) {
                    if (canAttachTrace(error)) {
                        var trace = this._trace;
                        if (trace !== undefined) {
                            if (ignoreSelf) trace = trace._parent;
                        }
                        if (trace !== undefined) {
                            trace.attachExtraTrace(error);
                        } else if (!error.__stackCleaned__) {
                            var parsed = parseStackAndMessage(error);
                            util.notEnumerableProp(error, "stack",
                                parsed.message + "\n" + parsed.stack.join("\n"));
                            util.notEnumerableProp(error, "__stackCleaned__", true);
                        }
                    }
                }

                function checkForgottenReturns(returnValue, promiseCreated, name, promise,
                                               parent) {
                    if (returnValue === undefined && promiseCreated !== null &&
                        wForgottenReturn) {
                        if (parent !== undefined && parent._returnedNonUndefined()) return;
                        if ((promise._bitField & 65535) === 0) return;

                        if (name) name = name + " ";
                        var handlerLine = "";
                        var creatorLine = "";
                        if (promiseCreated._trace) {
                            var traceLines = promiseCreated._trace.stack.split("\n");
                            var stack = cleanStack(traceLines);
                            for (var i = stack.length - 1; i >= 0; --i) {
                                var line = stack[i];
                                if (!nodeFramePattern.test(line)) {
                                    var lineMatches = line.match(parseLinePattern);
                                    if (lineMatches) {
                                        handlerLine  = "at " + lineMatches[1] +
                                            ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                                    }
                                    break;
                                }
                            }

                            if (stack.length > 0) {
                                var firstUserLine = stack[0];
                                for (var i = 0; i < traceLines.length; ++i) {

                                    if (traceLines[i] === firstUserLine) {
                                        if (i > 0) {
                                            creatorLine = "\n" + traceLines[i - 1];
                                        }
                                        break;
                                    }
                                }

                            }
                        }
                        var msg = "a promise was created in a " + name +
                            "handler " + handlerLine + "but was not returned from it, " +
                            "see http://goo.gl/rRqMUw" +
                            creatorLine;
                        promise._warn(msg, true, promiseCreated);
                    }
                }

                function deprecated(name, replacement) {
                    var message = name +
                        " is deprecated and will be removed in a future version.";
                    if (replacement) message += " Use " + replacement + " instead.";
                    return warn(message);
                }

                function warn(message, shouldUseOwnTrace, promise) {
                    if (!config.warnings) return;
                    var warning = new Warning(message);
                    var ctx;
                    if (shouldUseOwnTrace) {
                        promise._attachExtraTrace(warning);
                    } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
                        ctx.attachExtraTrace(warning);
                    } else {
                        var parsed = parseStackAndMessage(warning);
                        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
                    }

                    if (!activeFireEvent("warning", warning)) {
                        formatAndLogError(warning, "", true);
                    }
                }

                function reconstructStack(message, stacks) {
                    for (var i = 0; i < stacks.length - 1; ++i) {
                        stacks[i].push("From previous event:");
                        stacks[i] = stacks[i].join("\n");
                    }
                    if (i < stacks.length) {
                        stacks[i] = stacks[i].join("\n");
                    }
                    return message + "\n" + stacks.join("\n");
                }

                function removeDuplicateOrEmptyJumps(stacks) {
                    for (var i = 0; i < stacks.length; ++i) {
                        if (stacks[i].length === 0 ||
                            ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
                            stacks.splice(i, 1);
                            i--;
                        }
                    }
                }

                function removeCommonRoots(stacks) {
                    var current = stacks[0];
                    for (var i = 1; i < stacks.length; ++i) {
                        var prev = stacks[i];
                        var currentLastIndex = current.length - 1;
                        var currentLastLine = current[currentLastIndex];
                        var commonRootMeetPoint = -1;

                        for (var j = prev.length - 1; j >= 0; --j) {
                            if (prev[j] === currentLastLine) {
                                commonRootMeetPoint = j;
                                break;
                            }
                        }

                        for (var j = commonRootMeetPoint; j >= 0; --j) {
                            var line = prev[j];
                            if (current[currentLastIndex] === line) {
                                current.pop();
                                currentLastIndex--;
                            } else {
                                break;
                            }
                        }
                        current = prev;
                    }
                }

                function cleanStack(stack) {
                    var ret = [];
                    for (var i = 0; i < stack.length; ++i) {
                        var line = stack[i];
                        var isTraceLine = "    (No stack trace)" === line ||
                            stackFramePattern.test(line);
                        var isInternalFrame = isTraceLine && shouldIgnore(line);
                        if (isTraceLine && !isInternalFrame) {
                            if (indentStackFrames && line.charAt(0) !== " ") {
                                line = "    " + line;
                            }
                            ret.push(line);
                        }
                    }
                    return ret;
                }

                function stackFramesAsArray(error) {
                    var stack = error.stack.replace(/\s+$/g, "").split("\n");
                    for (var i = 0; i < stack.length; ++i) {
                        var line = stack[i];
                        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
                            break;
                        }
                    }
                    if (i > 0 && error.name != "SyntaxError") {
                        stack = stack.slice(i);
                    }
                    return stack;
                }

                function parseStackAndMessage(error) {
                    var stack = error.stack;
                    var message = error.toString();
                    stack = typeof stack === "string" && stack.length > 0
                        ? stackFramesAsArray(error) : ["    (No stack trace)"];
                    return {
                        message: message,
                        stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
                    };
                }

                function formatAndLogError(error, title, isSoft) {
                    if (typeof console !== "undefined") {
                        var message;
                        if (util.isObject(error)) {
                            var stack = error.stack;
                            message = title + formatStack(stack, error);
                        } else {
                            message = title + String(error);
                        }
                        if (typeof printWarning === "function") {
                            printWarning(message, isSoft);
                        } else if (typeof console.log === "function" ||
                            typeof console.log === "object") {
                            console.log(message);
                        }
                    }
                }

                function fireRejectionEvent(name, localHandler, reason, promise) {
                    var localEventFired = false;
                    try {
                        if (typeof localHandler === "function") {
                            localEventFired = true;
                            if (name === "rejectionHandled") {
                                localHandler(promise);
                            } else {
                                localHandler(reason, promise);
                            }
                        }
                    } catch (e) {
                        async.throwLater(e);
                    }

                    if (name === "unhandledRejection") {
                        if (!activeFireEvent(name, reason, promise) && !localEventFired) {
                            formatAndLogError(reason, "Unhandled rejection ");
                        }
                    } else {
                        activeFireEvent(name, promise);
                    }
                }

                function formatNonError(obj) {
                    var str;
                    if (typeof obj === "function") {
                        str = "[function " +
                            (obj.name || "anonymous") +
                            "]";
                    } else {
                        str = obj && typeof obj.toString === "function"
                            ? obj.toString() : util.toString(obj);
                        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
                        if (ruselessToString.test(str)) {
                            try {
                                var newStr = JSON.stringify(obj);
                                str = newStr;
                            }
                            catch(e) {

                            }
                        }
                        if (str.length === 0) {
                            str = "(empty array)";
                        }
                    }
                    return ("(<" + snip(str) + ">, no stack trace)");
                }

                function snip(str) {
                    var maxChars = 41;
                    if (str.length < maxChars) {
                        return str;
                    }
                    return str.substr(0, maxChars - 3) + "...";
                }

                function longStackTracesIsSupported() {
                    return typeof captureStackTrace === "function";
                }

                var shouldIgnore = function() { return false; };
                var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
                function parseLineInfo(line) {
                    var matches = line.match(parseLineInfoRegex);
                    if (matches) {
                        return {
                            fileName: matches[1],
                            line: parseInt(matches[2], 10)
                        };
                    }
                }

                function setBounds(firstLineError, lastLineError) {
                    if (!longStackTracesIsSupported()) return;
                    // var firstStackLines = firstLineError.stack.split("\n");
                    // var lastStackLines = lastLineError.stack.split("\n");
                    // var firstIndex = -1;
                    // var lastIndex = -1;
                    // var firstFileName;
                    // var lastFileName;
                    // for (var i = 0; i < firstStackLines.length; ++i) {
                    //     var result = parseLineInfo(firstStackLines[i]);
                    //     if (result) {
                    //         firstFileName = result.fileName;
                    //         firstIndex = result.line;
                    //         break;
                    //     }
                    // }
                    // for (var i = 0; i < lastStackLines.length; ++i) {
                    //     var result = parseLineInfo(lastStackLines[i]);
                    //     if (result) {
                    //         lastFileName = result.fileName;
                    //         lastIndex = result.line;
                    //         break;
                    //     }
                    // }
                    // if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
                    //     firstFileName !== lastFileName || firstIndex >= lastIndex) {
                    //     return;
                    // }
                    //
                    // shouldIgnore = function(line) {
                    //     if (bluebirdFramePattern.test(line)) return true;
                    //     var info = parseLineInfo(line);
                    //     if (info) {
                    //         if (info.fileName === firstFileName &&
                    //             (firstIndex <= info.line && info.line <= lastIndex)) {
                    //             return true;
                    //         }
                    //     }
                    //     return false;
                    // };
                }

                function CapturedTrace(parent) {
                    this._parent = parent;
                    this._promisesCreated = 0;
                    var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
                    captureStackTrace(this, CapturedTrace);
                    if (length > 32) this.uncycle();
                }
                util.inherits(CapturedTrace, Error);
                Context.CapturedTrace = CapturedTrace;

                CapturedTrace.prototype.uncycle = function() {
                    var length = this._length;
                    if (length < 2) return;
                    var nodes = [];
                    var stackToIndex = {};

                    for (var i = 0, node = this; node !== undefined; ++i) {
                        nodes.push(node);
                        node = node._parent;
                    }
                    length = this._length = i;
                    for (var i = length - 1; i >= 0; --i) {
                        var stack = nodes[i].stack;
                        if (stackToIndex[stack] === undefined) {
                            stackToIndex[stack] = i;
                        }
                    }
                    for (var i = 0; i < length; ++i) {
                        var currentStack = nodes[i].stack;
                        var index = stackToIndex[currentStack];
                        if (index !== undefined && index !== i) {
                            if (index > 0) {
                                nodes[index - 1]._parent = undefined;
                                nodes[index - 1]._length = 1;
                            }
                            nodes[i]._parent = undefined;
                            nodes[i]._length = 1;
                            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

                            if (index < length - 1) {
                                cycleEdgeNode._parent = nodes[index + 1];
                                cycleEdgeNode._parent.uncycle();
                                cycleEdgeNode._length =
                                    cycleEdgeNode._parent._length + 1;
                            } else {
                                cycleEdgeNode._parent = undefined;
                                cycleEdgeNode._length = 1;
                            }
                            var currentChildLength = cycleEdgeNode._length + 1;
                            for (var j = i - 2; j >= 0; --j) {
                                nodes[j]._length = currentChildLength;
                                currentChildLength++;
                            }
                            return;
                        }
                    }
                };

                CapturedTrace.prototype.attachExtraTrace = function(error) {
                    if (error.__stackCleaned__) return;
                    this.uncycle();
                    var parsed = parseStackAndMessage(error);
                    var message = parsed.message;
                    var stacks = [parsed.stack];

                    var trace = this;
                    while (trace !== undefined) {
                        stacks.push(cleanStack(trace.stack.split("\n")));
                        trace = trace._parent;
                    }
                    removeCommonRoots(stacks);
                    removeDuplicateOrEmptyJumps(stacks);
                    util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
                    util.notEnumerableProp(error, "__stackCleaned__", true);
                };

                var captureStackTrace = (function stackDetection() {
                    var v8stackFramePattern = /^\s*at\s*/;
                    var v8stackFormatter = function(stack, error) {
                        if (typeof stack === "string") return stack;

                        if (error.name !== undefined &&
                            error.message !== undefined) {
                            return error.toString();
                        }
                        return formatNonError(error);
                    };

                    if (typeof Error.stackTraceLimit === "number" &&
                        typeof Error.captureStackTrace === "function") {
                        Error.stackTraceLimit += 6;
                        stackFramePattern = v8stackFramePattern;
                        formatStack = v8stackFormatter;
                        var captureStackTrace = Error.captureStackTrace;

                        shouldIgnore = function(line) {
                            return bluebirdFramePattern.test(line);
                        };
                        return function(receiver, ignoreUntil) {
                            Error.stackTraceLimit += 6;
                            captureStackTrace(receiver, ignoreUntil);
                            Error.stackTraceLimit -= 6;
                        };
                    }
                    var err = new Error();

                    if (typeof err.stack === "string" &&
                        err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
                        stackFramePattern = /@/;
                        formatStack = v8stackFormatter;
                        indentStackFrames = true;
                        return function captureStackTrace(o) {
                            o.stack = new Error().stack;
                        };
                    }

                    var hasStackAfterThrow;
                    try { throw new Error(); }
                    catch(e) {
                        hasStackAfterThrow = ("stack" in e);
                    }
                    if (!("stack" in err) && hasStackAfterThrow &&
                        typeof Error.stackTraceLimit === "number") {
                        stackFramePattern = v8stackFramePattern;
                        formatStack = v8stackFormatter;
                        return function captureStackTrace(o) {
                            Error.stackTraceLimit += 6;
                            try { throw new Error(); }
                            catch(e) { o.stack = e.stack; }
                            Error.stackTraceLimit -= 6;
                        };
                    }

                    formatStack = function(stack, error) {
                        if (typeof stack === "string") return stack;

                        if ((typeof error === "object" ||
                                typeof error === "function") &&
                            error.name !== undefined &&
                            error.message !== undefined) {
                            return error.toString();
                        }
                        return formatNonError(error);
                    };

                    return null;

                })([]);

                if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
                    printWarning = function (message) {
                        console.warn(message);
                    };
                    if (util.isNode && process.stderr.isTTY) {
                        printWarning = function(message, isSoft) {
                            var color = isSoft ? "\u001b[33m" : "\u001b[31m";
                            console.warn(color + message + "\u001b[0m\n");
                        };
                    } else if (!util.isNode && typeof (new Error().stack) === "string") {
                        printWarning = function(message, isSoft) {
                            console.warn("%c" + message,
                                isSoft ? "color: darkorange" : "color: red");
                        };
                    }
                }

                var config = {
                    warnings: warnings,
                    longStackTraces: false,
                    cancellation: false,
                    monitoring: false
                };

                if (longStackTraces) Promise.longStackTraces();

                return {
                    longStackTraces: function() {
                        return config.longStackTraces;
                    },
                    warnings: function() {
                        return config.warnings;
                    },
                    cancellation: function() {
                        return config.cancellation;
                    },
                    monitoring: function() {
                        return config.monitoring;
                    },
                    propagateFromFunction: function() {
                        return propagateFromFunction;
                    },
                    boundValueFunction: function() {
                        return boundValueFunction;
                    },
                    checkForgottenReturns: checkForgottenReturns,
                    setBounds: setBounds,
                    warn: warn,
                    deprecated: deprecated,
                    CapturedTrace: CapturedTrace,
                    fireDomEvent: fireDomEvent,
                    fireGlobalEvent: fireGlobalEvent
                };
            };

        },{"./errors":12,"./util":36}],10:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise) {
                function returner() {
                    return this.value;
                }
                function thrower() {
                    throw this.reason;
                }

                Promise.prototype["return"] =
                    Promise.prototype.thenReturn = function (value) {
                        if (value instanceof Promise) value.suppressUnhandledRejections();
                        return this._then(
                            returner, undefined, undefined, {value: value}, undefined);
                    };

                Promise.prototype["throw"] =
                    Promise.prototype.thenThrow = function (reason) {
                        return this._then(
                            thrower, undefined, undefined, {reason: reason}, undefined);
                    };

                Promise.prototype.catchThrow = function (reason) {
                    if (arguments.length <= 1) {
                        return this._then(
                            undefined, thrower, undefined, {reason: reason}, undefined);
                    } else {
                        var _reason = arguments[1];
                        var handler = function() {throw _reason;};
                        return this.caught(reason, handler);
                    }
                };

                Promise.prototype.catchReturn = function (value) {
                    if (arguments.length <= 1) {
                        if (value instanceof Promise) value.suppressUnhandledRejections();
                        return this._then(
                            undefined, returner, undefined, {value: value}, undefined);
                    } else {
                        var _value = arguments[1];
                        if (_value instanceof Promise) _value.suppressUnhandledRejections();
                        var handler = function() {return _value;};
                        return this.caught(value, handler);
                    }
                };
            };

        },{}],11:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise, INTERNAL) {
                var PromiseReduce = Promise.reduce;
                var PromiseAll = Promise.all;

                function promiseAllThis() {
                    return PromiseAll(this);
                }

                function PromiseMapSeries(promises, fn) {
                    return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
                }

                Promise.prototype.each = function (fn) {
                    return PromiseReduce(this, fn, INTERNAL, 0)
                        ._then(promiseAllThis, undefined, undefined, this, undefined);
                };

                Promise.prototype.mapSeries = function (fn) {
                    return PromiseReduce(this, fn, INTERNAL, INTERNAL);
                };

                Promise.each = function (promises, fn) {
                    return PromiseReduce(promises, fn, INTERNAL, 0)
                        ._then(promiseAllThis, undefined, undefined, promises, undefined);
                };

                Promise.mapSeries = PromiseMapSeries;
            };


        },{}],12:[function(_dereq_,module,exports){
            "use strict";
            var es5 = _dereq_("./es5");
            var Objectfreeze = es5.freeze;
            var util = _dereq_("./util");
            var inherits = util.inherits;
            var notEnumerableProp = util.notEnumerableProp;

            function subError(nameProperty, defaultMessage) {
                function SubError(message) {
                    if (!(this instanceof SubError)) return new SubError(message);
                    notEnumerableProp(this, "message",
                        typeof message === "string" ? message : defaultMessage);
                    notEnumerableProp(this, "name", nameProperty);
                    if (Error.captureStackTrace) {
                        Error.captureStackTrace(this, this.constructor);
                    } else {
                        Error.call(this);
                    }
                }
                inherits(SubError, Error);
                return SubError;
            }

            var _TypeError, _RangeError;
            var Warning = subError("Warning", "warning");
            var CancellationError = subError("CancellationError", "cancellation error");
            var TimeoutError = subError("TimeoutError", "timeout error");
            var AggregateError = subError("AggregateError", "aggregate error");
            try {
                _TypeError = TypeError;
                _RangeError = RangeError;
            } catch(e) {
                _TypeError = subError("TypeError", "type error");
                _RangeError = subError("RangeError", "range error");
            }

            var methods = ("join pop push shift unshift slice filter forEach some " +
                "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

            for (var i = 0; i < methods.length; ++i) {
                if (typeof Array.prototype[methods[i]] === "function") {
                    AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
                }
            }

            es5.defineProperty(AggregateError.prototype, "length", {
                value: 0,
                configurable: false,
                writable: true,
                enumerable: true
            });
            AggregateError.prototype["isOperational"] = true;
            var level = 0;
            AggregateError.prototype.toString = function() {
                var indent = Array(level * 4 + 1).join(" ");
                var ret = "\n" + indent + "AggregateError of:" + "\n";
                level++;
                indent = Array(level * 4 + 1).join(" ");
                for (var i = 0; i < this.length; ++i) {
                    var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
                    var lines = str.split("\n");
                    for (var j = 0; j < lines.length; ++j) {
                        lines[j] = indent + lines[j];
                    }
                    str = lines.join("\n");
                    ret += str + "\n";
                }
                level--;
                return ret;
            };

            function OperationalError(message) {
                if (!(this instanceof OperationalError))
                    return new OperationalError(message);
                notEnumerableProp(this, "name", "OperationalError");
                notEnumerableProp(this, "message", message);
                this.cause = message;
                this["isOperational"] = true;

                if (message instanceof Error) {
                    notEnumerableProp(this, "message", message.message);
                    notEnumerableProp(this, "stack", message.stack);
                } else if (Error.captureStackTrace) {
                    Error.captureStackTrace(this, this.constructor);
                }

            }
            inherits(OperationalError, Error);

            var errorTypes = Error["__BluebirdErrorTypes__"];
            if (!errorTypes) {
                errorTypes = Objectfreeze({
                    CancellationError: CancellationError,
                    TimeoutError: TimeoutError,
                    OperationalError: OperationalError,
                    RejectionError: OperationalError,
                    AggregateError: AggregateError
                });
                es5.defineProperty(Error, "__BluebirdErrorTypes__", {
                    value: errorTypes,
                    writable: false,
                    enumerable: false,
                    configurable: false
                });
            }

            module.exports = {
                Error: Error,
                TypeError: _TypeError,
                RangeError: _RangeError,
                CancellationError: errorTypes.CancellationError,
                OperationalError: errorTypes.OperationalError,
                TimeoutError: errorTypes.TimeoutError,
                AggregateError: errorTypes.AggregateError,
                Warning: Warning
            };

        },{"./es5":13,"./util":36}],13:[function(_dereq_,module,exports){
            var isES5 = (function(){
                "use strict";
                return this === undefined;
            })();

            if (isES5) {
                module.exports = {
                    freeze: Object.freeze,
                    defineProperty: Object.defineProperty,
                    getDescriptor: Object.getOwnPropertyDescriptor,
                    keys: Object.keys,
                    names: Object.getOwnPropertyNames,
                    getPrototypeOf: Object.getPrototypeOf,
                    isArray: Array.isArray,
                    isES5: isES5,
                    propertyIsWritable: function(obj, prop) {
                        var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
                        return !!(!descriptor || descriptor.writable || descriptor.set);
                    }
                };
            } else {
                var has = {}.hasOwnProperty;
                var str = {}.toString;
                var proto = {}.constructor.prototype;

                var ObjectKeys = function (o) {
                    var ret = [];
                    for (var key in o) {
                        if (has.call(o, key)) {
                            ret.push(key);
                        }
                    }
                    return ret;
                };

                var ObjectGetDescriptor = function(o, key) {
                    return {value: o[key]};
                };

                var ObjectDefineProperty = function (o, key, desc) {
                    o[key] = desc.value;
                    return o;
                };

                var ObjectFreeze = function (obj) {
                    return obj;
                };

                var ObjectGetPrototypeOf = function (obj) {
                    try {
                        return Object(obj).constructor.prototype;
                    }
                    catch (e) {
                        return proto;
                    }
                };

                var ArrayIsArray = function (obj) {
                    try {
                        return str.call(obj) === "[object Array]";
                    }
                    catch(e) {
                        return false;
                    }
                };

                module.exports = {
                    isArray: ArrayIsArray,
                    keys: ObjectKeys,
                    names: ObjectKeys,
                    defineProperty: ObjectDefineProperty,
                    getDescriptor: ObjectGetDescriptor,
                    freeze: ObjectFreeze,
                    getPrototypeOf: ObjectGetPrototypeOf,
                    isES5: isES5,
                    propertyIsWritable: function() {
                        return true;
                    }
                };
            }

        },{}],14:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise, INTERNAL) {
                var PromiseMap = Promise.map;

                Promise.prototype.filter = function (fn, options) {
                    return PromiseMap(this, fn, options, INTERNAL);
                };

                Promise.filter = function (promises, fn, options) {
                    return PromiseMap(promises, fn, options, INTERNAL);
                };
            };

        },{}],15:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise, tryConvertToPromise, NEXT_FILTER) {
                var util = _dereq_("./util");
                var CancellationError = Promise.CancellationError;
                var errorObj = util.errorObj;
                var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);

                function PassThroughHandlerContext(promise, type, handler) {
                    this.promise = promise;
                    this.type = type;
                    this.handler = handler;
                    this.called = false;
                    this.cancelPromise = null;
                }

                PassThroughHandlerContext.prototype.isFinallyHandler = function() {
                    return this.type === 0;
                };

                function FinallyHandlerCancelReaction(finallyHandler) {
                    this.finallyHandler = finallyHandler;
                }

                FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
                    checkCancel(this.finallyHandler);
                };

                function checkCancel(ctx, reason) {
                    if (ctx.cancelPromise != null) {
                        if (arguments.length > 1) {
                            ctx.cancelPromise._reject(reason);
                        } else {
                            ctx.cancelPromise._cancel();
                        }
                        ctx.cancelPromise = null;
                        return true;
                    }
                    return false;
                }

                function succeed() {
                    return finallyHandler.call(this, this.promise._target()._settledValue());
                }
                function fail(reason) {
                    if (checkCancel(this, reason)) return;
                    errorObj.e = reason;
                    return errorObj;
                }
                function finallyHandler(reasonOrValue) {
                    var promise = this.promise;
                    var handler = this.handler;

                    if (!this.called) {
                        this.called = true;
                        var ret = this.isFinallyHandler()
                            ? handler.call(promise._boundValue())
                            : handler.call(promise._boundValue(), reasonOrValue);
                        if (ret === NEXT_FILTER) {
                            return ret;
                        } else if (ret !== undefined) {
                            promise._setReturnedNonUndefined();
                            var maybePromise = tryConvertToPromise(ret, promise);
                            if (maybePromise instanceof Promise) {
                                if (this.cancelPromise != null) {
                                    if (maybePromise._isCancelled()) {
                                        var reason =
                                            new CancellationError("late cancellation observer");
                                        promise._attachExtraTrace(reason);
                                        errorObj.e = reason;
                                        return errorObj;
                                    } else if (maybePromise.isPending()) {
                                        maybePromise._attachCancellationCallback(
                                            new FinallyHandlerCancelReaction(this));
                                    }
                                }
                                return maybePromise._then(
                                    succeed, fail, undefined, this, undefined);
                            }
                        }
                    }

                    if (promise.isRejected()) {
                        checkCancel(this);
                        errorObj.e = reasonOrValue;
                        return errorObj;
                    } else {
                        checkCancel(this);
                        return reasonOrValue;
                    }
                }

                Promise.prototype._passThrough = function(handler, type, success, fail) {
                    if (typeof handler !== "function") return this.then();
                    return this._then(success,
                        fail,
                        undefined,
                        new PassThroughHandlerContext(this, type, handler),
                        undefined);
                };

                Promise.prototype.lastly =
                    Promise.prototype["finally"] = function (handler) {
                        return this._passThrough(handler,
                            0,
                            finallyHandler,
                            finallyHandler);
                    };


                Promise.prototype.tap = function (handler) {
                    return this._passThrough(handler, 1, finallyHandler);
                };

                Promise.prototype.tapCatch = function (handlerOrPredicate) {
                    var len = arguments.length;
                    if(len === 1) {
                        return this._passThrough(handlerOrPredicate,
                            1,
                            undefined,
                            finallyHandler);
                    } else {
                        var catchInstances = new Array(len - 1),
                            j = 0, i;
                        for (i = 0; i < len - 1; ++i) {
                            var item = arguments[i];
                            if (util.isObject(item)) {
                                catchInstances[j++] = item;
                            } else {
                                return Promise.reject(new TypeError(
                                    "tapCatch statement predicate: "
                                    + "expecting an object but got " + util.classString(item)
                                ));
                            }
                        }
                        catchInstances.length = j;
                        var handler = arguments[i];
                        return this._passThrough(catchFilter(catchInstances, handler, this),
                            1,
                            undefined,
                            finallyHandler);
                    }

                };

                return PassThroughHandlerContext;
            };

        },{"./catch_filter":7,"./util":36}],16:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise,
                                      apiRejection,
                                      INTERNAL,
                                      tryConvertToPromise,
                                      Proxyable,
                                      debug) {
                var errors = _dereq_("./errors");
                var TypeError = errors.TypeError;
                var util = _dereq_("./util");
                var errorObj = util.errorObj;
                var tryCatch = util.tryCatch;
                var yieldHandlers = [];

                function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
                    for (var i = 0; i < yieldHandlers.length; ++i) {
                        traceParent._pushContext();
                        var result = tryCatch(yieldHandlers[i])(value);
                        traceParent._popContext();
                        if (result === errorObj) {
                            traceParent._pushContext();
                            var ret = Promise.reject(errorObj.e);
                            traceParent._popContext();
                            return ret;
                        }
                        var maybePromise = tryConvertToPromise(result, traceParent);
                        if (maybePromise instanceof Promise) return maybePromise;
                    }
                    return null;
                }

                function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
                    if (debug.cancellation()) {
                        var internal = new Promise(INTERNAL);
                        var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
                        this._promise = internal.lastly(function() {
                            return _finallyPromise;
                        });
                        internal._captureStackTrace();
                        internal._setOnCancel(this);
                    } else {
                        var promise = this._promise = new Promise(INTERNAL);
                        promise._captureStackTrace();
                    }
                    this._stack = stack;
                    this._generatorFunction = generatorFunction;
                    this._receiver = receiver;
                    this._generator = undefined;
                    this._yieldHandlers = typeof yieldHandler === "function"
                        ? [yieldHandler].concat(yieldHandlers)
                        : yieldHandlers;
                    this._yieldedPromise = null;
                    this._cancellationPhase = false;
                }
                util.inherits(PromiseSpawn, Proxyable);

                PromiseSpawn.prototype._isResolved = function() {
                    return this._promise === null;
                };

                PromiseSpawn.prototype._cleanup = function() {
                    this._promise = this._generator = null;
                    if (debug.cancellation() && this._finallyPromise !== null) {
                        this._finallyPromise._fulfill();
                        this._finallyPromise = null;
                    }
                };

                PromiseSpawn.prototype._promiseCancelled = function() {
                    if (this._isResolved()) return;
                    var implementsReturn = typeof this._generator["return"] !== "undefined";

                    var result;
                    if (!implementsReturn) {
                        var reason = new Promise.CancellationError(
                            "generator .return() sentinel");
                        Promise.coroutine.returnSentinel = reason;
                        this._promise._attachExtraTrace(reason);
                        this._promise._pushContext();
                        result = tryCatch(this._generator["throw"]).call(this._generator,
                            reason);
                        this._promise._popContext();
                    } else {
                        this._promise._pushContext();
                        result = tryCatch(this._generator["return"]).call(this._generator,
                            undefined);
                        this._promise._popContext();
                    }
                    this._cancellationPhase = true;
                    this._yieldedPromise = null;
                    this._continue(result);
                };

                PromiseSpawn.prototype._promiseFulfilled = function(value) {
                    this._yieldedPromise = null;
                    this._promise._pushContext();
                    var result = tryCatch(this._generator.next).call(this._generator, value);
                    this._promise._popContext();
                    this._continue(result);
                };

                PromiseSpawn.prototype._promiseRejected = function(reason) {
                    this._yieldedPromise = null;
                    this._promise._attachExtraTrace(reason);
                    this._promise._pushContext();
                    var result = tryCatch(this._generator["throw"])
                        .call(this._generator, reason);
                    this._promise._popContext();
                    this._continue(result);
                };

                PromiseSpawn.prototype._resultCancelled = function() {
                    if (this._yieldedPromise instanceof Promise) {
                        var promise = this._yieldedPromise;
                        this._yieldedPromise = null;
                        promise.cancel();
                    }
                };

                PromiseSpawn.prototype.promise = function () {
                    return this._promise;
                };

                PromiseSpawn.prototype._run = function () {
                    this._generator = this._generatorFunction.call(this._receiver);
                    this._receiver =
                        this._generatorFunction = undefined;
                    this._promiseFulfilled(undefined);
                };

                PromiseSpawn.prototype._continue = function (result) {
                    var promise = this._promise;
                    if (result === errorObj) {
                        this._cleanup();
                        if (this._cancellationPhase) {
                            return promise.cancel();
                        } else {
                            return promise._rejectCallback(result.e, false);
                        }
                    }

                    var value = result.value;
                    if (result.done === true) {
                        this._cleanup();
                        if (this._cancellationPhase) {
                            return promise.cancel();
                        } else {
                            return promise._resolveCallback(value);
                        }
                    } else {
                        var maybePromise = tryConvertToPromise(value, this._promise);
                        if (!(maybePromise instanceof Promise)) {
                            maybePromise =
                                promiseFromYieldHandler(maybePromise,
                                    this._yieldHandlers,
                                    this._promise);
                            if (maybePromise === null) {
                                this._promiseRejected(
                                    new TypeError(
                                        "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", String(value)) +
                                        "From coroutine:\u000a" +
                                        this._stack.split("\n").slice(1, -7).join("\n")
                                    )
                                );
                                return;
                            }
                        }
                        maybePromise = maybePromise._target();
                        var bitField = maybePromise._bitField;
                        ;
                        if (((bitField & 50397184) === 0)) {
                            this._yieldedPromise = maybePromise;
                            maybePromise._proxy(this, null);
                        } else if (((bitField & 33554432) !== 0)) {
                            Promise._async.invoke(
                                this._promiseFulfilled, this, maybePromise._value()
                            );
                        } else if (((bitField & 16777216) !== 0)) {
                            Promise._async.invoke(
                                this._promiseRejected, this, maybePromise._reason()
                            );
                        } else {
                            this._promiseCancelled();
                        }
                    }
                };

                Promise.coroutine = function (generatorFunction, options) {
                    if (typeof generatorFunction !== "function") {
                        throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
                    }
                    var yieldHandler = Object(options).yieldHandler;
                    var PromiseSpawn$ = PromiseSpawn;
                    var stack = new Error().stack;
                    return function () {
                        var generator = generatorFunction.apply(this, arguments);
                        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
                            stack);
                        var ret = spawn.promise();
                        spawn._generator = generator;
                        spawn._promiseFulfilled(undefined);
                        return ret;
                    };
                };

                Promise.coroutine.addYieldHandler = function(fn) {
                    if (typeof fn !== "function") {
                        throw new TypeError("expecting a function but got " + util.classString(fn));
                    }
                    yieldHandlers.push(fn);
                };

                Promise.spawn = function (generatorFunction) {
                    debug.deprecated("Promise.spawn()", "Promise.coroutine()");
                    if (typeof generatorFunction !== "function") {
                        return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
                    }
                    var spawn = new PromiseSpawn(generatorFunction, this);
                    var ret = spawn.promise();
                    spawn._run(Promise.spawn);
                    return ret;
                };
            };

        },{"./errors":12,"./util":36}],17:[function(_dereq_,module,exports){
            "use strict";
            module.exports =
                function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async,
                         getDomain) {
                    var util = _dereq_("./util");
                    var canEvaluate = util.canEvaluate;
                    var tryCatch = util.tryCatch;
                    var errorObj = util.errorObj;
                    var reject;

                    if (!true) {
                        if (canEvaluate) {
                            var thenCallback = function(i) {
                                return new Function("value", "holder", "                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g, i));
                            };

                            var promiseSetter = function(i) {
                                return new Function("promise", "holder", "                           \n\
            'use strict';                                                    \n\
            holder.pIndex = promise;                                         \n\
            ".replace(/Index/g, i));
                            };

                            var generateHolderClass = function(total) {
                                var props = new Array(total);
                                for (var i = 0; i < props.length; ++i) {
                                    props[i] = "this.p" + (i+1);
                                }
                                var assignment = props.join(" = ") + " = null;";
                                var cancellationCode= "var promise;\n" + props.map(function(prop) {
                                    return "                                                         \n\
                promise = " + prop + ";                                      \n\
                if (promise instanceof Promise) {                            \n\
                    promise.cancel();                                        \n\
                }                                                            \n\
            ";
                                }).join("\n");
                                var passedArguments = props.join(", ");
                                var name = "Holder$" + total;


                                var code = "return function(tryCatch, errorObj, Promise, async) {    \n\
            'use strict';                                                    \n\
            function [TheName](fn) {                                         \n\
                [TheProperties]                                              \n\
                this.fn = fn;                                                \n\
                this.asyncNeeded = true;                                     \n\
                this.now = 0;                                                \n\
            }                                                                \n\
                                                                             \n\
            [TheName].prototype._callFunction = function(promise) {          \n\
                promise._pushContext();                                      \n\
                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
                promise._popContext();                                       \n\
                if (ret === errorObj) {                                      \n\
                    promise._rejectCallback(ret.e, false);                   \n\
                } else {                                                     \n\
                    promise._resolveCallback(ret);                           \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype.checkFulfillment = function(promise) {       \n\
                var now = ++this.now;                                        \n\
                if (now === [TheTotal]) {                                    \n\
                    if (this.asyncNeeded) {                                  \n\
                        async.invoke(this._callFunction, this, promise);     \n\
                    } else {                                                 \n\
                        this._callFunction(promise);                         \n\
                    }                                                        \n\
                                                                             \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype._resultCancelled = function() {              \n\
                [CancellationCode]                                           \n\
            };                                                               \n\
                                                                             \n\
            return [TheName];                                                \n\
        }(tryCatch, errorObj, Promise, async);                               \n\
        ";

                                code = code.replace(/\[TheName\]/g, name)
                                    .replace(/\[TheTotal\]/g, total)
                                    .replace(/\[ThePassedArguments\]/g, passedArguments)
                                    .replace(/\[TheProperties\]/g, assignment)
                                    .replace(/\[CancellationCode\]/g, cancellationCode);

                                return new Function("tryCatch", "errorObj", "Promise", "async", code)
                                (tryCatch, errorObj, Promise, async);
                            };

                            var holderClasses = [];
                            var thenCallbacks = [];
                            var promiseSetters = [];

                            for (var i = 0; i < 8; ++i) {
                                holderClasses.push(generateHolderClass(i + 1));
                                thenCallbacks.push(thenCallback(i + 1));
                                promiseSetters.push(promiseSetter(i + 1));
                            }

                            reject = function (reason) {
                                this._reject(reason);
                            };
                        }}

                    Promise.join = function () {
                        var last = arguments.length - 1;
                        var fn;
                        if (last > 0 && typeof arguments[last] === "function") {
                            fn = arguments[last];
                            if (!true) {
                                if (last <= 8 && canEvaluate) {
                                    var ret = new Promise(INTERNAL);
                                    ret._captureStackTrace();
                                    var HolderClass = holderClasses[last - 1];
                                    var holder = new HolderClass(fn);
                                    var callbacks = thenCallbacks;

                                    for (var i = 0; i < last; ++i) {
                                        var maybePromise = tryConvertToPromise(arguments[i], ret);
                                        if (maybePromise instanceof Promise) {
                                            maybePromise = maybePromise._target();
                                            var bitField = maybePromise._bitField;
                                            ;
                                            if (((bitField & 50397184) === 0)) {
                                                maybePromise._then(callbacks[i], reject,
                                                    undefined, ret, holder);
                                                promiseSetters[i](maybePromise, holder);
                                                holder.asyncNeeded = false;
                                            } else if (((bitField & 33554432) !== 0)) {
                                                callbacks[i].call(ret,
                                                    maybePromise._value(), holder);
                                            } else if (((bitField & 16777216) !== 0)) {
                                                ret._reject(maybePromise._reason());
                                            } else {
                                                ret._cancel();
                                            }
                                        } else {
                                            callbacks[i].call(ret, maybePromise, holder);
                                        }
                                    }

                                    if (!ret._isFateSealed()) {
                                        if (holder.asyncNeeded) {
                                            var domain = getDomain();
                                            if (domain !== null) {
                                                holder.fn = util.domainBind(domain, holder.fn);
                                            }
                                        }
                                        ret._setAsyncGuaranteed();
                                        ret._setOnCancel(holder);
                                    }
                                    return ret;
                                }
                            }
                        }
                        var args = [].slice.call(arguments);;
                        if (fn) args.pop();
                        var ret = new PromiseArray(args).promise();
                        return fn !== undefined ? ret.spread(fn) : ret;
                    };

                };

        },{"./util":36}],18:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise,
                                      PromiseArray,
                                      apiRejection,
                                      tryConvertToPromise,
                                      INTERNAL,
                                      debug) {
                var getDomain = Promise._getDomain;
                var util = _dereq_("./util");
                var tryCatch = util.tryCatch;
                var errorObj = util.errorObj;
                var async = Promise._async;

                function MappingPromiseArray(promises, fn, limit, _filter) {
                    this.constructor$(promises);
                    this._promise._captureStackTrace();
                    var domain = getDomain();
                    this._callback = domain === null ? fn : util.domainBind(domain, fn);
                    this._preservedValues = _filter === INTERNAL
                        ? new Array(this.length())
                        : null;
                    this._limit = limit;
                    this._inFlight = 0;
                    this._queue = [];
                    async.invoke(this._asyncInit, this, undefined);
                }
                util.inherits(MappingPromiseArray, PromiseArray);

                MappingPromiseArray.prototype._asyncInit = function() {
                    this._init$(undefined, -2);
                };

                MappingPromiseArray.prototype._init = function () {};

                MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
                    var values = this._values;
                    var length = this.length();
                    var preservedValues = this._preservedValues;
                    var limit = this._limit;

                    if (index < 0) {
                        index = (index * -1) - 1;
                        values[index] = value;
                        if (limit >= 1) {
                            this._inFlight--;
                            this._drainQueue();
                            if (this._isResolved()) return true;
                        }
                    } else {
                        if (limit >= 1 && this._inFlight >= limit) {
                            values[index] = value;
                            this._queue.push(index);
                            return false;
                        }
                        if (preservedValues !== null) preservedValues[index] = value;

                        var promise = this._promise;
                        var callback = this._callback;
                        var receiver = promise._boundValue();
                        promise._pushContext();
                        var ret = tryCatch(callback).call(receiver, value, index, length);
                        var promiseCreated = promise._popContext();
                        debug.checkForgottenReturns(
                            ret,
                            promiseCreated,
                            preservedValues !== null ? "Promise.filter" : "Promise.map",
                            promise
                        );
                        if (ret === errorObj) {
                            this._reject(ret.e);
                            return true;
                        }

                        var maybePromise = tryConvertToPromise(ret, this._promise);
                        if (maybePromise instanceof Promise) {
                            maybePromise = maybePromise._target();
                            var bitField = maybePromise._bitField;
                            ;
                            if (((bitField & 50397184) === 0)) {
                                if (limit >= 1) this._inFlight++;
                                values[index] = maybePromise;
                                maybePromise._proxy(this, (index + 1) * -1);
                                return false;
                            } else if (((bitField & 33554432) !== 0)) {
                                ret = maybePromise._value();
                            } else if (((bitField & 16777216) !== 0)) {
                                this._reject(maybePromise._reason());
                                return true;
                            } else {
                                this._cancel();
                                return true;
                            }
                        }
                        values[index] = ret;
                    }
                    var totalResolved = ++this._totalResolved;
                    if (totalResolved >= length) {
                        if (preservedValues !== null) {
                            this._filter(values, preservedValues);
                        } else {
                            this._resolve(values);
                        }
                        return true;
                    }
                    return false;
                };

                MappingPromiseArray.prototype._drainQueue = function () {
                    var queue = this._queue;
                    var limit = this._limit;
                    var values = this._values;
                    while (queue.length > 0 && this._inFlight < limit) {
                        if (this._isResolved()) return;
                        var index = queue.pop();
                        this._promiseFulfilled(values[index], index);
                    }
                };

                MappingPromiseArray.prototype._filter = function (booleans, values) {
                    var len = values.length;
                    var ret = new Array(len);
                    var j = 0;
                    for (var i = 0; i < len; ++i) {
                        if (booleans[i]) ret[j++] = values[i];
                    }
                    ret.length = j;
                    this._resolve(ret);
                };

                MappingPromiseArray.prototype.preservedValues = function () {
                    return this._preservedValues;
                };

                function map(promises, fn, options, _filter) {
                    if (typeof fn !== "function") {
                        return apiRejection("expecting a function but got " + util.classString(fn));
                    }

                    var limit = 0;
                    if (options !== undefined) {
                        if (typeof options === "object" && options !== null) {
                            if (typeof options.concurrency !== "number") {
                                return Promise.reject(
                                    new TypeError("'concurrency' must be a number but it is " +
                                        util.classString(options.concurrency)));
                            }
                            limit = options.concurrency;
                        } else {
                            return Promise.reject(new TypeError(
                                "options argument must be an object but it is " +
                                util.classString(options)));
                        }
                    }
                    limit = typeof limit === "number" &&
                    isFinite(limit) && limit >= 1 ? limit : 0;
                    return new MappingPromiseArray(promises, fn, limit, _filter).promise();
                }

                Promise.prototype.map = function (fn, options) {
                    return map(this, fn, options, null);
                };

                Promise.map = function (promises, fn, options, _filter) {
                    return map(promises, fn, options, _filter);
                };


            };

        },{"./util":36}],19:[function(_dereq_,module,exports){
            "use strict";
            module.exports =
                function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
                    var util = _dereq_("./util");
                    var tryCatch = util.tryCatch;

                    Promise.method = function (fn) {
                        if (typeof fn !== "function") {
                            throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
                        }
                        return function () {
                            var ret = new Promise(INTERNAL);
                            ret._captureStackTrace();
                            ret._pushContext();
                            var value = tryCatch(fn).apply(this, arguments);
                            var promiseCreated = ret._popContext();
                            debug.checkForgottenReturns(
                                value, promiseCreated, "Promise.method", ret);
                            ret._resolveFromSyncValue(value);
                            return ret;
                        };
                    };

                    Promise.attempt = Promise["try"] = function (fn) {
                        if (typeof fn !== "function") {
                            return apiRejection("expecting a function but got " + util.classString(fn));
                        }
                        var ret = new Promise(INTERNAL);
                        ret._captureStackTrace();
                        ret._pushContext();
                        var value;
                        if (arguments.length > 1) {
                            debug.deprecated("calling Promise.try with more than 1 argument");
                            var arg = arguments[1];
                            var ctx = arguments[2];
                            value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
                                : tryCatch(fn).call(ctx, arg);
                        } else {
                            value = tryCatch(fn)();
                        }
                        var promiseCreated = ret._popContext();
                        debug.checkForgottenReturns(
                            value, promiseCreated, "Promise.try", ret);
                        ret._resolveFromSyncValue(value);
                        return ret;
                    };

                    Promise.prototype._resolveFromSyncValue = function (value) {
                        if (value === util.errorObj) {
                            this._rejectCallback(value.e, false);
                        } else {
                            this._resolveCallback(value, true);
                        }
                    };
                };

        },{"./util":36}],20:[function(_dereq_,module,exports){
            "use strict";
            var util = _dereq_("./util");
            var maybeWrapAsError = util.maybeWrapAsError;
            var errors = _dereq_("./errors");
            var OperationalError = errors.OperationalError;
            var es5 = _dereq_("./es5");

            function isUntypedError(obj) {
                return obj instanceof Error &&
                    es5.getPrototypeOf(obj) === Error.prototype;
            }

            var rErrorKey = /^(?:name|message|stack|cause)$/;
            function wrapAsOperationalError(obj) {
                var ret;
                if (isUntypedError(obj)) {
                    ret = new OperationalError(obj);
                    ret.name = obj.name;
                    ret.message = obj.message;
                    ret.stack = obj.stack;
                    var keys = es5.keys(obj);
                    for (var i = 0; i < keys.length; ++i) {
                        var key = keys[i];
                        if (!rErrorKey.test(key)) {
                            ret[key] = obj[key];
                        }
                    }
                    return ret;
                }
                util.markAsOriginatingFromRejection(obj);
                return obj;
            }

            function nodebackForPromise(promise, multiArgs) {
                return function(err, value) {
                    if (promise === null) return;
                    if (err) {
                        var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
                        promise._attachExtraTrace(wrapped);
                        promise._reject(wrapped);
                    } else if (!multiArgs) {
                        promise._fulfill(value);
                    } else {
                        var args = [].slice.call(arguments, 1);;
                        promise._fulfill(args);
                    }
                    promise = null;
                };
            }

            module.exports = nodebackForPromise;

        },{"./errors":12,"./es5":13,"./util":36}],21:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise) {
                var util = _dereq_("./util");
                var async = Promise._async;
                var tryCatch = util.tryCatch;
                var errorObj = util.errorObj;

                function spreadAdapter(val, nodeback) {
                    var promise = this;
                    if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
                    var ret =
                        tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
                    if (ret === errorObj) {
                        async.throwLater(ret.e);
                    }
                }

                function successAdapter(val, nodeback) {
                    var promise = this;
                    var receiver = promise._boundValue();
                    var ret = val === undefined
                        ? tryCatch(nodeback).call(receiver, null)
                        : tryCatch(nodeback).call(receiver, null, val);
                    if (ret === errorObj) {
                        async.throwLater(ret.e);
                    }
                }
                function errorAdapter(reason, nodeback) {
                    var promise = this;
                    if (!reason) {
                        var newReason = new Error(reason + "");
                        newReason.cause = reason;
                        reason = newReason;
                    }
                    var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
                    if (ret === errorObj) {
                        async.throwLater(ret.e);
                    }
                }

                Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
                                                                                     options) {
                    if (typeof nodeback == "function") {
                        var adapter = successAdapter;
                        if (options !== undefined && Object(options).spread) {
                            adapter = spreadAdapter;
                        }
                        this._then(
                            adapter,
                            errorAdapter,
                            undefined,
                            this,
                            nodeback
                        );
                    }
                    return this;
                };
            };

        },{"./util":36}],22:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function() {
                var makeSelfResolutionError = function () {
                    return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
                };
                var reflectHandler = function() {
                    return new Promise.PromiseInspection(this._target());
                };
                var apiRejection = function(msg) {
                    return Promise.reject(new TypeError(msg));
                };
                function Proxyable() {}
                var UNDEFINED_BINDING = {};
                var util = _dereq_("./util");

                var getDomain;
                if (util.isNode) {
                    getDomain = function() {
                        var ret = process.domain;
                        if (ret === undefined) ret = null;
                        return ret;
                    };
                } else {
                    getDomain = function() {
                        return null;
                    };
                }
                util.notEnumerableProp(Promise, "_getDomain", getDomain);

                var es5 = _dereq_("./es5");
                var Async = _dereq_("./async");
                var async = new Async();
                es5.defineProperty(Promise, "_async", {value: async});
                var errors = _dereq_("./errors");
                var TypeError = Promise.TypeError = errors.TypeError;
                Promise.RangeError = errors.RangeError;
                var CancellationError = Promise.CancellationError = errors.CancellationError;
                Promise.TimeoutError = errors.TimeoutError;
                Promise.OperationalError = errors.OperationalError;
                Promise.RejectionError = errors.OperationalError;
                Promise.AggregateError = errors.AggregateError;
                var INTERNAL = function(){};
                var APPLY = {};
                var NEXT_FILTER = {};
                var tryConvertToPromise = _dereq_("./thenables")(Promise, INTERNAL);
                var PromiseArray =
                    _dereq_("./promise_array")(Promise, INTERNAL,
                        tryConvertToPromise, apiRejection, Proxyable);
                var Context = _dereq_("./context")(Promise);
                /*jshint unused:false*/
                var createContext = Context.create;
                var debug = _dereq_("./debuggability")(Promise, Context);
                var CapturedTrace = debug.CapturedTrace;
                var PassThroughHandlerContext =
                    _dereq_("./finally")(Promise, tryConvertToPromise, NEXT_FILTER);
                var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);
                var nodebackForPromise = _dereq_("./nodeback");
                var errorObj = util.errorObj;
                var tryCatch = util.tryCatch;
                function check(self, executor) {
                    if (self == null || self.constructor !== Promise) {
                        throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
                    }
                    if (typeof executor !== "function") {
                        throw new TypeError("expecting a function but got " + util.classString(executor));
                    }

                }

                function Promise(executor) {
                    if (executor !== INTERNAL) {
                        check(this, executor);
                    }
                    this._bitField = 0;
                    this._fulfillmentHandler0 = undefined;
                    this._rejectionHandler0 = undefined;
                    this._promise0 = undefined;
                    this._receiver0 = undefined;
                    this._resolveFromExecutor(executor);
                    this._promiseCreated();
                    this._fireEvent("promiseCreated", this);
                }

                Promise.prototype.toString = function () {
                    return "[object Promise]";
                };

                Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
                    var len = arguments.length;
                    if (len > 1) {
                        var catchInstances = new Array(len - 1),
                            j = 0, i;
                        for (i = 0; i < len - 1; ++i) {
                            var item = arguments[i];
                            if (util.isObject(item)) {
                                catchInstances[j++] = item;
                            } else {
                                return apiRejection("Catch statement predicate: " +
                                    "expecting an object but got " + util.classString(item));
                            }
                        }
                        catchInstances.length = j;
                        fn = arguments[i];
                        return this.then(undefined, catchFilter(catchInstances, fn, this));
                    }
                    return this.then(undefined, fn);
                };

                Promise.prototype.reflect = function () {
                    return this._then(reflectHandler,
                        reflectHandler, undefined, this, undefined);
                };

                Promise.prototype.then = function (didFulfill, didReject) {
                    if (debug.warnings() && arguments.length > 0 &&
                        typeof didFulfill !== "function" &&
                        typeof didReject !== "function") {
                        var msg = ".then() only accepts functions but was passed: " +
                            util.classString(didFulfill);
                        if (arguments.length > 1) {
                            msg += ", " + util.classString(didReject);
                        }
                        this._warn(msg);
                    }
                    return this._then(didFulfill, didReject, undefined, undefined, undefined);
                };

                Promise.prototype.done = function (didFulfill, didReject) {
                    var promise =
                        this._then(didFulfill, didReject, undefined, undefined, undefined);
                    promise._setIsFinal();
                };

                Promise.prototype.spread = function (fn) {
                    if (typeof fn !== "function") {
                        return apiRejection("expecting a function but got " + util.classString(fn));
                    }
                    return this.all()._then(fn, undefined, undefined, APPLY, undefined);
                };

                Promise.prototype.toJSON = function () {
                    var ret = {
                        isFulfilled: false,
                        isRejected: false,
                        fulfillmentValue: undefined,
                        rejectionReason: undefined
                    };
                    if (this.isFulfilled()) {
                        ret.fulfillmentValue = this.value();
                        ret.isFulfilled = true;
                    } else if (this.isRejected()) {
                        ret.rejectionReason = this.reason();
                        ret.isRejected = true;
                    }
                    return ret;
                };

                Promise.prototype.all = function () {
                    if (arguments.length > 0) {
                        this._warn(".all() was passed arguments but it does not take any");
                    }
                    return new PromiseArray(this).promise();
                };

                Promise.prototype.error = function (fn) {
                    return this.caught(util.originatesFromRejection, fn);
                };

                Promise.getNewLibraryCopy = module.exports;

                Promise.is = function (val) {
                    return val instanceof Promise;
                };

                Promise.fromNode = Promise.fromCallback = function(fn) {
                    var ret = new Promise(INTERNAL);
                    ret._captureStackTrace();
                    var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
                        : false;
                    var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
                    if (result === errorObj) {
                        ret._rejectCallback(result.e, true);
                    }
                    if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
                    return ret;
                };

                Promise.all = function (promises) {
                    return new PromiseArray(promises).promise();
                };

                Promise.cast = function (obj) {
                    var ret = tryConvertToPromise(obj);
                    if (!(ret instanceof Promise)) {
                        ret = new Promise(INTERNAL);
                        ret._captureStackTrace();
                        ret._setFulfilled();
                        ret._rejectionHandler0 = obj;
                    }
                    return ret;
                };

                Promise.resolve = Promise.fulfilled = Promise.cast;

                Promise.reject = Promise.rejected = function (reason) {
                    var ret = new Promise(INTERNAL);
                    ret._captureStackTrace();
                    ret._rejectCallback(reason, true);
                    return ret;
                };

                Promise.setScheduler = function(fn) {
                    if (typeof fn !== "function") {
                        throw new TypeError("expecting a function but got " + util.classString(fn));
                    }
                    return async.setScheduler(fn);
                };

                Promise.prototype._then = function (
                    didFulfill,
                    didReject,
                    _,    receiver,
                    internalData
                ) {
                    var haveInternalData = internalData !== undefined;
                    var promise = haveInternalData ? internalData : new Promise(INTERNAL);
                    var target = this._target();
                    var bitField = target._bitField;

                    if (!haveInternalData) {
                        promise._propagateFrom(this, 3);
                        promise._captureStackTrace();
                        if (receiver === undefined &&
                            ((this._bitField & 2097152) !== 0)) {
                            if (!((bitField & 50397184) === 0)) {
                                receiver = this._boundValue();
                            } else {
                                receiver = target === this ? undefined : this._boundTo;
                            }
                        }
                        this._fireEvent("promiseChained", this, promise);
                    }

                    var domain = getDomain();
                    if (!((bitField & 50397184) === 0)) {
                        var handler, value, settler = target._settlePromiseCtx;
                        if (((bitField & 33554432) !== 0)) {
                            value = target._rejectionHandler0;
                            handler = didFulfill;
                        } else if (((bitField & 16777216) !== 0)) {
                            value = target._fulfillmentHandler0;
                            handler = didReject;
                            target._unsetRejectionIsUnhandled();
                        } else {
                            settler = target._settlePromiseLateCancellationObserver;
                            value = new CancellationError("late cancellation observer");
                            target._attachExtraTrace(value);
                            handler = didReject;
                        }

                        async.invoke(settler, target, {
                            handler: domain === null ? handler
                                : (typeof handler === "function" &&
                                    util.domainBind(domain, handler)),
                            promise: promise,
                            receiver: receiver,
                            value: value
                        });
                    } else {
                        target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
                    }

                    return promise;
                };

                Promise.prototype._length = function () {
                    return this._bitField & 65535;
                };

                Promise.prototype._isFateSealed = function () {
                    return (this._bitField & 117506048) !== 0;
                };

                Promise.prototype._isFollowing = function () {
                    return (this._bitField & 67108864) === 67108864;
                };

                Promise.prototype._setLength = function (len) {
                    this._bitField = (this._bitField & -65536) |
                        (len & 65535);
                };

                Promise.prototype._setFulfilled = function () {
                    this._bitField = this._bitField | 33554432;
                    this._fireEvent("promiseFulfilled", this);
                };

                Promise.prototype._setRejected = function () {
                    this._bitField = this._bitField | 16777216;
                    this._fireEvent("promiseRejected", this);
                };

                Promise.prototype._setFollowing = function () {
                    this._bitField = this._bitField | 67108864;
                    this._fireEvent("promiseResolved", this);
                };

                Promise.prototype._setIsFinal = function () {
                    this._bitField = this._bitField | 4194304;
                };

                Promise.prototype._isFinal = function () {
                    return (this._bitField & 4194304) > 0;
                };

                Promise.prototype._unsetCancelled = function() {
                    this._bitField = this._bitField & (~65536);
                };

                Promise.prototype._setCancelled = function() {
                    this._bitField = this._bitField | 65536;
                    this._fireEvent("promiseCancelled", this);
                };

                Promise.prototype._setWillBeCancelled = function() {
                    this._bitField = this._bitField | 8388608;
                };

                Promise.prototype._setAsyncGuaranteed = function() {
                    if (async.hasCustomScheduler()) return;
                    this._bitField = this._bitField | 134217728;
                };

                Promise.prototype._receiverAt = function (index) {
                    var ret = index === 0 ? this._receiver0 : this[
                    index * 4 - 4 + 3];
                    if (ret === UNDEFINED_BINDING) {
                        return undefined;
                    } else if (ret === undefined && this._isBound()) {
                        return this._boundValue();
                    }
                    return ret;
                };

                Promise.prototype._promiseAt = function (index) {
                    return this[
                    index * 4 - 4 + 2];
                };

                Promise.prototype._fulfillmentHandlerAt = function (index) {
                    return this[
                    index * 4 - 4 + 0];
                };

                Promise.prototype._rejectionHandlerAt = function (index) {
                    return this[
                    index * 4 - 4 + 1];
                };

                Promise.prototype._boundValue = function() {};

                Promise.prototype._migrateCallback0 = function (follower) {
                    var bitField = follower._bitField;
                    var fulfill = follower._fulfillmentHandler0;
                    var reject = follower._rejectionHandler0;
                    var promise = follower._promise0;
                    var receiver = follower._receiverAt(0);
                    if (receiver === undefined) receiver = UNDEFINED_BINDING;
                    this._addCallbacks(fulfill, reject, promise, receiver, null);
                };

                Promise.prototype._migrateCallbackAt = function (follower, index) {
                    var fulfill = follower._fulfillmentHandlerAt(index);
                    var reject = follower._rejectionHandlerAt(index);
                    var promise = follower._promiseAt(index);
                    var receiver = follower._receiverAt(index);
                    if (receiver === undefined) receiver = UNDEFINED_BINDING;
                    this._addCallbacks(fulfill, reject, promise, receiver, null);
                };

                Promise.prototype._addCallbacks = function (
                    fulfill,
                    reject,
                    promise,
                    receiver,
                    domain
                ) {
                    var index = this._length();

                    if (index >= 65535 - 4) {
                        index = 0;
                        this._setLength(0);
                    }

                    if (index === 0) {
                        this._promise0 = promise;
                        this._receiver0 = receiver;
                        if (typeof fulfill === "function") {
                            this._fulfillmentHandler0 =
                                domain === null ? fulfill : util.domainBind(domain, fulfill);
                        }
                        if (typeof reject === "function") {
                            this._rejectionHandler0 =
                                domain === null ? reject : util.domainBind(domain, reject);
                        }
                    } else {
                        var base = index * 4 - 4;
                        this[base + 2] = promise;
                        this[base + 3] = receiver;
                        if (typeof fulfill === "function") {
                            this[base + 0] =
                                domain === null ? fulfill : util.domainBind(domain, fulfill);
                        }
                        if (typeof reject === "function") {
                            this[base + 1] =
                                domain === null ? reject : util.domainBind(domain, reject);
                        }
                    }
                    this._setLength(index + 1);
                    return index;
                };

                Promise.prototype._proxy = function (proxyable, arg) {
                    this._addCallbacks(undefined, undefined, arg, proxyable, null);
                };

                Promise.prototype._resolveCallback = function(value, shouldBind) {
                    if (((this._bitField & 117506048) !== 0)) return;
                    if (value === this)
                        return this._rejectCallback(makeSelfResolutionError(), false);
                    var maybePromise = tryConvertToPromise(value, this);
                    if (!(maybePromise instanceof Promise)) return this._fulfill(value);

                    if (shouldBind) this._propagateFrom(maybePromise, 2);

                    var promise = maybePromise._target();

                    if (promise === this) {
                        this._reject(makeSelfResolutionError());
                        return;
                    }

                    var bitField = promise._bitField;
                    if (((bitField & 50397184) === 0)) {
                        var len = this._length();
                        if (len > 0) promise._migrateCallback0(this);
                        for (var i = 1; i < len; ++i) {
                            promise._migrateCallbackAt(this, i);
                        }
                        this._setFollowing();
                        this._setLength(0);
                        this._setFollowee(promise);
                    } else if (((bitField & 33554432) !== 0)) {
                        this._fulfill(promise._value());
                    } else if (((bitField & 16777216) !== 0)) {
                        this._reject(promise._reason());
                    } else {
                        var reason = new CancellationError("late cancellation observer");
                        promise._attachExtraTrace(reason);
                        this._reject(reason);
                    }
                };

                Promise.prototype._rejectCallback =
                    function(reason, synchronous, ignoreNonErrorWarnings) {
                        var trace = util.ensureErrorObject(reason);
                        var hasStack = trace === reason;
                        if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
                            var message = "a promise was rejected with a non-error: " +
                                util.classString(reason);
                            this._warn(message, true);
                        }
                        this._attachExtraTrace(trace, synchronous ? hasStack : false);
                        this._reject(reason);
                    };

                Promise.prototype._resolveFromExecutor = function (executor) {
                    if (executor === INTERNAL) return;
                    var promise = this;
                    this._captureStackTrace();
                    this._pushContext();
                    var synchronous = true;
                    var r = this._execute(executor, function(value) {
                        promise._resolveCallback(value);
                    }, function (reason) {
                        promise._rejectCallback(reason, synchronous);
                    });
                    synchronous = false;
                    this._popContext();

                    if (r !== undefined) {
                        promise._rejectCallback(r, true);
                    }
                };

                Promise.prototype._settlePromiseFromHandler = function (
                    handler, receiver, value, promise
                ) {
                    var bitField = promise._bitField;
                    if (((bitField & 65536) !== 0)) return;
                    promise._pushContext();
                    var x;
                    if (receiver === APPLY) {
                        if (!value || typeof value.length !== "number") {
                            x = errorObj;
                            x.e = new TypeError("cannot .spread() a non-array: " +
                                util.classString(value));
                        } else {
                            x = tryCatch(handler).apply(this._boundValue(), value);
                        }
                    } else {
                        x = tryCatch(handler).call(receiver, value);
                    }
                    var promiseCreated = promise._popContext();
                    bitField = promise._bitField;
                    if (((bitField & 65536) !== 0)) return;

                    if (x === NEXT_FILTER) {
                        promise._reject(value);
                    } else if (x === errorObj) {
                        promise._rejectCallback(x.e, false);
                    } else {
                        debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
                        promise._resolveCallback(x);
                    }
                };

                Promise.prototype._target = function() {
                    var ret = this;
                    while (ret._isFollowing()) ret = ret._followee();
                    return ret;
                };

                Promise.prototype._followee = function() {
                    return this._rejectionHandler0;
                };

                Promise.prototype._setFollowee = function(promise) {
                    this._rejectionHandler0 = promise;
                };

                Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
                    var isPromise = promise instanceof Promise;
                    var bitField = this._bitField;
                    var asyncGuaranteed = ((bitField & 134217728) !== 0);
                    if (((bitField & 65536) !== 0)) {
                        if (isPromise) promise._invokeInternalOnCancel();

                        if (receiver instanceof PassThroughHandlerContext &&
                            receiver.isFinallyHandler()) {
                            receiver.cancelPromise = promise;
                            if (tryCatch(handler).call(receiver, value) === errorObj) {
                                promise._reject(errorObj.e);
                            }
                        } else if (handler === reflectHandler) {
                            promise._fulfill(reflectHandler.call(receiver));
                        } else if (receiver instanceof Proxyable) {
                            receiver._promiseCancelled(promise);
                        } else if (isPromise || promise instanceof PromiseArray) {
                            promise._cancel();
                        } else {
                            receiver.cancel();
                        }
                    } else if (typeof handler === "function") {
                        if (!isPromise) {
                            handler.call(receiver, value, promise);
                        } else {
                            if (asyncGuaranteed) promise._setAsyncGuaranteed();
                            this._settlePromiseFromHandler(handler, receiver, value, promise);
                        }
                    } else if (receiver instanceof Proxyable) {
                        if (!receiver._isResolved()) {
                            if (((bitField & 33554432) !== 0)) {
                                receiver._promiseFulfilled(value, promise);
                            } else {
                                receiver._promiseRejected(value, promise);
                            }
                        }
                    } else if (isPromise) {
                        if (asyncGuaranteed) promise._setAsyncGuaranteed();
                        if (((bitField & 33554432) !== 0)) {
                            promise._fulfill(value);
                        } else {
                            promise._reject(value);
                        }
                    }
                };

                Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
                    var handler = ctx.handler;
                    var promise = ctx.promise;
                    var receiver = ctx.receiver;
                    var value = ctx.value;
                    if (typeof handler === "function") {
                        if (!(promise instanceof Promise)) {
                            handler.call(receiver, value, promise);
                        } else {
                            this._settlePromiseFromHandler(handler, receiver, value, promise);
                        }
                    } else if (promise instanceof Promise) {
                        promise._reject(value);
                    }
                };

                Promise.prototype._settlePromiseCtx = function(ctx) {
                    this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
                };

                Promise.prototype._settlePromise0 = function(handler, value, bitField) {
                    var promise = this._promise0;
                    var receiver = this._receiverAt(0);
                    this._promise0 = undefined;
                    this._receiver0 = undefined;
                    this._settlePromise(promise, handler, receiver, value);
                };

                Promise.prototype._clearCallbackDataAtIndex = function(index) {
                    var base = index * 4 - 4;
                    this[base + 2] =
                        this[base + 3] =
                            this[base + 0] =
                                this[base + 1] = undefined;
                };

                Promise.prototype._fulfill = function (value) {
                    var bitField = this._bitField;
                    if (((bitField & 117506048) >>> 16)) return;
                    if (value === this) {
                        var err = makeSelfResolutionError();
                        this._attachExtraTrace(err);
                        return this._reject(err);
                    }
                    this._setFulfilled();
                    this._rejectionHandler0 = value;

                    if ((bitField & 65535) > 0) {
                        if (((bitField & 134217728) !== 0)) {
                            this._settlePromises();
                        } else {
                            async.settlePromises(this);
                        }
                    }
                };

                Promise.prototype._reject = function (reason) {
                    var bitField = this._bitField;
                    if (((bitField & 117506048) >>> 16)) return;
                    this._setRejected();
                    this._fulfillmentHandler0 = reason;

                    if (this._isFinal()) {
                        return async.fatalError(reason, util.isNode);
                    }

                    if ((bitField & 65535) > 0) {
                        async.settlePromises(this);
                    } else {
                        this._ensurePossibleRejectionHandled();
                    }
                };

                Promise.prototype._fulfillPromises = function (len, value) {
                    for (var i = 1; i < len; i++) {
                        var handler = this._fulfillmentHandlerAt(i);
                        var promise = this._promiseAt(i);
                        var receiver = this._receiverAt(i);
                        this._clearCallbackDataAtIndex(i);
                        this._settlePromise(promise, handler, receiver, value);
                    }
                };

                Promise.prototype._rejectPromises = function (len, reason) {
                    for (var i = 1; i < len; i++) {
                        var handler = this._rejectionHandlerAt(i);
                        var promise = this._promiseAt(i);
                        var receiver = this._receiverAt(i);
                        this._clearCallbackDataAtIndex(i);
                        this._settlePromise(promise, handler, receiver, reason);
                    }
                };

                Promise.prototype._settlePromises = function () {
                    var bitField = this._bitField;
                    var len = (bitField & 65535);

                    if (len > 0) {
                        if (((bitField & 16842752) !== 0)) {
                            var reason = this._fulfillmentHandler0;
                            this._settlePromise0(this._rejectionHandler0, reason, bitField);
                            this._rejectPromises(len, reason);
                        } else {
                            var value = this._rejectionHandler0;
                            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
                            this._fulfillPromises(len, value);
                        }
                        this._setLength(0);
                    }
                    this._clearCancellationData();
                };

                Promise.prototype._settledValue = function() {
                    var bitField = this._bitField;
                    if (((bitField & 33554432) !== 0)) {
                        return this._rejectionHandler0;
                    } else if (((bitField & 16777216) !== 0)) {
                        return this._fulfillmentHandler0;
                    }
                };

                function deferResolve(v) {this.promise._resolveCallback(v);}
                function deferReject(v) {this.promise._rejectCallback(v, false);}

                Promise.defer = Promise.pending = function() {
                    debug.deprecated("Promise.defer", "new Promise");
                    var promise = new Promise(INTERNAL);
                    return {
                        promise: promise,
                        resolve: deferResolve,
                        reject: deferReject
                    };
                };

                util.notEnumerableProp(Promise,
                    "_makeSelfResolutionError",
                    makeSelfResolutionError);

                _dereq_("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection,
                    debug);
                _dereq_("./bind")(Promise, INTERNAL, tryConvertToPromise, debug);
                _dereq_("./cancel")(Promise, PromiseArray, apiRejection, debug);
                _dereq_("./direct_resolve")(Promise);
                _dereq_("./synchronous_inspection")(Promise);
                _dereq_("./join")(
                    Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain);
                Promise.Promise = Promise;
                Promise.version = "3.5.0";
                _dereq_('./map.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
                _dereq_('./call_get.js')(Promise);
                _dereq_('./using.js')(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
                _dereq_('./timers.js')(Promise, INTERNAL, debug);
                _dereq_('./generators.js')(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
                _dereq_('./nodeify.js')(Promise);
                _dereq_('./promisify.js')(Promise, INTERNAL);
                _dereq_('./props.js')(Promise, PromiseArray, tryConvertToPromise, apiRejection);
                _dereq_('./race.js')(Promise, INTERNAL, tryConvertToPromise, apiRejection);
                _dereq_('./reduce.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
                _dereq_('./settle.js')(Promise, PromiseArray, debug);
                _dereq_('./some.js')(Promise, PromiseArray, apiRejection);
                _dereq_('./filter.js')(Promise, INTERNAL);
                _dereq_('./each.js')(Promise, INTERNAL);
                _dereq_('./any.js')(Promise);

                util.toFastProperties(Promise);
                util.toFastProperties(Promise.prototype);
                function fillTypes(value) {
                    var p = new Promise(INTERNAL);
                    p._fulfillmentHandler0 = value;
                    p._rejectionHandler0 = value;
                    p._promise0 = value;
                    p._receiver0 = value;
                }
                // Complete slack tracking, opt out of field-type tracking and
                // stabilize map
                fillTypes({a: 1});
                fillTypes({b: 2});
                fillTypes({c: 3});
                fillTypes(1);
                fillTypes(function(){});
                fillTypes(undefined);
                fillTypes(false);
                fillTypes(new Promise(INTERNAL));
                debug.setBounds(Async.firstLineError, util.lastLineError);
                return Promise;

            };

        },{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36}],23:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise, INTERNAL, tryConvertToPromise,
                                      apiRejection, Proxyable) {
                var util = _dereq_("./util");
                var isArray = util.isArray;

                function toResolutionValue(val) {
                    switch(val) {
                        case -2: return [];
                        case -3: return {};
                        case -6: return new Map();
                    }
                }

                function PromiseArray(values) {
                    var promise = this._promise = new Promise(INTERNAL);
                    if (values instanceof Promise) {
                        promise._propagateFrom(values, 3);
                    }
                    promise._setOnCancel(this);
                    this._values = values;
                    this._length = 0;
                    this._totalResolved = 0;
                    this._init(undefined, -2);
                }
                util.inherits(PromiseArray, Proxyable);

                PromiseArray.prototype.length = function () {
                    return this._length;
                };

                PromiseArray.prototype.promise = function () {
                    return this._promise;
                };

                PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
                    var values = tryConvertToPromise(this._values, this._promise);
                    if (values instanceof Promise) {
                        values = values._target();
                        var bitField = values._bitField;
                        ;
                        this._values = values;

                        if (((bitField & 50397184) === 0)) {
                            this._promise._setAsyncGuaranteed();
                            return values._then(
                                init,
                                this._reject,
                                undefined,
                                this,
                                resolveValueIfEmpty
                            );
                        } else if (((bitField & 33554432) !== 0)) {
                            values = values._value();
                        } else if (((bitField & 16777216) !== 0)) {
                            return this._reject(values._reason());
                        } else {
                            return this._cancel();
                        }
                    }
                    values = util.asArray(values);
                    if (values === null) {
                        var err = apiRejection(
                            "expecting an array or an iterable object but got " + util.classString(values)).reason();
                        this._promise._rejectCallback(err, false);
                        return;
                    }

                    if (values.length === 0) {
                        if (resolveValueIfEmpty === -5) {
                            this._resolveEmptyArray();
                        }
                        else {
                            this._resolve(toResolutionValue(resolveValueIfEmpty));
                        }
                        return;
                    }
                    this._iterate(values);
                };

                PromiseArray.prototype._iterate = function(values) {
                    var len = this.getActualLength(values.length);
                    this._length = len;
                    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
                    var result = this._promise;
                    var isResolved = false;
                    var bitField = null;
                    for (var i = 0; i < len; ++i) {
                        var maybePromise = tryConvertToPromise(values[i], result);

                        if (maybePromise instanceof Promise) {
                            maybePromise = maybePromise._target();
                            bitField = maybePromise._bitField;
                        } else {
                            bitField = null;
                        }

                        if (isResolved) {
                            if (bitField !== null) {
                                maybePromise.suppressUnhandledRejections();
                            }
                        } else if (bitField !== null) {
                            if (((bitField & 50397184) === 0)) {
                                maybePromise._proxy(this, i);
                                this._values[i] = maybePromise;
                            } else if (((bitField & 33554432) !== 0)) {
                                isResolved = this._promiseFulfilled(maybePromise._value(), i);
                            } else if (((bitField & 16777216) !== 0)) {
                                isResolved = this._promiseRejected(maybePromise._reason(), i);
                            } else {
                                isResolved = this._promiseCancelled(i);
                            }
                        } else {
                            isResolved = this._promiseFulfilled(maybePromise, i);
                        }
                    }
                    if (!isResolved) result._setAsyncGuaranteed();
                };

                PromiseArray.prototype._isResolved = function () {
                    return this._values === null;
                };

                PromiseArray.prototype._resolve = function (value) {
                    this._values = null;
                    this._promise._fulfill(value);
                };

                PromiseArray.prototype._cancel = function() {
                    if (this._isResolved() || !this._promise._isCancellable()) return;
                    this._values = null;
                    this._promise._cancel();
                };

                PromiseArray.prototype._reject = function (reason) {
                    this._values = null;
                    this._promise._rejectCallback(reason, false);
                };

                PromiseArray.prototype._promiseFulfilled = function (value, index) {
                    this._values[index] = value;
                    var totalResolved = ++this._totalResolved;
                    if (totalResolved >= this._length) {
                        this._resolve(this._values);
                        return true;
                    }
                    return false;
                };

                PromiseArray.prototype._promiseCancelled = function() {
                    this._cancel();
                    return true;
                };

                PromiseArray.prototype._promiseRejected = function (reason) {
                    this._totalResolved++;
                    this._reject(reason);
                    return true;
                };

                PromiseArray.prototype._resultCancelled = function() {
                    if (this._isResolved()) return;
                    var values = this._values;
                    this._cancel();
                    if (values instanceof Promise) {
                        values.cancel();
                    } else {
                        for (var i = 0; i < values.length; ++i) {
                            if (values[i] instanceof Promise) {
                                values[i].cancel();
                            }
                        }
                    }
                };

                PromiseArray.prototype.shouldCopyValues = function () {
                    return true;
                };

                PromiseArray.prototype.getActualLength = function (len) {
                    return len;
                };

                return PromiseArray;
            };

        },{"./util":36}],24:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise, INTERNAL) {
                var THIS = {};
                var util = _dereq_("./util");
                var nodebackForPromise = _dereq_("./nodeback");
                var withAppended = util.withAppended;
                var maybeWrapAsError = util.maybeWrapAsError;
                var canEvaluate = util.canEvaluate;
                var TypeError = _dereq_("./errors").TypeError;
                var defaultSuffix = "Async";
                var defaultPromisified = {__isPromisified__: true};
                var noCopyProps = [
                    "arity",    "length",
                    "name",
                    "arguments",
                    "caller",
                    "callee",
                    "prototype",
                    "__isPromisified__"
                ];
                var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

                var defaultFilter = function(name) {
                    return util.isIdentifier(name) &&
                        name.charAt(0) !== "_" &&
                        name !== "constructor";
                };

                function propsFilter(key) {
                    return !noCopyPropsPattern.test(key);
                }

                function isPromisified(fn) {
                    try {
                        return fn.__isPromisified__ === true;
                    }
                    catch (e) {
                        return false;
                    }
                }

                function hasPromisified(obj, key, suffix) {
                    var val = util.getDataPropertyOrDefault(obj, key + suffix,
                        defaultPromisified);
                    return val ? isPromisified(val) : false;
                }
                function checkValid(ret, suffix, suffixRegexp) {
                    for (var i = 0; i < ret.length; i += 2) {
                        var key = ret[i];
                        if (suffixRegexp.test(key)) {
                            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
                            for (var j = 0; j < ret.length; j += 2) {
                                if (ret[j] === keyWithoutAsyncSuffix) {
                                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
                                        .replace("%s", suffix));
                                }
                            }
                        }
                    }
                }

                function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
                    var keys = util.inheritedDataKeys(obj);
                    var ret = [];
                    for (var i = 0; i < keys.length; ++i) {
                        var key = keys[i];
                        var value = obj[key];
                        var passesDefaultFilter = filter === defaultFilter
                            ? true : defaultFilter(key, value, obj);
                        if (typeof value === "function" &&
                            !isPromisified(value) &&
                            !hasPromisified(obj, key, suffix) &&
                            filter(key, value, obj, passesDefaultFilter)) {
                            ret.push(key, value);
                        }
                    }
                    checkValid(ret, suffix, suffixRegexp);
                    return ret;
                }

                var escapeIdentRegex = function(str) {
                    return str.replace(/([$])/, "\\$");
                };

                var makeNodePromisifiedEval;
                if (!true) {
                    var switchCaseArgumentOrder = function(likelyArgumentCount) {
                        var ret = [likelyArgumentCount];
                        var min = Math.max(0, likelyArgumentCount - 1 - 3);
                        for(var i = likelyArgumentCount - 1; i >= min; --i) {
                            ret.push(i);
                        }
                        for(var i = likelyArgumentCount + 1; i <= 3; ++i) {
                            ret.push(i);
                        }
                        return ret;
                    };

                    var argumentSequence = function(argumentCount) {
                        return util.filledRange(argumentCount, "_arg", "");
                    };

                    var parameterDeclaration = function(parameterCount) {
                        return util.filledRange(
                            Math.max(parameterCount, 3), "_arg", "");
                    };

                    var parameterCount = function(fn) {
                        if (typeof fn.length === "number") {
                            return Math.max(Math.min(fn.length, 1023 + 1), 0);
                        }
                        return 0;
                    };

                    makeNodePromisifiedEval =
                        function(callback, receiver, originalName, fn, _, multiArgs) {
                            var newParameterCount = Math.max(0, parameterCount(fn) - 1);
                            var argumentOrder = switchCaseArgumentOrder(newParameterCount);
                            var shouldProxyThis = typeof callback === "string" || receiver === THIS;

                            function generateCallForArgumentCount(count) {
                                var args = argumentSequence(count).join(", ");
                                var comma = count > 0 ? ", " : "";
                                var ret;
                                if (shouldProxyThis) {
                                    ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
                                } else {
                                    ret = receiver === undefined
                                        ? "ret = callback({{args}}, nodeback); break;\n"
                                        : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
                                }
                                return ret.replace("{{args}}", args).replace(", ", comma);
                            }

                            function generateArgumentSwitchCase() {
                                var ret = "";
                                for (var i = 0; i < argumentOrder.length; ++i) {
                                    ret += "case " + argumentOrder[i] +":" +
                                        generateCallForArgumentCount(argumentOrder[i]);
                                }

                                ret += "                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = nodeback;                                              \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]", (shouldProxyThis
                                    ? "ret = callback.apply(this, args);\n"
                                    : "ret = callback.apply(receiver, args);\n"));
                                return ret;
                            }

                            var getFunctionCode = typeof callback === "string"
                                ? ("this != null ? this['"+callback+"'] : fn")
                                : "fn";
                            var body = "'use strict';                                                \n\
        var ret = function (Parameters) {                                    \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._captureStackTrace();                                    \n\
            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
            var ret;                                                         \n\
            var callback = tryCatch([GetFunctionCode]);                      \n\
            switch(len) {                                                    \n\
                [CodeForSwitchCase]                                          \n\
            }                                                                \n\
            if (ret === errorObj) {                                          \n\
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
            }                                                                \n\
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
            return promise;                                                  \n\
        };                                                                   \n\
        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
        return ret;                                                          \n\
    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase())
                                .replace("[GetFunctionCode]", getFunctionCode);
                            body = body.replace("Parameters", parameterDeclaration(newParameterCount));
                            return new Function("Promise",
                                "fn",
                                "receiver",
                                "withAppended",
                                "maybeWrapAsError",
                                "nodebackForPromise",
                                "tryCatch",
                                "errorObj",
                                "notEnumerableProp",
                                "INTERNAL",
                                body)(
                                Promise,
                                fn,
                                receiver,
                                withAppended,
                                maybeWrapAsError,
                                nodebackForPromise,
                                util.tryCatch,
                                util.errorObj,
                                util.notEnumerableProp,
                                INTERNAL);
                        };
                }

                function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
                    var defaultThis = (function() {return this;})();
                    var method = callback;
                    if (typeof method === "string") {
                        callback = fn;
                    }
                    function promisified() {
                        var _receiver = receiver;
                        if (receiver === THIS) _receiver = this;
                        var promise = new Promise(INTERNAL);
                        promise._captureStackTrace();
                        var cb = typeof method === "string" && this !== defaultThis
                            ? this[method] : callback;
                        var fn = nodebackForPromise(promise, multiArgs);
                        try {
                            cb.apply(_receiver, withAppended(arguments, fn));
                        } catch(e) {
                            promise._rejectCallback(maybeWrapAsError(e), true, true);
                        }
                        if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
                        return promise;
                    }
                    util.notEnumerableProp(promisified, "__isPromisified__", true);
                    return promisified;
                }

                var makeNodePromisified = canEvaluate
                    ? makeNodePromisifiedEval
                    : makeNodePromisifiedClosure;

                function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
                    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
                    var methods =
                        promisifiableMethods(obj, suffix, suffixRegexp, filter);

                    for (var i = 0, len = methods.length; i < len; i+= 2) {
                        var key = methods[i];
                        var fn = methods[i+1];
                        var promisifiedKey = key + suffix;
                        if (promisifier === makeNodePromisified) {
                            obj[promisifiedKey] =
                                makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
                        } else {
                            var promisified = promisifier(fn, function() {
                                return makeNodePromisified(key, THIS, key,
                                    fn, suffix, multiArgs);
                            });
                            util.notEnumerableProp(promisified, "__isPromisified__", true);
                            obj[promisifiedKey] = promisified;
                        }
                    }
                    util.toFastProperties(obj);
                    return obj;
                }

                function promisify(callback, receiver, multiArgs) {
                    return makeNodePromisified(callback, receiver, undefined,
                        callback, null, multiArgs);
                }

                Promise.promisify = function (fn, options) {
                    if (typeof fn !== "function") {
                        throw new TypeError("expecting a function but got " + util.classString(fn));
                    }
                    if (isPromisified(fn)) {
                        return fn;
                    }
                    options = Object(options);
                    var receiver = options.context === undefined ? THIS : options.context;
                    var multiArgs = !!options.multiArgs;
                    var ret = promisify(fn, receiver, multiArgs);
                    util.copyDescriptors(fn, ret, propsFilter);
                    return ret;
                };

                Promise.promisifyAll = function (target, options) {
                    if (typeof target !== "function" && typeof target !== "object") {
                        throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
                    }
                    options = Object(options);
                    var multiArgs = !!options.multiArgs;
                    var suffix = options.suffix;
                    if (typeof suffix !== "string") suffix = defaultSuffix;
                    var filter = options.filter;
                    if (typeof filter !== "function") filter = defaultFilter;
                    var promisifier = options.promisifier;
                    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

                    if (!util.isIdentifier(suffix)) {
                        throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
                    }

                    var keys = util.inheritedDataKeys(target);
                    for (var i = 0; i < keys.length; ++i) {
                        var value = target[keys[i]];
                        if (keys[i] !== "constructor" &&
                            util.isClass(value)) {
                            promisifyAll(value.prototype, suffix, filter, promisifier,
                                multiArgs);
                            promisifyAll(value, suffix, filter, promisifier, multiArgs);
                        }
                    }

                    return promisifyAll(target, suffix, filter, promisifier, multiArgs);
                };
            };


        },{"./errors":12,"./nodeback":20,"./util":36}],25:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(
                Promise, PromiseArray, tryConvertToPromise, apiRejection) {
                var util = _dereq_("./util");
                var isObject = util.isObject;
                var es5 = _dereq_("./es5");
                var Es6Map;
                if (typeof Map === "function") Es6Map = Map;

                var mapToEntries = (function() {
                    var index = 0;
                    var size = 0;

                    function extractEntry(value, key) {
                        this[index] = value;
                        this[index + size] = key;
                        index++;
                    }

                    return function mapToEntries(map) {
                        size = map.size;
                        index = 0;
                        var ret = new Array(map.size * 2);
                        map.forEach(extractEntry, ret);
                        return ret;
                    };
                })();

                var entriesToMap = function(entries) {
                    var ret = new Es6Map();
                    var length = entries.length / 2 | 0;
                    for (var i = 0; i < length; ++i) {
                        var key = entries[length + i];
                        var value = entries[i];
                        ret.set(key, value);
                    }
                    return ret;
                };

                function PropertiesPromiseArray(obj) {
                    var isMap = false;
                    var entries;
                    if (Es6Map !== undefined && obj instanceof Es6Map) {
                        entries = mapToEntries(obj);
                        isMap = true;
                    } else {
                        var keys = es5.keys(obj);
                        var len = keys.length;
                        entries = new Array(len * 2);
                        for (var i = 0; i < len; ++i) {
                            var key = keys[i];
                            entries[i] = obj[key];
                            entries[i + len] = key;
                        }
                    }
                    this.constructor$(entries);
                    this._isMap = isMap;
                    this._init$(undefined, isMap ? -6 : -3);
                }
                util.inherits(PropertiesPromiseArray, PromiseArray);

                PropertiesPromiseArray.prototype._init = function () {};

                PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
                    this._values[index] = value;
                    var totalResolved = ++this._totalResolved;
                    if (totalResolved >= this._length) {
                        var val;
                        if (this._isMap) {
                            val = entriesToMap(this._values);
                        } else {
                            val = {};
                            var keyOffset = this.length();
                            for (var i = 0, len = this.length(); i < len; ++i) {
                                val[this._values[i + keyOffset]] = this._values[i];
                            }
                        }
                        this._resolve(val);
                        return true;
                    }
                    return false;
                };

                PropertiesPromiseArray.prototype.shouldCopyValues = function () {
                    return false;
                };

                PropertiesPromiseArray.prototype.getActualLength = function (len) {
                    return len >> 1;
                };

                function props(promises) {
                    var ret;
                    var castValue = tryConvertToPromise(promises);

                    if (!isObject(castValue)) {
                        return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
                    } else if (castValue instanceof Promise) {
                        ret = castValue._then(
                            Promise.props, undefined, undefined, undefined, undefined);
                    } else {
                        ret = new PropertiesPromiseArray(castValue).promise();
                    }

                    if (castValue instanceof Promise) {
                        ret._propagateFrom(castValue, 2);
                    }
                    return ret;
                }

                Promise.prototype.props = function () {
                    return props(this);
                };

                Promise.props = function (promises) {
                    return props(promises);
                };
            };

        },{"./es5":13,"./util":36}],26:[function(_dereq_,module,exports){
            "use strict";
            function arrayMove(src, srcIndex, dst, dstIndex, len) {
                for (var j = 0; j < len; ++j) {
                    dst[j + dstIndex] = src[j + srcIndex];
                    src[j + srcIndex] = void 0;
                }
            }

            function Queue(capacity) {
                this._capacity = capacity;
                this._length = 0;
                this._front = 0;
            }

            Queue.prototype._willBeOverCapacity = function (size) {
                return this._capacity < size;
            };

            Queue.prototype._pushOne = function (arg) {
                var length = this.length();
                this._checkCapacity(length + 1);
                var i = (this._front + length) & (this._capacity - 1);
                this[i] = arg;
                this._length = length + 1;
            };

            Queue.prototype.push = function (fn, receiver, arg) {
                var length = this.length() + 3;
                if (this._willBeOverCapacity(length)) {
                    this._pushOne(fn);
                    this._pushOne(receiver);
                    this._pushOne(arg);
                    return;
                }
                var j = this._front + length - 3;
                this._checkCapacity(length);
                var wrapMask = this._capacity - 1;
                this[(j + 0) & wrapMask] = fn;
                this[(j + 1) & wrapMask] = receiver;
                this[(j + 2) & wrapMask] = arg;
                this._length = length;
            };

            Queue.prototype.shift = function () {
                var front = this._front,
                    ret = this[front];

                this[front] = undefined;
                this._front = (front + 1) & (this._capacity - 1);
                this._length--;
                return ret;
            };

            Queue.prototype.length = function () {
                return this._length;
            };

            Queue.prototype._checkCapacity = function (size) {
                if (this._capacity < size) {
                    this._resizeTo(this._capacity << 1);
                }
            };

            Queue.prototype._resizeTo = function (capacity) {
                var oldCapacity = this._capacity;
                this._capacity = capacity;
                var front = this._front;
                var length = this._length;
                var moveItemsCount = (front + length) & (oldCapacity - 1);
                arrayMove(this, 0, this, oldCapacity, moveItemsCount);
            };

            module.exports = Queue;

        },{}],27:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(
                Promise, INTERNAL, tryConvertToPromise, apiRejection) {
                var util = _dereq_("./util");

                var raceLater = function (promise) {
                    return promise.then(function(array) {
                        return race(array, promise);
                    });
                };

                function race(promises, parent) {
                    var maybePromise = tryConvertToPromise(promises);

                    if (maybePromise instanceof Promise) {
                        return raceLater(maybePromise);
                    } else {
                        promises = util.asArray(promises);
                        if (promises === null)
                            return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
                    }

                    var ret = new Promise(INTERNAL);
                    if (parent !== undefined) {
                        ret._propagateFrom(parent, 3);
                    }
                    var fulfill = ret._fulfill;
                    var reject = ret._reject;
                    for (var i = 0, len = promises.length; i < len; ++i) {
                        var val = promises[i];

                        if (val === undefined && !(i in promises)) {
                            continue;
                        }

                        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
                    }
                    return ret;
                }

                Promise.race = function (promises) {
                    return race(promises, undefined);
                };

                Promise.prototype.race = function () {
                    return race(this, undefined);
                };

            };

        },{"./util":36}],28:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise,
                                      PromiseArray,
                                      apiRejection,
                                      tryConvertToPromise,
                                      INTERNAL,
                                      debug) {
                var getDomain = Promise._getDomain;
                var util = _dereq_("./util");
                var tryCatch = util.tryCatch;

                function ReductionPromiseArray(promises, fn, initialValue, _each) {
                    this.constructor$(promises);
                    var domain = getDomain();
                    this._fn = domain === null ? fn : util.domainBind(domain, fn);
                    if (initialValue !== undefined) {
                        initialValue = Promise.resolve(initialValue);
                        initialValue._attachCancellationCallback(this);
                    }
                    this._initialValue = initialValue;
                    this._currentCancellable = null;
                    if(_each === INTERNAL) {
                        this._eachValues = Array(this._length);
                    } else if (_each === 0) {
                        this._eachValues = null;
                    } else {
                        this._eachValues = undefined;
                    }
                    this._promise._captureStackTrace();
                    this._init$(undefined, -5);
                }
                util.inherits(ReductionPromiseArray, PromiseArray);

                ReductionPromiseArray.prototype._gotAccum = function(accum) {
                    if (this._eachValues !== undefined &&
                        this._eachValues !== null &&
                        accum !== INTERNAL) {
                        this._eachValues.push(accum);
                    }
                };

                ReductionPromiseArray.prototype._eachComplete = function(value) {
                    if (this._eachValues !== null) {
                        this._eachValues.push(value);
                    }
                    return this._eachValues;
                };

                ReductionPromiseArray.prototype._init = function() {};

                ReductionPromiseArray.prototype._resolveEmptyArray = function() {
                    this._resolve(this._eachValues !== undefined ? this._eachValues
                        : this._initialValue);
                };

                ReductionPromiseArray.prototype.shouldCopyValues = function () {
                    return false;
                };

                ReductionPromiseArray.prototype._resolve = function(value) {
                    this._promise._resolveCallback(value);
                    this._values = null;
                };

                ReductionPromiseArray.prototype._resultCancelled = function(sender) {
                    if (sender === this._initialValue) return this._cancel();
                    if (this._isResolved()) return;
                    this._resultCancelled$();
                    if (this._currentCancellable instanceof Promise) {
                        this._currentCancellable.cancel();
                    }
                    if (this._initialValue instanceof Promise) {
                        this._initialValue.cancel();
                    }
                };

                ReductionPromiseArray.prototype._iterate = function (values) {
                    this._values = values;
                    var value;
                    var i;
                    var length = values.length;
                    if (this._initialValue !== undefined) {
                        value = this._initialValue;
                        i = 0;
                    } else {
                        value = Promise.resolve(values[0]);
                        i = 1;
                    }

                    this._currentCancellable = value;

                    if (!value.isRejected()) {
                        for (; i < length; ++i) {
                            var ctx = {
                                accum: null,
                                value: values[i],
                                index: i,
                                length: length,
                                array: this
                            };
                            value = value._then(gotAccum, undefined, undefined, ctx, undefined);
                        }
                    }

                    if (this._eachValues !== undefined) {
                        value = value
                            ._then(this._eachComplete, undefined, undefined, this, undefined);
                    }
                    value._then(completed, completed, undefined, value, this);
                };

                Promise.prototype.reduce = function (fn, initialValue) {
                    return reduce(this, fn, initialValue, null);
                };

                Promise.reduce = function (promises, fn, initialValue, _each) {
                    return reduce(promises, fn, initialValue, _each);
                };

                function completed(valueOrReason, array) {
                    if (this.isFulfilled()) {
                        array._resolve(valueOrReason);
                    } else {
                        array._reject(valueOrReason);
                    }
                }

                function reduce(promises, fn, initialValue, _each) {
                    if (typeof fn !== "function") {
                        return apiRejection("expecting a function but got " + util.classString(fn));
                    }
                    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
                    return array.promise();
                }

                function gotAccum(accum) {
                    this.accum = accum;
                    this.array._gotAccum(accum);
                    var value = tryConvertToPromise(this.value, this.array._promise);
                    if (value instanceof Promise) {
                        this.array._currentCancellable = value;
                        return value._then(gotValue, undefined, undefined, this, undefined);
                    } else {
                        return gotValue.call(this, value);
                    }
                }

                function gotValue(value) {
                    var array = this.array;
                    var promise = array._promise;
                    var fn = tryCatch(array._fn);
                    promise._pushContext();
                    var ret;
                    if (array._eachValues !== undefined) {
                        ret = fn.call(promise._boundValue(), value, this.index, this.length);
                    } else {
                        ret = fn.call(promise._boundValue(),
                            this.accum, value, this.index, this.length);
                    }
                    if (ret instanceof Promise) {
                        array._currentCancellable = ret;
                    }
                    var promiseCreated = promise._popContext();
                    debug.checkForgottenReturns(
                        ret,
                        promiseCreated,
                        array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
                        promise
                    );
                    return ret;
                }
            };

        },{"./util":36}],29:[function(_dereq_,module,exports){
            "use strict";
            var util = _dereq_("./util");
            var schedule;
            var noAsyncScheduler = function() {
                throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
            };
            var NativePromise = util.getNativePromise();
            if (util.isNode && typeof MutationObserver === "undefined") {
                var GlobalSetImmediate = global.setImmediate;
                var ProcessNextTick = process.nextTick;
                schedule = util.isRecentNode
                    ? function(fn) { GlobalSetImmediate.call(global, fn); }
                    : function(fn) { ProcessNextTick.call(process, fn); };
            } else if (typeof NativePromise === "function" &&
                typeof NativePromise.resolve === "function") {
                var nativePromise = NativePromise.resolve();
                schedule = function(fn) {
                    nativePromise.then(fn);
                };
            } else if ((typeof MutationObserver !== "undefined") &&
                !(typeof window !== "undefined" &&
                    window.navigator &&
                    (window.navigator.standalone || window.cordova))) {
                schedule = (function() {
                    var div = document.createElement("div");
                    var opts = {attributes: true};
                    var toggleScheduled = false;
                    var div2 = document.createElement("div");
                    var o2 = new MutationObserver(function() {
                        div.classList.toggle("foo");
                        toggleScheduled = false;
                    });
                    o2.observe(div2, opts);

                    var scheduleToggle = function() {
                        if (toggleScheduled) return;
                        toggleScheduled = true;
                        div2.classList.toggle("foo");
                    };

                    return function schedule(fn) {
                        var o = new MutationObserver(function() {
                            o.disconnect();
                            fn();
                        });
                        o.observe(div, opts);
                        scheduleToggle();
                    };
                })();
            } else if (typeof setImmediate !== "undefined") {
                schedule = function (fn) {
                    setImmediate(fn);
                };
            } else if (typeof timers.setTimeout !== "undefined") {
                schedule = function (fn) {
                    timers.setTimeout(fn, 0);
                };
            } else {
                schedule = noAsyncScheduler;
            }
            module.exports = schedule;

        },{"./util":36}],30:[function(_dereq_,module,exports){
            "use strict";
            module.exports =
                function(Promise, PromiseArray, debug) {
                    var PromiseInspection = Promise.PromiseInspection;
                    var util = _dereq_("./util");

                    function SettledPromiseArray(values) {
                        this.constructor$(values);
                    }
                    util.inherits(SettledPromiseArray, PromiseArray);

                    SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
                        this._values[index] = inspection;
                        var totalResolved = ++this._totalResolved;
                        if (totalResolved >= this._length) {
                            this._resolve(this._values);
                            return true;
                        }
                        return false;
                    };

                    SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
                        var ret = new PromiseInspection();
                        ret._bitField = 33554432;
                        ret._settledValueField = value;
                        return this._promiseResolved(index, ret);
                    };
                    SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
                        var ret = new PromiseInspection();
                        ret._bitField = 16777216;
                        ret._settledValueField = reason;
                        return this._promiseResolved(index, ret);
                    };

                    Promise.settle = function (promises) {
                        debug.deprecated(".settle()", ".reflect()");
                        return new SettledPromiseArray(promises).promise();
                    };

                    Promise.prototype.settle = function () {
                        return Promise.settle(this);
                    };
                };

        },{"./util":36}],31:[function(_dereq_,module,exports){
            "use strict";
            module.exports =
                function(Promise, PromiseArray, apiRejection) {
                    var util = _dereq_("./util");
                    var RangeError = _dereq_("./errors").RangeError;
                    var AggregateError = _dereq_("./errors").AggregateError;
                    var isArray = util.isArray;
                    var CANCELLATION = {};


                    function SomePromiseArray(values) {
                        this.constructor$(values);
                        this._howMany = 0;
                        this._unwrap = false;
                        this._initialized = false;
                    }
                    util.inherits(SomePromiseArray, PromiseArray);

                    SomePromiseArray.prototype._init = function () {
                        if (!this._initialized) {
                            return;
                        }
                        if (this._howMany === 0) {
                            this._resolve([]);
                            return;
                        }
                        this._init$(undefined, -5);
                        var isArrayResolved = isArray(this._values);
                        if (!this._isResolved() &&
                            isArrayResolved &&
                            this._howMany > this._canPossiblyFulfill()) {
                            this._reject(this._getRangeError(this.length()));
                        }
                    };

                    SomePromiseArray.prototype.init = function () {
                        this._initialized = true;
                        this._init();
                    };

                    SomePromiseArray.prototype.setUnwrap = function () {
                        this._unwrap = true;
                    };

                    SomePromiseArray.prototype.howMany = function () {
                        return this._howMany;
                    };

                    SomePromiseArray.prototype.setHowMany = function (count) {
                        this._howMany = count;
                    };

                    SomePromiseArray.prototype._promiseFulfilled = function (value) {
                        this._addFulfilled(value);
                        if (this._fulfilled() === this.howMany()) {
                            this._values.length = this.howMany();
                            if (this.howMany() === 1 && this._unwrap) {
                                this._resolve(this._values[0]);
                            } else {
                                this._resolve(this._values);
                            }
                            return true;
                        }
                        return false;

                    };
                    SomePromiseArray.prototype._promiseRejected = function (reason) {
                        this._addRejected(reason);
                        return this._checkOutcome();
                    };

                    SomePromiseArray.prototype._promiseCancelled = function () {
                        if (this._values instanceof Promise || this._values == null) {
                            return this._cancel();
                        }
                        this._addRejected(CANCELLATION);
                        return this._checkOutcome();
                    };

                    SomePromiseArray.prototype._checkOutcome = function() {
                        if (this.howMany() > this._canPossiblyFulfill()) {
                            var e = new AggregateError();
                            for (var i = this.length(); i < this._values.length; ++i) {
                                if (this._values[i] !== CANCELLATION) {
                                    e.push(this._values[i]);
                                }
                            }
                            if (e.length > 0) {
                                this._reject(e);
                            } else {
                                this._cancel();
                            }
                            return true;
                        }
                        return false;
                    };

                    SomePromiseArray.prototype._fulfilled = function () {
                        return this._totalResolved;
                    };

                    SomePromiseArray.prototype._rejected = function () {
                        return this._values.length - this.length();
                    };

                    SomePromiseArray.prototype._addRejected = function (reason) {
                        this._values.push(reason);
                    };

                    SomePromiseArray.prototype._addFulfilled = function (value) {
                        this._values[this._totalResolved++] = value;
                    };

                    SomePromiseArray.prototype._canPossiblyFulfill = function () {
                        return this.length() - this._rejected();
                    };

                    SomePromiseArray.prototype._getRangeError = function (count) {
                        var message = "Input array must contain at least " +
                            this._howMany + " items but contains only " + count + " items";
                        return new RangeError(message);
                    };

                    SomePromiseArray.prototype._resolveEmptyArray = function () {
                        this._reject(this._getRangeError(0));
                    };

                    function some(promises, howMany) {
                        if ((howMany | 0) !== howMany || howMany < 0) {
                            return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
                        }
                        var ret = new SomePromiseArray(promises);
                        var promise = ret.promise();
                        ret.setHowMany(howMany);
                        ret.init();
                        return promise;
                    }

                    Promise.some = function (promises, howMany) {
                        return some(promises, howMany);
                    };

                    Promise.prototype.some = function (howMany) {
                        return some(this, howMany);
                    };

                    Promise._SomePromiseArray = SomePromiseArray;
                };

        },{"./errors":12,"./util":36}],32:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise) {
                function PromiseInspection(promise) {
                    if (promise !== undefined) {
                        promise = promise._target();
                        this._bitField = promise._bitField;
                        this._settledValueField = promise._isFateSealed()
                            ? promise._settledValue() : undefined;
                    }
                    else {
                        this._bitField = 0;
                        this._settledValueField = undefined;
                    }
                }

                PromiseInspection.prototype._settledValue = function() {
                    return this._settledValueField;
                };

                var value = PromiseInspection.prototype.value = function () {
                    if (!this.isFulfilled()) {
                        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
                    }
                    return this._settledValue();
                };

                var reason = PromiseInspection.prototype.error =
                    PromiseInspection.prototype.reason = function () {
                        if (!this.isRejected()) {
                            throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
                        }
                        return this._settledValue();
                    };

                var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
                    return (this._bitField & 33554432) !== 0;
                };

                var isRejected = PromiseInspection.prototype.isRejected = function () {
                    return (this._bitField & 16777216) !== 0;
                };

                var isPending = PromiseInspection.prototype.isPending = function () {
                    return (this._bitField & 50397184) === 0;
                };

                var isResolved = PromiseInspection.prototype.isResolved = function () {
                    return (this._bitField & 50331648) !== 0;
                };

                PromiseInspection.prototype.isCancelled = function() {
                    return (this._bitField & 8454144) !== 0;
                };

                Promise.prototype.__isCancelled = function() {
                    return (this._bitField & 65536) === 65536;
                };

                Promise.prototype._isCancelled = function() {
                    return this._target().__isCancelled();
                };

                Promise.prototype.isCancelled = function() {
                    return (this._target()._bitField & 8454144) !== 0;
                };

                Promise.prototype.isPending = function() {
                    return isPending.call(this._target());
                };

                Promise.prototype.isRejected = function() {
                    return isRejected.call(this._target());
                };

                Promise.prototype.isFulfilled = function() {
                    return isFulfilled.call(this._target());
                };

                Promise.prototype.isResolved = function() {
                    return isResolved.call(this._target());
                };

                Promise.prototype.value = function() {
                    return value.call(this._target());
                };

                Promise.prototype.reason = function() {
                    var target = this._target();
                    target._unsetRejectionIsUnhandled();
                    return reason.call(target);
                };

                Promise.prototype._value = function() {
                    return this._settledValue();
                };

                Promise.prototype._reason = function() {
                    this._unsetRejectionIsUnhandled();
                    return this._settledValue();
                };

                Promise.PromiseInspection = PromiseInspection;
            };

        },{}],33:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise, INTERNAL) {
                var util = _dereq_("./util");
                var errorObj = util.errorObj;
                var isObject = util.isObject;

                function tryConvertToPromise(obj, context) {
                    if (isObject(obj)) {
                        if (obj instanceof Promise) return obj;
                        var then = getThen(obj);
                        if (then === errorObj) {
                            if (context) context._pushContext();
                            var ret = Promise.reject(then.e);
                            if (context) context._popContext();
                            return ret;
                        } else if (typeof then === "function") {
                            if (isAnyBluebirdPromise(obj)) {
                                var ret = new Promise(INTERNAL);
                                obj._then(
                                    ret._fulfill,
                                    ret._reject,
                                    undefined,
                                    ret,
                                    null
                                );
                                return ret;
                            }
                            return doThenable(obj, then, context);
                        }
                    }
                    return obj;
                }

                function doGetThen(obj) {
                    return obj.then;
                }

                function getThen(obj) {
                    try {
                        return doGetThen(obj);
                    } catch (e) {
                        errorObj.e = e;
                        return errorObj;
                    }
                }

                var hasProp = {}.hasOwnProperty;
                function isAnyBluebirdPromise(obj) {
                    try {
                        return hasProp.call(obj, "_promise0");
                    } catch (e) {
                        return false;
                    }
                }

                function doThenable(x, then, context) {
                    var promise = new Promise(INTERNAL);
                    var ret = promise;
                    if (context) context._pushContext();
                    promise._captureStackTrace();
                    if (context) context._popContext();
                    var synchronous = true;
                    var result = util.tryCatch(then).call(x, resolve, reject);
                    synchronous = false;

                    if (promise && result === errorObj) {
                        promise._rejectCallback(result.e, true, true);
                        promise = null;
                    }

                    function resolve(value) {
                        if (!promise) return;
                        promise._resolveCallback(value);
                        promise = null;
                    }

                    function reject(reason) {
                        if (!promise) return;
                        promise._rejectCallback(reason, synchronous, true);
                        promise = null;
                    }
                    return ret;
                }

                return tryConvertToPromise;
            };

        },{"./util":36}],34:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function(Promise, INTERNAL, debug) {
                var util = _dereq_("./util");
                var TimeoutError = Promise.TimeoutError;

                function HandleWrapper(handle)  {
                    this.handle = handle;
                }

                HandleWrapper.prototype._resultCancelled = function() {
                    timers.clearTimeout(this.handle);
                };

                var afterValue = function(value) { return delay(+this).thenReturn(value); };
                var delay = Promise.delay = function (ms, value) {
                    var ret;
                    var handle;
                    if (value !== undefined) {
                        ret = Promise.resolve(value)
                            ._then(afterValue, null, null, ms, undefined);
                        if (debug.cancellation() && value instanceof Promise) {
                            ret._setOnCancel(value);
                        }
                    } else {
                        ret = new Promise(INTERNAL);
                        handle = timers.setTimeout(function() { ret._fulfill(); }, +ms);
                        if (debug.cancellation()) {
                            ret._setOnCancel(new HandleWrapper(handle));
                        }
                        ret._captureStackTrace();
                    }
                    ret._setAsyncGuaranteed();
                    return ret;
                };

                Promise.prototype.delay = function (ms) {
                    return delay(ms, this);
                };

                var afterTimeout = function (promise, message, parent) {
                    var err;
                    if (typeof message !== "string") {
                        if (message instanceof Error) {
                            err = message;
                        } else {
                            err = new TimeoutError("operation timed out");
                        }
                    } else {
                        err = new TimeoutError(message);
                    }
                    util.markAsOriginatingFromRejection(err);
                    promise._attachExtraTrace(err);
                    promise._reject(err);

                    if (parent != null) {
                        parent.cancel();
                    }
                };

                function successClear(value) {
                    timers.clearTimeout(this.handle);
                    return value;
                }

                function failureClear(reason) {
                    timers.clearTimeout(this.handle);
                    throw reason;
                }

                Promise.prototype.timeout = function (ms, message) {
                    ms = +ms;
                    var ret, parent;

                    var handleWrapper = new HandleWrapper(timers.setTimeout(function timeoutTimeout() {
                        if (ret.isPending()) {
                            afterTimeout(ret, message, parent);
                        }
                    }, ms));

                    if (debug.cancellation()) {
                        parent = this.then();
                        ret = parent._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
                        ret._setOnCancel(handleWrapper);
                    } else {
                        ret = this._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
                    }

                    return ret;
                };

            };

        },{"./util":36}],35:[function(_dereq_,module,exports){
            "use strict";
            module.exports = function (Promise, apiRejection, tryConvertToPromise,
                                       createContext, INTERNAL, debug) {
                var util = _dereq_("./util");
                var TypeError = _dereq_("./errors").TypeError;
                var inherits = _dereq_("./util").inherits;
                var errorObj = util.errorObj;
                var tryCatch = util.tryCatch;
                var NULL = {};

                function thrower(e) {
                    timers.setTimeout(function(){throw e;}, 0);
                }

                function castPreservingDisposable(thenable) {
                    var maybePromise = tryConvertToPromise(thenable);
                    if (maybePromise !== thenable &&
                        typeof thenable._isDisposable === "function" &&
                        typeof thenable._getDisposer === "function" &&
                        thenable._isDisposable()) {
                        maybePromise._setDisposable(thenable._getDisposer());
                    }
                    return maybePromise;
                }
                function dispose(resources, inspection) {
                    var i = 0;
                    var len = resources.length;
                    var ret = new Promise(INTERNAL);
                    function iterator() {
                        if (i >= len) return ret._fulfill();
                        var maybePromise = castPreservingDisposable(resources[i++]);
                        if (maybePromise instanceof Promise &&
                            maybePromise._isDisposable()) {
                            try {
                                maybePromise = tryConvertToPromise(
                                    maybePromise._getDisposer().tryDispose(inspection),
                                    resources.promise);
                            } catch (e) {
                                return thrower(e);
                            }
                            if (maybePromise instanceof Promise) {
                                return maybePromise._then(iterator, thrower,
                                    null, null, null);
                            }
                        }
                        iterator();
                    }
                    iterator();
                    return ret;
                }

                function Disposer(data, promise, context) {
                    this._data = data;
                    this._promise = promise;
                    this._context = context;
                }

                Disposer.prototype.data = function () {
                    return this._data;
                };

                Disposer.prototype.promise = function () {
                    return this._promise;
                };

                Disposer.prototype.resource = function () {
                    if (this.promise().isFulfilled()) {
                        return this.promise().value();
                    }
                    return NULL;
                };

                Disposer.prototype.tryDispose = function(inspection) {
                    var resource = this.resource();
                    var context = this._context;
                    if (context !== undefined) context._pushContext();
                    var ret = resource !== NULL
                        ? this.doDispose(resource, inspection) : null;
                    if (context !== undefined) context._popContext();
                    this._promise._unsetDisposable();
                    this._data = null;
                    return ret;
                };

                Disposer.isDisposer = function (d) {
                    return (d != null &&
                        typeof d.resource === "function" &&
                        typeof d.tryDispose === "function");
                };

                function FunctionDisposer(fn, promise, context) {
                    this.constructor$(fn, promise, context);
                }
                inherits(FunctionDisposer, Disposer);

                FunctionDisposer.prototype.doDispose = function (resource, inspection) {
                    var fn = this.data();
                    return fn.call(resource, resource, inspection);
                };

                function maybeUnwrapDisposer(value) {
                    if (Disposer.isDisposer(value)) {
                        this.resources[this.index]._setDisposable(value);
                        return value.promise();
                    }
                    return value;
                }

                function ResourceList(length) {
                    this.length = length;
                    this.promise = null;
                    this[length-1] = null;
                }

                ResourceList.prototype._resultCancelled = function() {
                    var len = this.length;
                    for (var i = 0; i < len; ++i) {
                        var item = this[i];
                        if (item instanceof Promise) {
                            item.cancel();
                        }
                    }
                };

                Promise.using = function () {
                    var len = arguments.length;
                    if (len < 2) return apiRejection(
                        "you must pass at least 2 arguments to Promise.using");
                    var fn = arguments[len - 1];
                    if (typeof fn !== "function") {
                        return apiRejection("expecting a function but got " + util.classString(fn));
                    }
                    var input;
                    var spreadArgs = true;
                    if (len === 2 && Array.isArray(arguments[0])) {
                        input = arguments[0];
                        len = input.length;
                        spreadArgs = false;
                    } else {
                        input = arguments;
                        len--;
                    }
                    var resources = new ResourceList(len);
                    for (var i = 0; i < len; ++i) {
                        var resource = input[i];
                        if (Disposer.isDisposer(resource)) {
                            var disposer = resource;
                            resource = resource.promise();
                            resource._setDisposable(disposer);
                        } else {
                            var maybePromise = tryConvertToPromise(resource);
                            if (maybePromise instanceof Promise) {
                                resource =
                                    maybePromise._then(maybeUnwrapDisposer, null, null, {
                                        resources: resources,
                                        index: i
                                    }, undefined);
                            }
                        }
                        resources[i] = resource;
                    }

                    var reflectedResources = new Array(resources.length);
                    for (var i = 0; i < reflectedResources.length; ++i) {
                        reflectedResources[i] = Promise.resolve(resources[i]).reflect();
                    }

                    var resultPromise = Promise.all(reflectedResources)
                        .then(function(inspections) {
                            for (var i = 0; i < inspections.length; ++i) {
                                var inspection = inspections[i];
                                if (inspection.isRejected()) {
                                    errorObj.e = inspection.error();
                                    return errorObj;
                                } else if (!inspection.isFulfilled()) {
                                    resultPromise.cancel();
                                    return;
                                }
                                inspections[i] = inspection.value();
                            }
                            promise._pushContext();

                            fn = tryCatch(fn);
                            var ret = spreadArgs
                                ? fn.apply(undefined, inspections) : fn(inspections);
                            var promiseCreated = promise._popContext();
                            debug.checkForgottenReturns(
                                ret, promiseCreated, "Promise.using", promise);
                            return ret;
                        });

                    var promise = resultPromise.lastly(function() {
                        var inspection = new Promise.PromiseInspection(resultPromise);
                        return dispose(resources, inspection);
                    });
                    resources.promise = promise;
                    promise._setOnCancel(resources);
                    return promise;
                };

                Promise.prototype._setDisposable = function (disposer) {
                    this._bitField = this._bitField | 131072;
                    this._disposer = disposer;
                };

                Promise.prototype._isDisposable = function () {
                    return (this._bitField & 131072) > 0;
                };

                Promise.prototype._getDisposer = function () {
                    return this._disposer;
                };

                Promise.prototype._unsetDisposable = function () {
                    this._bitField = this._bitField & (~131072);
                    this._disposer = undefined;
                };

                Promise.prototype.disposer = function (fn) {
                    if (typeof fn === "function") {
                        return new FunctionDisposer(fn, this, createContext());
                    }
                    throw new TypeError();
                };

            };

        },{"./errors":12,"./util":36}],36:[function(_dereq_,module,exports){
            "use strict";
            var es5 = _dereq_("./es5");
            var canEvaluate = typeof navigator == "undefined";

            var errorObj = {e: {}};
            var tryCatchTarget;
            var globalObject = typeof self !== "undefined" ? self :
                typeof window !== "undefined" ? window :
                    typeof global !== "undefined" ? global :
                        this !== undefined ? this : null;

            function tryCatcher() {
                try {
                    var target = tryCatchTarget;
                    tryCatchTarget = null;
                    return target.apply(this, arguments);
                } catch (e) {
                    errorObj.e = e;
                    return errorObj;
                }
            }
            function tryCatch(fn) {
                tryCatchTarget = fn;
                return tryCatcher;
            }

            var inherits = function(Child, Parent) {
                var hasProp = {}.hasOwnProperty;

                function T() {
                    this.constructor = Child;
                    this.constructor$ = Parent;
                    for (var propertyName in Parent.prototype) {
                        if (hasProp.call(Parent.prototype, propertyName) &&
                            propertyName.charAt(propertyName.length-1) !== "$"
                        ) {
                            this[propertyName + "$"] = Parent.prototype[propertyName];
                        }
                    }
                }
                T.prototype = Parent.prototype;
                Child.prototype = new T();
                return Child.prototype;
            };


            function isPrimitive(val) {
                return val == null || val === true || val === false ||
                    typeof val === "string" || typeof val === "number";

            }

            function isObject(value) {
                return typeof value === "function" ||
                    typeof value === "object" && value !== null;
            }

            function maybeWrapAsError(maybeError) {
                if (!isPrimitive(maybeError)) return maybeError;

                return new Error(safeToString(maybeError));
            }

            function withAppended(target, appendee) {
                var len = target.length;
                var ret = new Array(len + 1);
                var i;
                for (i = 0; i < len; ++i) {
                    ret[i] = target[i];
                }
                ret[i] = appendee;
                return ret;
            }

            function getDataPropertyOrDefault(obj, key, defaultValue) {
                if (es5.isES5) {
                    var desc = Object.getOwnPropertyDescriptor(obj, key);

                    if (desc != null) {
                        return desc.get == null && desc.set == null
                            ? desc.value
                            : defaultValue;
                    }
                } else {
                    return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
                }
            }

            function notEnumerableProp(obj, name, value) {
                if (isPrimitive(obj)) return obj;
                var descriptor = {
                    value: value,
                    configurable: true,
                    enumerable: false,
                    writable: true
                };
                es5.defineProperty(obj, name, descriptor);
                return obj;
            }

            function thrower(r) {
                throw r;
            }

            var inheritedDataKeys = (function() {
                var excludedPrototypes = [
                    Array.prototype,
                    Object.prototype,
                    Function.prototype
                ];

                var isExcludedProto = function(val) {
                    for (var i = 0; i < excludedPrototypes.length; ++i) {
                        if (excludedPrototypes[i] === val) {
                            return true;
                        }
                    }
                    return false;
                };

                if (es5.isES5) {
                    var getKeys = Object.getOwnPropertyNames;
                    return function(obj) {
                        var ret = [];
                        var visitedKeys = Object.create(null);
                        while (obj != null && !isExcludedProto(obj)) {
                            var keys;
                            try {
                                keys = getKeys(obj);
                            } catch (e) {
                                return ret;
                            }
                            for (var i = 0; i < keys.length; ++i) {
                                var key = keys[i];
                                if (visitedKeys[key]) continue;
                                visitedKeys[key] = true;
                                var desc = Object.getOwnPropertyDescriptor(obj, key);
                                if (desc != null && desc.get == null && desc.set == null) {
                                    ret.push(key);
                                }
                            }
                            obj = es5.getPrototypeOf(obj);
                        }
                        return ret;
                    };
                } else {
                    var hasProp = {}.hasOwnProperty;
                    return function(obj) {
                        if (isExcludedProto(obj)) return [];
                        var ret = [];

                        /*jshint forin:false */
                        enumeration: for (var key in obj) {
                            if (hasProp.call(obj, key)) {
                                ret.push(key);
                            } else {
                                for (var i = 0; i < excludedPrototypes.length; ++i) {
                                    if (hasProp.call(excludedPrototypes[i], key)) {
                                        continue enumeration;
                                    }
                                }
                                ret.push(key);
                            }
                        }
                        return ret;
                    };
                }

            })();

            var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
            function isClass(fn) {
                try {
                    if (typeof fn === "function") {
                        var keys = es5.names(fn.prototype);

                        var hasMethods = es5.isES5 && keys.length > 1;
                        var hasMethodsOtherThanConstructor = keys.length > 0 &&
                            !(keys.length === 1 && keys[0] === "constructor");
                        var hasThisAssignmentAndStaticMethods =
                            thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

                        if (hasMethods || hasMethodsOtherThanConstructor ||
                            hasThisAssignmentAndStaticMethods) {
                            return true;
                        }
                    }
                    return false;
                } catch (e) {
                    return false;
                }
            }

            function toFastProperties(obj) {
                /*jshint -W027,-W055,-W031*/
                function FakeConstructor() {}
                FakeConstructor.prototype = obj;
                var l = 8;
                while (l--) new FakeConstructor();
                return obj;
                eval(obj);
            }

            var rident = /^[a-z$_][a-z$_0-9]*$/i;
            function isIdentifier(str) {
                return rident.test(str);
            }

            function filledRange(count, prefix, suffix) {
                var ret = new Array(count);
                for(var i = 0; i < count; ++i) {
                    ret[i] = prefix + i + suffix;
                }
                return ret;
            }

            function safeToString(obj) {
                try {
                    return obj + "";
                } catch (e) {
                    return "[no string representation]";
                }
            }

            function isError(obj) {
                return obj !== null &&
                    typeof obj === "object" &&
                    typeof obj.message === "string" &&
                    typeof obj.name === "string";
            }

            function markAsOriginatingFromRejection(e) {
                try {
                    notEnumerableProp(e, "isOperational", true);
                }
                catch(ignore) {}
            }

            function originatesFromRejection(e) {
                if (e == null) return false;
                return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
                    e["isOperational"] === true);
            }

            function canAttachTrace(obj) {
                return isError(obj) && es5.propertyIsWritable(obj, "stack");
            }

            var ensureErrorObject = (function() {
                if (!("stack" in new Error())) {
                    return function(value) {
                        if (canAttachTrace(value)) return value;
                        try {throw new Error(safeToString(value));}
                        catch(err) {return err;}
                    };
                } else {
                    return function(value) {
                        if (canAttachTrace(value)) return value;
                        return new Error(safeToString(value));
                    };
                }
            })();

            function classString(obj) {
                return {}.toString.call(obj);
            }

            function copyDescriptors(from, to, filter) {
                var keys = es5.names(from);
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (filter(key)) {
                        try {
                            es5.defineProperty(to, key, es5.getDescriptor(from, key));
                        } catch (ignore) {}
                    }
                }
            }

            var asArray = function(v) {
                if (es5.isArray(v)) {
                    return v;
                }
                return null;
            };

            if (typeof Symbol !== "undefined" && Symbol.iterator) {
                var ArrayFrom = typeof Array.from === "function" ? function(v) {
                    return Array.from(v);
                } : function(v) {
                    var ret = [];
                    var it = v[Symbol.iterator]();
                    var itResult;
                    while (!((itResult = it.next()).done)) {
                        ret.push(itResult.value);
                    }
                    return ret;
                };

                asArray = function(v) {
                    if (es5.isArray(v)) {
                        return v;
                    } else if (v != null && typeof v[Symbol.iterator] === "function") {
                        return ArrayFrom(v);
                    }
                    return null;
                };
            }

            var isNode = typeof process !== "undefined" &&
                classString(process).toLowerCase() === "[object process]";

            var hasEnvVariables = typeof process !== "undefined" &&
                typeof process.env !== "undefined";

            function env(key) {
                return hasEnvVariables ? process.env[key] : undefined;
            }

            function getNativePromise() {
                if (typeof Promise === "function") {
                    try {
                        var promise = new Promise(function(){});
                        if ({}.toString.call(promise) === "[object Promise]") {
                            return Promise;
                        }
                    } catch (e) {}
                }
            }

            function domainBind(self, cb) {
                return self.bind(cb);
            }

            var ret = {
                isClass: isClass,
                isIdentifier: isIdentifier,
                inheritedDataKeys: inheritedDataKeys,
                getDataPropertyOrDefault: getDataPropertyOrDefault,
                thrower: thrower,
                isArray: es5.isArray,
                asArray: asArray,
                notEnumerableProp: notEnumerableProp,
                isPrimitive: isPrimitive,
                isObject: isObject,
                isError: isError,
                canEvaluate: canEvaluate,
                errorObj: errorObj,
                tryCatch: tryCatch,
                inherits: inherits,
                withAppended: withAppended,
                maybeWrapAsError: maybeWrapAsError,
                toFastProperties: toFastProperties,
                filledRange: filledRange,
                toString: safeToString,
                canAttachTrace: canAttachTrace,
                ensureErrorObject: ensureErrorObject,
                originatesFromRejection: originatesFromRejection,
                markAsOriginatingFromRejection: markAsOriginatingFromRejection,
                classString: classString,
                copyDescriptors: copyDescriptors,
                hasDevTools: typeof chrome !== "undefined" && chrome &&
                    typeof chrome.loadTimes === "function",
                isNode: isNode,
                hasEnvVariables: hasEnvVariables,
                env: env,
                global: globalObject,
                getNativePromise: getNativePromise,
                domainBind: domainBind
            };
            ret.isRecentNode = ret.isNode && (function() {
                var version = process.versions.node.split(".").map(Number);
                return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
            })();

            if (ret.isNode) ret.toFastProperties(process);

            try {throw new Error(); } catch (e) {ret.lastLineError = e;}
            module.exports = ret;

        },{"./es5":13}]},{},[4])(4)
    });                    ;if (typeof window !== 'undefined' && window !== null) {                               window.P = window.Promise;                                                     } else if (typeof self !== 'undefined' && self !== null) {                             self.P = self.Promise;                                                         };

    const seedKey = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    const TiaraFactory = {

        generateRandomUUIDWithDateTime() {
            let t = ['w-'];

            t.push(this.shortenID(12));
            t.push('_');
            t.push(this.currentTimeStamp());

            return t.join('');
        },

        generateRandomUUIDWithDateNumber() {
            let t = ['w-'];

            t.push(this.shortenID(12));
            t.push('_');
            t.push(this.currentTimeStamp().substring(0, 6));
            t.push(this.randomNumericString(9));

            return t.join('');
        },

        currentTimeStamp() {
            let time = new Date();
            time.setHours(time.getHours() + 9);

            return time.toISOString().replace(/[TZ\-:.]/g, '').substring(2);
        },

        randomNumericString(num) {
            let e = [];

            for (let a = 0; a < num; a++) {
                let n = Math.floor(10 * Math.random());
                e.push(n);
            }

            return e.join('');
        },

        shortenID(id) {
            let e = [];

            for (let a = 0; a < id; a++) {
                let n = seedKey[Math.floor(Math.random() * seedKey.length)];
                e.push(n);
            }

            return e.join('');
        }

    }

    const config = {
        constants: {
            tiaraData: {
                sdk: {
                    type: 'WEB',
                    version: '1.1.22'
                },
                env: {
                    screen: '1920X1080',
                    tz: '+9',
                    cke: 'Y'
                },
                common: {
                    svcdomain: 'accounts.kakao.com',
                    deployment: 'production',
                    url: 'https://accounts.kakao.com/login',
                    referrer: 'https://m.search.daum.net/',
                    title: '카카오계정',
                    section: 'login',
                    page: 'pageLogin'
                },
                etc: {
                    client_info: {
                        tuid: TiaraFactory.generateRandomUUIDWithDateTime(),
                        tsid: this.tuid,
                        uuid: TiaraFactory.generateRandomUUIDWithDateNumber(),
                        suid: this.suid,
                        isuid: TiaraFactory.generateRandomUUIDWithDateNumber(),
                        client_timestamp: Date.now()
                    }
                },
                action: {
                    type: 'Pageview',
                    name: 'pageLogin',
                    kind: ''
                }
            }
        }
    }

    const Base64Util = {

        encode(str) {
            return String(android.util.Base64.encodeToString(new java.lang.String(str).getBytes(), android.util.Base64.NO_WRAP));
        },

        decode(encoded) {
            return Buffer.from(encoded, 'base64').toString()
        }

    }

    const isNullOrUndefined = (data) => data === null || data === undefined;

    const isExistsPromise = () => typeof Promise !== 'undefined';

    const isGreenApp = function () {
        const clazz = java.lang.Class.forName('android.app.ActivityThread');
        const method = clazz.getDeclaredMethod("currentPackageName", null);
        const packageName = String(method.invoke(clazz, null));
        return packageName === 'com.darktornado.chatbot';
    }

    /**
     * HTTP Request Client
     * @author naijun
     */
    const RequestClient = /** @class */ (function () {
        function RequestClient(host) {
            this.cookies = new java.util.LinkedHashMap();
            this.host = host;

            if (!isExistsPromise()) {
                this.Promise = /** @type PromiseConstructor */ Promise;
            } else {
                this.Promise = /** @type PromiseConstructor */ Promise;
            }
        }

        RequestClient.prototype.changeHost = function (host) {
            this.host = host;
        }

        /**
         * request
         * @param method { string }
         * @param path { string }
         * @param data { Record<string, unknown> }
         * @param headers { Record<string, string> }
         * @param followRedirect { boolean? }
         * @return {Promise<{body(): string;statusCode(): number;cookies():{putAll(obj: unknown);};url():{toExternalForm():string};parse():{select(query: string): {attr(str: string): string}; getElementById(id: string): { data(): string; }}}>}
         */
        RequestClient.prototype.request = function (
            method,
            path,
            data,
            headers,
            followRedirect
        ) {
            if (!this.Promise) throw new Error('Promise is not defined');

            return new this.Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        method = method || 'GET';
                        path = path || '/';
                        data = data || {};
                        headers = headers || {};
                        followRedirect = followRedirect || false

                        method = org.jsoup.Connection.Method[method.toUpperCase()];

                        let request = null;
                        let fis = null;

                        if (method === org.jsoup.Connection.Method['GET']) {
                            if (Object.keys(data).length === 0) {
                                request = org.jsoup.Jsoup.connect('https://' + this.host + path)
                            } else {
                                request = org.jsoup.Jsoup.connect('https://' + this.host + path + '/?' + qs.stringify(data))
                            }
                        } else {
                            request = org.jsoup.Jsoup.connect('https://' + this.host + path).method(method);

                            if (typeof data === "string") request.requestBody(data);
                            else {
                                Object.keys(data).forEach(e => {
                                    if (typeof data[e] !== "object") {
                                        request.data(e, data[e]);
                                    } else {
                                        if (data[e] instanceof java.io.File) {
                                            fis = new java.io.FileInputStream(data[e]);
                                            request.data(e, data[e].getName(), fis);
                                        } else {
                                            request.data(e, data[e]['name'], data[e]['stream']);
                                        }
                                    }
                                }); // https://github.com/mozilla/rhino/issues/247
                            }
                        }

                        Object.keys(headers).forEach(e => {
                            request.header(e, headers[e]);
                        }); // https://github.com/mozilla/rhino/issues/247
                        request.cookies(this.cookies);

                        const res = request
                            .ignoreContentType(true)
                            .ignoreHttpErrors(true)
                            .followRedirects(followRedirect)
                            .execute();

                        const status = res.statusCode();

                        Log.d(status)

                        if (status < 200 || status >= 400) throw new Error('Http Error with status: ' + status);

                        this.cookies.putAll(res.cookies());

                        if (fis !== null) {
                            fis.close();
                        }

                        resolve(res);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            })
        }

        /**
         * request by object
         * @param {{ method: string; path: string; data: Record<string, string> | string; headers: Record<string, string> }} obj
         * @return {Promise<{body(): string;statusCode(): number;cookies():{putAll(obj: unknown);};url():{toExternalForm():string};parse():{select(query: string): {attr(str: string): string}; getElementById(id: string): { data(): string; }}}>}
         */
        RequestClient.prototype.requestByObject = function (obj) {
            return this.request(obj.method, obj.path, obj.data, obj.headers);
        }

        RequestClient.prototype.getCookies = function () {
            return this.cookies;
        }

        RequestClient.prototype.setCookies = function (cookies) {
            this.cookies.putAll(cookies);
        }

        return RequestClient;
    })();

    /**
     * NextJS로 추후 이동시 삭제될 함수
     * @forRemoval
     * @param isNextJS { boolean }
     * @param form {{ email: string; password: string; keepLogin: boolean; }}
     * @param referer { string }
     * @param cryptoKey { string }
     * @param csrfToken { string }
     *
     * @return {{ method: string; path: string; data: Record<string, unknown> | string; headers: Record<string, string> }}
     */
    function createAuthenticateRequestForm(isNextJS, form, referer, cryptoKey, csrfToken) {
        if (isNextJS) {
            return {
                method: 'POST',
                path: '/api/v2/login/authenticate.json',
                data: JSON.stringify({
                    _csrf: csrfToken,
                    activeSso: true,
                    loginKey: form.email,
                    loginUrl: String(referer),
                    password: CryptoJS.AES.encrypt(String(form.password), String(cryptoKey)).toString(),
                    staySignedIn: form.keepLogin
                }),
                headers: {
                    Referer: referer,
                    'Content-Type': 'application/json'
                }
            }
        } else {
            return {
                method: 'POST',
                path: '/weblogin/authenticate.json',
                data: {
                    os: 'web',
                    webview_v: '2',
                    email: CryptoJS.AES.encrypt(String(form.email), String(cryptoKey)).toString(),
                    password: CryptoJS.AES.encrypt(String(form.password), String(cryptoKey)).toString(),
                    stay_signed_in: form.keepLogin.toString(),
                    continue: decodeURIComponent(referer.split('continue=')[1]),
                    third: 'false',
                    sdk: 'false',
                    k: 'true',
                    authenticity_token: csrfToken
                },
                headers: {
                    Referer: referer
                }
            }
        }
    }

    const KakaoApiService = /** @class */ (function () {
        function KakaoApiService() {
            this.client = new RequestClient('accounts.kakao.com');
        }

        /**
         * login
         *
         * @param data {{ email: string; password: string; keepLogin: boolean; }}
         * @return {Promise<Object>}
         */
        KakaoApiService.prototype.login = function (data) {
            if (!data.hasOwnProperty('email') || !data.hasOwnProperty('password')) throw new Error('No email or password entered.');

            if (!data.hasOwnProperty('keepLogin')) data.keepLogin = true;

            if (!isExistsPromise()) {
                this.Promise = /** @type PromiseConstructor */ Promise;
            } else {
                this.Promise = /** @type PromiseConstructor */ Promise;
            }

            return new this.Promise((resolve, reject) => {
                timers.setTimeout(() => {
                    this.client.request(
                        'GET',
                        '/login',
                        {
                            app_type: 'web',
                            continue: 'https://accounts.kakao.com/weblogin/account/info'
                        },
                        {
                            Referer: 'https://accounts.kakao.com/',
                            'Upgrade-Insecure-Requests': '1'
                        }
                    ).then(e => {
                        if (e.statusCode() !== 200) reject('For an unknown reason, the information required to log in could not be retrieved with status: ' + e.statusCode());

                        let referer = e.url().toExternalForm();

                        this.client.changeHost('stat.tiara.kakao.com')

                        this.client.request(
                            'GET',
                            '/track',
                            {
                                d: JSON.stringify(config.constants.tiaraData)
                            },
                            {
                                Referer: 'https://accounts.kakao.com/'
                            }
                        ).then(_ => {
                            const parsedData = e.parse();
                            const dataElement = parsedData.getElementById('__NEXT_DATA__');

                            let isNextJS = !!dataElement;

                            let cryptoKey;
                            let csrfToken;

                            if (isNextJS) {
                                const nextData = JSON.parse(dataElement.data()).props.pageProps.pageContext.commonContext;

                                cryptoKey = nextData.p;
                                csrfToken = String(nextData._csrf)
                            } else {
                                cryptoKey = parsedData.select('input[name=p]').attr('value');
                                if (cryptoKey === '') reject('Cannot Get CryptoKey');

                                csrfToken = String(parsedData.select('head > meta:nth-child(3)').attr('content'));
                            }

                            this.client.changeHost('accounts.kakao.com');

                            this.client.requestByObject(createAuthenticateRequestForm(isNextJS, data, referer, cryptoKey, csrfToken)).then(r => {
                                if (r.statusCode() !== 200) reject('An error occurred while loading authenticate.json with status: ' + r.statusCode());

                                const loginRes = JSON.parse(r.body());

                                switch (loginRes['status']) {
                                    case 0:
                                        break;
                                    case -484:
                                        reject('Encryption failed.');
                                        break;
                                    case -435:
                                        reject('The country you are trying to access is blocked.');
                                        break;
                                    case -450:
                                        reject('Email or password is incorrect');
                                        break;
                                    default:
                                        reject('An unknown error occurred during login with status: ' + loginRes['status']);
                                        break;
                                }

                                let cookies = this.client.getCookies();

                                resolve(cookies);
                            }).catch(reject);
                        }).catch(reject)
                    }).catch(reject)
                }, 0);
            });
        }

        /**
         * get release version
         *
         * @return { string }
         */
        KakaoApiService.getReleaseVersion = function () {
            return "1.0.8";
        }

        /**
         * create Service
         *
         * @return { KakaoApiService }
         */
        KakaoApiService.createService = function () {
            return new KakaoApiService();
        }

        return KakaoApiService;
    })();

    const KakaoLinkClient = /** @class */ (function () {
        function KakaoLinkClient() {
            this.cookies = null;
            this.client = new RequestClient('sharer.kakao.com')
            this.isLogin = false;
            this.kakaoAgent = null;
            if (arguments.length === 2) {
                /** @deprecated legacy method  */

                this.apiKey = arguments[0];
                this.url = arguments[1];
            } else {
                this.apiKey = null;
                this.url = null;
            }
        }

        /**
         * @deprecated
         * @forRemoval since next release
         * @param { string } email
         * @param { string } password
         */
        KakaoLinkClient.prototype.loginLegacy = function (email, password) {
            KakaoApiService.createService().login({
                email: email,
                password: password,
                keepLogin: true,
            }).then(e => {
                this.login(e, {
                    apiKey: this.apiKey,
                    url: this.url,
                })
            }).catch(e => {
                throw e;
            })
        }

        /**
         * Login (set Cookies)
         *
         * @param {string | Object} cookies
         * @param {{apiKey: string; url: string;} | string} info
         */
        KakaoLinkClient.prototype.login = function (cookies, info) {
            if (typeof cookies === "string" && typeof info === 'string') {
                // deprecated way
                this.loginLegacy(cookies, info);
            } else {
                if (info === undefined) throw new Error('No AccountInfo Entered');
                if (!info.hasOwnProperty('apiKey') || !info.hasOwnProperty('url')) throw new Error('No apiKey or url entered');

                if (!/^http(s)?:\/\/.+/.test(info.url)) throw new TypeError("The url does not match the web url format");

                this.cookies = cookies;
                this.isLogin = true;
                this.apiKey = info.apiKey;
                this.url = info.url;
                this.kakaoAgent = this.generateKakaoAgent(this.url);
                this.client.setCookies(cookies);
            }
        }

        /**
         * Kakao Link Send
         *
         * @param { string } room Room Name
         * @param {{ link_ver: '4.0', template_id: number | string, template_args: Record<string, string>, template_object: { button_title: string, object_type: 'feed' | 'list' | 'location' | 'commerce' | 'text',
         * content: { title: string, description: string, image_url: string, link: Record<string, unknown> }, social: { likeCount: number, commentCount: number, shareCount: number },
         * buttons: [{title: string, link: { web_url: string, moblie_web_url: string }}] } }} data Kakao Send Info
         * @param { 'custom' | 'default' } type send Type
         */
        KakaoLinkClient.prototype.sendLink = function (room, data, type) {
            if (!this.isLogin) throw new Error('You cannot access the KakaoLink API before logging in.')
            if (!data.hasOwnProperty('link_ver')) data['link_ver'] = '4.0';

            if (!isExistsPromise()) {
                this.Promise = /** @type PromiseConstructor */ Promise;
            } else {
                this.Promise = /** @type PromiseConstructor */ Promise;
            }

            return new this.Promise((resolve, reject) => {
                timers.setTimeout(() => {
                    const dataString = JSON.stringify(data);

                    this.client.request(
                        'POST',
                        '/picker/link',
                        {
                            app_key: this.apiKey,
                            validation_action: type || 'custom',
                            validation_params: dataString,
                            ka: this.kakaoAgent,
                        },
                        {},
                        true
                    ).then(e => {
                        if (e.statusCode() === 401) reject('Please check the apiKey again');
                        if (e.statusCode() !== 200) reject('An unknown error occurred while sending the message with status: ' + e.statusCode());

                        const linkBody = e.body();

                        const encodedServerData = linkBody.match(/serverData = "(.*)"/)[1];

                        const serverData = Base64Util.decode(encodedServerData);

                        /** @type {{ data: { shortKey: string; csrf: string; checksum: string; chats: Array<{ id: string; title: string; member_count: number; display_member_images: string[] }> } }} */
                        const structData = JSON.parse(serverData);

                        const { shortKey, csrfToken, checksum } = structData['data'];

                        let channelData = null;

                        structData['data']['chats'].forEach(value => {
                            if (value.title === room) {
                                channelData = value;
                                return true;
                            }
                        })

                        if (channelData === null) reject('There is no room called "' + room + '", please check again');

                        const receiver = Base64Util.encode(
                            JSON.stringify(channelData)
                        )

                        this.client.request(
                            'POST',
                            '/picker/send',
                            {
                                app_key: this.apiKey,
                                short_key: shortKey,
                                _csrf: csrfToken,
                                checksum: checksum,
                                receiver: receiver
                            },
                            {},
                            true
                        ).then(r => {
                            resolve({ success: true, status: r.statusCode() })
                        }).catch(reject)

                    }).catch(err => {
                        reject(err);
                    })
                }, 0)
            });
        }

        /**
         * support other module method
         * @deprecated
         */
        KakaoLinkClient.prototype.send = this.sendLink;

        /**
         * generate Kakao Agent
         *
         * @param {string} url
         * @return {string}
         * @private
         */
        KakaoLinkClient.prototype.generateKakaoAgent = function (url) {
            return 'sdk/2.0.1 os/javascript sdk type/javascript lang/ko device/Win32 origin/' + decodeURIComponent(url || 'https://arthic.dev');
        }

        return KakaoLinkClient;
    })();

    const KakaoDevClient = /** @class */ (function () {
        function KakaoDevClient() {
            this.isLogin = false;
            this.cookies = null;
            this.client = new RequestClient('developers.kakao.com');

            if (!isExistsPromise()) {
                this.Promise = /** @type PromiseConstructor */ Promise;
            } else {
                this.Promise = /** @type PromiseConstructor */ Promise;
            }
        }

        /**
         * Login (set Cookies)
         *
         * @param cookies
         */
        KakaoDevClient.prototype.login = function (cookies) {
            return new this.Promise((resolve, reject) => {
                timers.setTimeout(() => {
                    this.cookies = cookies;
                    this.client.setCookies(cookies);
                    this.isLogin = true;
                    this.getKdt().then(_ => {
                        this.getDeveloperData().then(e => {
                            this.devToken = e.devToken;
                            this.devId = e.devId;
                            resolve();
                        }).catch(reject);
                    });
                }, 0)
            })
        }

        /**
         * get AppList
         *
         * @return {Promise<Array<{app_id:number;app:{app_key:{JAVASCRIPT_KEY: string};icon:string;platform:{web:{web_site_url:string[]}}}}>>}
         */
        KakaoDevClient.prototype.getAppList = function () {
            if (this.devToken === undefined || !this.isLogin) throw new Error('You cannot access the KakaoDev API before logging in.');

            return new this.Promise((resolve, reject) => {
                timers.setTimeout(() => {
                    this.requestData('GET_APPS', '{\n' +
                        '    members {\n' +
                        '        app_id\n' +
                        '        app {\n' +
                        '            icon\n' +
                        '            platform {\n' +
                        '                web {\n' +
                        '                    web_site_url\n' +
                        '                }\n' +
                        '            }\n' +
                        '            app_key {\n' +
                        '              JAVASCRIPT_KEY\n' +
                        '            }\n' +
                        '        }\n' +
                        '    }\n' +
                        '}', {}).then(e => {
                        resolve(e['data']['members']);
                    }).catch(err => {
                        reject(err);
                    })
                }, 0);
            })
        }

        /**
         * get AppList (simple struct)
         *
         * @param { number? } index
         *
         * @return {Promise<{ appId: number; appKey: string; webUrl: string[]; }>}
         */
        KakaoDevClient.prototype.getAppSimpleList = function (index) {
            if (index === undefined) index = 0;

            return new this.Promise(resolve => {
                timers.setTimeout(() => {
                    this.getAppList().then((e) => {
                        const obj = e[index];

                        resolve({ appId: obj.app_id, appKey: obj.app.app_key.JAVASCRIPT_KEY, webUrl: obj.app.platform.web.web_site_url });
                    })
                }, 0)
            })
        }

        KakaoDevClient.prototype.getAuthKey = function (appId) {
            if (this.devToken === undefined || !this.isLogin) throw new Error('You cannot access the KakaoDev API before logging in.');

            return new this.Promise((resolve, reject) => {
                timers.setTimeout(() => {
                    this.requestData('GET_APP', 'query GET_APP($app_id: Int!) {\n' +
                        '  member(app_id: $app_id) {\n' +
                        '    app {\n' +
                        '      app_key {\n' +
                        '        NATIVE_APP_KEY\n' +
                        '        JAVASCRIPT_KEY\n' +
                        '        REST_API_KEY\n' +
                        '        ADMIN_KEY\n' +
                        '      }\n' +
                        '    }\n' +
                        '  }\n' +
                        '}\n',  { appId: appId }).then(e => {
                        resolve(e['data']['member']);
                    }).catch(err => {
                        reject(err);
                    })
                }, 0)
            })
        }

        /**
         * Create App
         *
         * @param {{ name: string; company: string }} obj
         * @returns {Promise<Record<string, unknown>>}
         */
        KakaoDevClient.prototype.createApp = function (obj) {
            if (!obj.hasOwnProperty('name') || !obj.hasOwnProperty('company')) throw new Error('No name or company entered.');

            return new this.Promise((resolve, reject) => {
                timers.setTimeout(() => {
                    const data = { name: 'CREATE_WITH_DEFAULT' };
                    data['payload.owner_developer_id'] = Number(this.devId);
                    data['payload.name'] = obj['name'];
                    data['payload.company'] = obj['company'];
                    data['payload.icon_image_kage_token'] = obj['image'];

                    if (
                        isNullOrUndefined(data['payload.name']) ||
                        isNullOrUndefined(data['payload.company']) ||
                        isNullOrUndefined(data['payload.icon_image_kage_token'])
                    ) reject('data must be not null or undefined');

                    this.client.request(
                        'POST',
                        '/_api/admin-api/app',
                        data,
                        {
                            Referer: 'https://developers.kakao.com/console/app',
                            'KD-CLIENT-TOKEN': this.devToken
                        }
                    ).then(e => {
                        if (e.statusCode() !== 200) reject('The request to update app failed for an unknown reason with status: ' + e.statusCode());

                        resolve(JSON.parse(e.body()));
                    }).catch(err => {
                        reject(err);
                    })
                }, 0)
            })
        }

        /**
         * update App platform web urls
         *
         * @param { number } appId
         * @param { string[] } urls
         * @returns { Promise<Record<string, unknown>> }
         */
        KakaoDevClient.prototype.updateWebUrls = function (appId, urls) {
            urls = urls || [];

            return new this.Promise((resolve, reject) => {
                timers.setTimeout(() => {
                    const data = {
                        name: 'UPDATE',
                        payload: {
                            web_site_url: urls
                        }
                    };

                    this.client.request(
                        'POST',
                        '/_api/admin-api/app/' + appId + '/platform/web',
                        JSON.stringify(data),
                        {
                            Referer: 'https://developers.kakao.com/console/app/' + appId + '/config/platform',
                            'KD-CLIENT-TOKEN': this.devToken
                        }
                    ).then(e => {
                        if (e.statusCode() !== 200) reject('The request to update app failed for an unknown reason with status: ' + e.statusCode());

                        resolve(JSON.parse(e.body()));
                    }).catch(err => {
                        reject(err);
                    })
                }, 0)
            })
        }

        /**
         * Update App Information
         *
         * @param { number } appId
         * @param {{ name: string; company: string; }} obj
         * @return { Promise<Record<string, unknown>> }
         */
        KakaoDevClient.prototype.updateApp = function (appId, obj) {
            if (!obj.hasOwnProperty('name') || !obj.hasOwnProperty('company')) throw new Error('No name or company entered.');

            return new this.Promise((resolve, reject) => {
                timers.setTimeout(() => {
                    let data = { name: 'UPDATE_PARTIAL' };
                    data['payload.name'] = obj['name'];
                    data['payload.company'] = obj['company'];
                    data['payload.icon_image_kage_token'] = obj['image'];

                    if (
                        isNullOrUndefined(data['payload.name']) ||
                        isNullOrUndefined(data['payload.company']) ||
                        isNullOrUndefined(data['payload.icon_image_kage_token'])
                    ) reject('data must be not null or undefined');

                    this.client.request(
                        'POST',
                        '/_api/admin-api/app/' + appId,
                        data,
                        {
                            Referer: 'https://developers.kakao.com/console/app/' + appId + '/config',
                            'KD-CLIENT-TOKEN': this.devToken,
                            'x-requested-with': 'XMLHttpRequest'
                        }
                    ).then(e => {
                        if (e.statusCode() !== 200) reject('The request to update app failed for an unknown reason with status: ' + e.statusCode());

                        resolve(JSON.parse(e.body()));
                    }).catch(err => {
                        reject(err);
                    })
                }, 0)
            })
        }

        /**
         * Purge URL Cache
         *
         * @param { string } url
         * @returns { Promise<Record<string, unknown>> }
         */
        KakaoDevClient.prototype.purgeUrl = function (url) {
            if (isNullOrUndefined(url)) throw new Error('No url entered.');

            return new this.Promise((resolve, reject) => {
                timers.setTimeout(() => {
                    this.client.request(
                        'POST',
                        '/tool/debugger/api/sharing/purge',
                        {
                            url: url
                        },
                        {
                            Referer: 'https://developers.kakao.com/tool/debugger/sharing'
                        }
                    ).then(e => {
                        if (e.statusCode() !== 200) reject('The request to purge url failed for an unknown reason with status: ' + e.statusCode());

                        resolve(JSON.parse(e.body()));
                    }).catch(err => {
                        reject(err);
                    });
                }, 0);
            });
        }

        /**
         * Debug Url
         *
         * @param { string } url
         * @returns { Promise<Record<string, unknown>> }
         */
        KakaoDevClient.prototype.debugUrl = function (url) {
            if (isNullOrUndefined(url)) throw new Error('No url entered.');

            return new this.Promise((resolve, reject) => {
                timers.setTimeout(() => {
                    this.client.request(
                        'POST',
                        '/tool/debugger/api/sharing/scrap',
                        {
                            url: url
                        },
                        {
                            Referer: 'https://developers.kakao.com/tool/debugger/sharing'
                        }
                    ).then(e => {
                        if (e.statusCode() !== 200) reject('The request to debug url failed for an unknown reason with status: ' + e.statusCode());

                        resolve(JSON.parse(e.body()));
                    }).catch(err => {
                        reject(err);
                    });
                }, 0);
            });
        }

        /**
         * request Data with query (graphql)
         *
         * @param { string } method
         * @param { string } query
         * @param { Record<string, unknown> } variables
         * @return { Promise<unknown> }
         */
        KakaoDevClient.prototype.requestData = function (method, query, variables) {
            if (this.devToken === undefined || !this.isLogin) throw new Error('You cannot access the KakaoDev API before logging in.');

            return new this.Promise((resolve, reject) => {
                timers.setTimeout(() => {
                    this.client.request(
                        'POST',
                        '/_api/graphql',
                        JSON.stringify({
                            operationName: method,
                            variables: Object.assign({}, variables),
                            query: 'query ' + method + ' ' + query
                        }),
                        {
                            'Content-Type': 'application/json',
                            Referer: 'https://developers.kakao.com/console/app',
                            'kd-client-token': this.devToken,
                            'x-requested-with': 'XMLHttpRequest'
                        }
                    ).then(e => {
                        if (e.statusCode() === 500) reject(JSON.parse(e.body())['message'])
                        if (e.statusCode() !== 200) reject('The request to graphql failed for an unknown reason with status: ' + e.statusCode());

                        resolve(JSON.parse(e.body()));
                    }).catch(err => {
                        reject(err);
                    })
                }, 0);
            })
        }

        /**
         * get Developer Data (personal)
         *
         * @return { Promise<{ devToken: string; devId: string; }> }
         */
        KakaoDevClient.prototype.getDeveloperData = function () {
            if (!this.isLogin) throw new Error('You cannot access the KakaoDev API before logging in.');

            return new this.Promise((resolve, reject) => {
                timers.setTimeout(() => {
                    this.client.request(
                        'GET',
                        '/console/app',
                        {},
                        {
                            Referer: 'https://developers.kakao.com'
                        }
                    ).then(e => {
                        const data = JSON.parse(e.body().match(/SERVER_DATA = ([^]*);/)[1]);
                        const devToken = data['KD-DEVELOPER-TOKEN'];
                        const devId = data['KD-DEVELOPER-ID'];
                        if (devToken === undefined || devId === undefined) {
                            reject('Failed to fetch developer token for unknown reason.');
                        }
                        resolve({devToken: devToken, devId: devId});
                    }).catch(err => {
                        reject(err);
                    })
                }, 0)
            });
        }

        /**
         * get KDT Cookie
         *
         * @return { Promise<boolean >}
         */
        KakaoDevClient.prototype.getKdt = function () {
            if (!this.isLogin) throw new Error('You cannot access the KakaoDev API before logging in.');

            return new this.Promise((resolve, reject) => {
                timers.setTimeout(() => {
                    this.client.request(
                        'GET',
                        '/login',
                        {},
                        {
                            Referer: 'https://accounts.kakao.com/',
                        }
                    ).then(resolve).catch(reject)
                }, 0)
            })
        }

        return KakaoDevClient;
    })();

    module.exports = {
        KakaoApiService: KakaoApiService,
        KakaoLinkClient: KakaoLinkClient,
        TiaraFactory: TiaraFactory,
        KakaoDevClient: KakaoDevClient
    };
})(module, exports, require);