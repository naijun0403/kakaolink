/**
 * MIT License
 *
 * Copyright (c) 2022 naijun
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

const qs = require('../modules/qs')
const { isExistsPromise } = require("../util/is-promise");
const { checkIsFile } = require("../util/file-exists");

/**
 * HTTP Request Client
 * @author naijun
 */
exports.RequestClient = /** @class */ (function () {
    function RequestClient(host) {
        this.cookies = new java.util.LinkedHashMap();
        this.host = host;
    }

    RequestClient.prototype.changeHost = function (host) {
        this.host = host;
    }

    /**
     * request
     * @return {Promise<{body(): string;statusCode(): number;cookies():{putAll(obj: unknown);};url():{toExternalForm():string};parse():{select(query: string): {attr(str: string): string}}}>}
     */
    RequestClient.prototype.request = function (
        method,
        path,
        data,
        headers
    ) {

        if (!isExistsPromise()) {
            this.Promise = /** @type PromiseConstructor */ require('../polyfill/promise');
        } else {
            this.Promise = /** @type PromiseConstructor */ Promise;
        }

        return new this.Promise((resolve, reject) => {
            try {
                method = method || 'GET';
                path = path || '/';
                data = data || {};
                headers = headers || {};

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
                                let file = new java.io.File(data[e]['path']);
                                fis = new java.io.FileInputStream(file);
                                if (!checkIsFile(file)) {
                                    reject('The file path you entered is not valid.');
                                }
                                request.data(e, file.getName(), fis);
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
                    .followRedirects(false)
                    .execute();
                this.cookies.putAll(res.cookies());

                if (fis !== null) {
                    fis.close();
                }

                resolve(res);
            } catch (e) {
                reject(e);
            }
        })
    }

    RequestClient.prototype.getCookies = function () {
        return this.cookies;
    }

    RequestClient.prototype.setCookies = function (cookies) {
        this.cookies.putAll(cookies);
    }

    return RequestClient;
})();