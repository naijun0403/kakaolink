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

    /**
     * Login (set Cookies)
     *
     * @param cookies
     */
    KakaoDevClient.prototype.login = function (cookies) {
        this.cookies = cookies;
        this.client.setCookies(cookies);
        this.isLogin = true;
        this.getKdt().then(_ => {
            this.getDeveloperToken().then(e => {
                this.devToken = e;
            }).catch(err => {
                throw new Error(err);
            })
        });
    }

    /**
     * get AppList
     *
     * @return {Promise<Record<string, unknown>>}
     */
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
                '}', {}).then(e => {
                    resolve(e['data']['members']);
            }).catch(err => {
                reject(err);
            })
        })
    }

    /**
     * Update App Information
     *
     * @param {number} appId
     * @param {{name: string; company: string}} obj
     * @return {Promise<Record<string, unknown>>}
     */
    KakaoDevClient.prototype.updateApp = function (appId, obj) {
        if (!obj.hasOwnProperty('name') || !obj.hasOwnProperty('company')) throw new Error('No name or company entered.');

        return new this.Promise((resolve, reject) => {
            let data = { name: 'UPDATE_PARTIAL' };
            data['payload.name'] = obj['name'];
            data['payload.company'] = obj['company'];

            this.client.request(
                'POST',
                '/_api/admin-api/app/' + appId,
                data,
                {
                    Referer: 'https://developers.kakao.com/console/app/' + appId + '/config',
                    'KD-CLIENT-TOKEN': this.devToken
                }
            ).then(e => {
                if (e.statusCode() !== 200) reject('The request to update app failed for an unknown reason with status: ' + e.statusCode());

                resolve(JSON.parse(e.body()));
            }).catch(err => {
                reject(err);
            })
        })
    }

    /**
     * request Data with query
     *
     * @param {string} method
     * @param {string} query
     * @param {Record<string, unknown>} variables
     * @return {Promise<unknown>}
     */
    KakaoDevClient.prototype.requestData = function (method, query, variables) {
        if (this.devToken === undefined || !this.isLogin) throw new Error('You cannot access the KakaoLink API before logging in.');

        return new this.Promise((resolve, reject) => {
            this.client.request(
                'POST',
                '/_api/graphql',
                JSON.stringify({
                    operationName: method,
                    variables: Object.assign({}, variables),
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

    /**
     * get Developer Token (personal)
     *
     * @return {Promise<string>}
     */
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
                const data = JSON.parse(e.body().match(/SERVER_DATA = ([^]*);/)[1]);
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

    /**
     * get KDT Cookie
     *
     * @return {Promise<boolean>}
     */
    KakaoDevClient.prototype.getKdt = function () {
        if (!this.isLogin) throw new Error('You cannot access the KakaoLink API before logging in.');

        return new this.Promise((resolve, reject) => {
            this.client.request(
                'GET',
                '/login',
                {},
                {
                    Referer: 'https://accounts.kakao.com/',
                }
            ).then(e => {
                resolve(true);
            }).catch(err => {
                reject(err);
            })
        })
    }

    return KakaoDevClient;
})();