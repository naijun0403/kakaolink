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
const {isNullOrUndefined} = require("../util/is-null-or-undefined");
const { setTimeout } = require('../polyfill/timers');

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
            this.getDeveloperData().then(e => {
                this.devToken = e.devToken;
                this.devId = e.devId;
            }).catch(err => {
                throw new Error(err);
            })
        });
    }

    /**
     * get AppList
     *
     * @return {Promise<Array<{app_id:number;app:{app_key:{JAVASCRIPT_KEY: string};icon:string;platform:{web:{web_site_url:string[]}}}}>>}
     */
    KakaoDevClient.prototype.getAppList = function () {
        if (this.devToken === undefined || !this.isLogin) throw new Error('You cannot access the KakaoDev API before logging in.');

        return new this.Promise((resolve, reject) => {
            setTimeout(() => {
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
     * @param {number?} index
     *
     * @return {Promise<{ appId: number; appKey: string; webUrl: string[] }>}
     */
    KakaoDevClient.prototype.getAppSimpleList = function (index) {
        if (index === undefined) index = 0;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.getAppList().then((e) => {
                    const obj = e[0];

                    resolve({ appId: obj.app_id, appKey: obj.app.app_key.JAVASCRIPT_KEY, webUrl: obj.app.platform.web.web_site_url });
                })
            }, 0)
        })
    }

    KakaoDevClient.prototype.getAuthKey = function (appId) {
        if (this.devToken === undefined || !this.isLogin) throw new Error('You cannot access the KakaoDev API before logging in.');

        return new this.Promise((resolve, reject) => {
            setTimeout(() => {
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
     * @param {{name: string; company: string}} obj 
     * @returns {Promise<Record<string, unknown>>}
     */
    KakaoDevClient.prototype.createApp = function (obj) {
        if (!obj.hasOwnProperty('name') || !obj.hasOwnProperty('company')) throw new Error('No name or company entered.');

        return new this.Promise((resolve, reject) => {
            setTimeout(() => {
                let data = { name: 'CREATE_WITH_DEFAULT' };
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
     * @param {number} appId
     * @param {string[]} urls
     * @returns {Promise<Record<string, unknown>>}
     */
     KakaoDevClient.prototype.updateWebUrls = function (appId, urls) {
        urls = urls || [];

        return new this.Promise((resolve, reject) => {
            setTimeout(() => {
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
     * @param {number} appId
     * @param {{name: string; company: string}} obj
     * @return {Promise<Record<string, unknown>>}
     */
    KakaoDevClient.prototype.updateApp = function (appId, obj) {
        if (!obj.hasOwnProperty('name') || !obj.hasOwnProperty('company')) throw new Error('No name or company entered.');

        return new this.Promise((resolve, reject) => {
            setTimeout(() => {
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
     * request Data with query (graphql)
     *
     * @param {string} method
     * @param {string} query
     * @param {Record<string, unknown>} variables
     * @return {Promise<unknown>}
     */
    KakaoDevClient.prototype.requestData = function (method, query, variables) {
        if (this.devToken === undefined || !this.isLogin) throw new Error('You cannot access the KakaoDev API before logging in.');

        return new this.Promise((resolve, reject) => {
            setTimeout(() => {
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
                    if (e.statusCode() === 500) {
                        reject(JSON.parse(e.body())['message'])
                    }
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
     * @return {Promise<{devToken: string; devId: string}>}
     */
    KakaoDevClient.prototype.getDeveloperData = function () {
        if (!this.isLogin) throw new Error('You cannot access the KakaoDev API before logging in.');

        return new this.Promise((resolve, reject) => {
            setTimeout(() => {
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
     * @return {Promise<boolean>}
     */
    KakaoDevClient.prototype.getKdt = function () {
        if (!this.isLogin) throw new Error('You cannot access the KakaoDev API before logging in.');

        return new this.Promise((resolve, reject) => {
            setTimeout(() => {
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
            }, 0)
        })
    }

    /**
     * upload image
     * Kakao SDK
     *
     * @param image
     */
    KakaoDevClient.prototype.uploadImage = function (image) {
        this.getAppList().then(e => {
            let apiKey = e[0]['app']['app_key']['JAVASCRIPT_KEY']
            let authData = `KakaoAK ${apiKey}`;
        })
    }

    return KakaoDevClient;
})();