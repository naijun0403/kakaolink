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

const {RequestClient} = require("../request/request-client");
const {isExistsPromise} = require("../util/is-promise");

exports.KakaoDevClient = /** @class */ (function () {
    function KakaoDevClient() {
        this.isLogin = false;
        this.cookies = null;
        this.client = new RequestClient('developers.kakao.com');

        if (!isExistsPromise()) {
            this.Promise = /** @type PromiseConstructor */ require('../polyfill/promise');
        } else {
            this.Promise = /** @type PromiseConstructor */ Promise;
        }
    }

    KakaoDevClient.prototype.login = function (cookies) {
        this.cookies = cookies;
        this.client.setCookies(cookies);
        this.isLogin = true;
        this.getDeveloperToken().then(e => {
            this.devToken = e;
        }).catch(err => {
            throw new Error(err);
        })
    }

    KakaoDevClient.prototype.getAppList = function () {
        if (this.devToken === undefined || !this.isLogin) throw new Error('You cannot access the KakaoLink API before logging in.');

        return new this.Promise((resolve, reject) => {
            this.requestData('GET_APPS', '{\n' +
                '    members {\n' +
                '        app_id\n' +
                '        app {\n' +
                '            platform {\n' +
                '                web {\n' +
                '                    web_site_url\n' +
                '                }\n' +
                '            }\n' +
                '        }\n' +
                '    }\n' +
                '}').then(e => {
                    resolve(e);
            }).catch(err => {
                reject(err);
            })
        })
    }

    KakaoDevClient.prototype.requestData = function (method, query) {
        if (this.devToken === undefined || !this.isLogin) throw new Error('You cannot access the KakaoLink API before logging in.');

        return new this.Promise((resolve, reject) => {
            this.client.request(
                'POST',
                '/_api/graphql',
                JSON.stringify({
                    operationName: method,
                    variables: {},
                    query: 'query ' + method + ' ' + query
                }),
                {
                    Referer: 'https://developers.kakao.com/console/app',
                    'kd-client-token': this.devToken
                }
            ).then(e => {
                if (e.statusCode() !== 200) reject('The request to graphql failed for an unknown reason with status: ' + e.statusCode());

                resolve(JSON.parse(e.body()));
            }).catch(err => {
                reject(err);
            })
        })
    }

    KakaoDevClient.prototype.getDeveloperToken = function () {
        if (!this.isLogin) throw new Error('You cannot access the KakaoLink API before logging in.');

        return new this.Promise((resolve, reject) => {
            this.client.request(
                'GET',
                '/console/app',
                {},
                {
                    Referer: 'https://developers.kakao.com'
                }
            ).then(e => {
                const data = JSON.parse(e.body().match(/SERVER_DATA = (.*);/s)[1]);
                const devToken = data['KO-DEVELOPER-TOKEN'];
                if (devToken === undefined) {
                    reject('Failed to fetch developer token for unknown reason.');
                }
                resolve(devToken);
            }).catch(err => {
                reject(err);
            })
        });
    }

    return KakaoDevClient;
})();