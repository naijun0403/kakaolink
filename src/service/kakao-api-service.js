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

const {RequestClient} = require("../request/request-client");
const {isExistsPromise} = require("../util/is-promise");
const {constants} = require("../config");
const {CryptoJS} = require("../crypto");
var { setTimeout } = require('../polyfill/timers');

exports.KakaoApiService = /** @class */ (function () {
    function KakaoApiService() {
        this.client = new RequestClient('accounts.kakao.com');
    }

    /**
     * login
     *
     * @param data {{email:string;password:string;keepLogin:boolean}}
     * @return {Promise<Object>}
     */
    KakaoApiService.prototype.login = function (data) {
        if (!data.hasOwnProperty('email') || !data.hasOwnProperty('password')) throw new Error('No email or password entered.');

        if (!data.hasOwnProperty('keepLogin')) data.keepLogin = true;

        if (!isExistsPromise()) {
            this.Promise = /** @type PromiseConstructor */ require('../polyfill/promise');
        } else {
            this.Promise = /** @type PromiseConstructor */ Promise;
        }

        return new this.Promise((resolve, reject) => {
            setTimeout(() => {
                this.client.request(
                    'GET',
                    '/login',
                    {
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
                            d: JSON.stringify(constants.tiaraData)
                        },
                        {
                            Referer: 'https://accounts.kakao.com/'
                        }
                    ).then(_ => {
                        const parsedData = e.parse();
                        const dataElement = parsedData.getElementById('__NEXT_DATA__');

                        let cryptoKey;
                        let isNextJS = !!dataElement;

                        if (!dataElement) {
                            cryptoKey = parsedData.select('input[name=p]').attr('value');
                            if (cryptoKey === '') reject('Cannot Get CryptoKey');
                        } else {
                            const nextData = JSON.parse(dataElement.data()).props.pageProps.pageContext.commonContext;

                            cryptoKey = nextData.p;
                        }

                        let csrfToken = isNextJS ? String(nextData._csrf) : String(parsedData.select('head > meta:nth-child(3)').attr('content'));

                        this.client.changeHost('accounts.kakao.com');
                        this.client.request(
                            'POST',
                            '/weblogin/authenticate.json',
                            {
                                os: 'web',
                                webview_v: '2',
                                email: CryptoJS.AES.encrypt(String(data.email), String(cryptoKey)).toString(),
                                password: CryptoJS.AES.encrypt(String(data.password), String(cryptoKey)).toString(),
                                stay_signed_in: data.keepLogin.toString(),
                                continue: decodeURIComponent(referer.split('=')[1]),
                                third: 'false',
                                k: 'true',
                                authenticity_token: csrfToken
                            },
                            {
                                Referer: referer
                            }
                        ).then(r => {
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
                        }).catch(reject)
                    }).catch(reject)
                }).catch(reject)
            }, 0);
        })
    }

    /**
     * get release version
     *
     * @return {string}
     */
    KakaoApiService.getReleaseVersion = function () {
        return "1.1.0-snapshot";
    }

    /**
     * create Service
     *
     * @return {KakaoApiService}
     */
    KakaoApiService.createService = function () {
        return new KakaoApiService();
    }

    return KakaoApiService;
})();