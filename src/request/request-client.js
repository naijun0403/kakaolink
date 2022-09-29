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
var { setTimeout } = require('../polyfill/timers');

/**
 * HTTP Request Client
 * @author naijun
 */
exports.RequestClient = /** @class */ (function () {
    function RequestClient(host) {
        this.cookies = new java.util.LinkedHashMap();
        this.host = host;

        if (!isExistsPromise()) {
            this.Promise = /** @type PromiseConstructor */ require('../polyfill/promise');
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