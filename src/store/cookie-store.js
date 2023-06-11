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

exports.CookieStore = (function () {

    const { CryptoJS } = require('../crypto');
    const { FileUtil } = require('../util/file-util');

    /**
     * Cookie Store
     * @param { string } path
     * @param { string } key
     * @constructor
     */
    function CookieStore(path, key) {
        this.key = key;

        this.path = path;

        this.content = FileUtil.exists(path) ? FileUtil.read(path) : null;
    }

    CookieStore.prototype.encrypt = function (message) {
        return CryptoJS.AES.encrypt(message, this.key).toString();
    }

    CookieStore.prototype.decrypt = function (message) {
        return CryptoJS.AES.decrypt(message, this.key).toString(CryptoJS.enc.Utf8);
    }

    CookieStore.prototype.hasCookie = function () {
        return this.content !== null;
    }

    CookieStore.prototype.readCookie = function () {
        if (!this.hasCookie()) return {};

        return JSON.parse(
            this.decrypt(
                this.content
            )
        );
    }

    CookieStore.prototype.writeCookie = function (map) {
        const obj = {};

        map.forEach((k, v) => obj[k] = v);

        const encrypted = this.encrypt(
            JSON.stringify(
                obj
            )
        );

        FileUtil.write(this.path, encrypted);
    }

    CookieStore.prototype.deleteCookie = function () {
        return FileUtil.delete(this.path);
    }

    return CookieStore;

})();