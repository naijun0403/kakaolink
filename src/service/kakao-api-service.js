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

exports.KakaoApiService = /** @class */ (function () {

    const {FileLogger} = require('../logger/file-logger');
    const {RequestClient} = require('../request/request-client');
    const {isExistsPromise} = require('../util/is-promise');
    const {constants} = require('../config');
    var {setTimeout} = require('../polyfill/timers');
    var Timer = require('../polyfill/interval');
    var clearInterval = Timer.clearInterval;
    var setInterval = Timer.setInterval;

    const {createAuthenticateRequestForm} = require('./authenticate-builder');
    const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0'
    const DEFAULT_HEADER = {
        "User-Agent": USER_AGENT,
        "Content-Type": "application/json",
        "Referer": 'https://accounts.kakao.com/',
        "Host": "accounts.kakao.com",
        "Origin": "https://accounts.kakao.com/"
    };

    function KakaoApiService() {
        this.is2FA = false;
        this.client = new RequestClient('accounts.kakao.com');
        this.timerID = null;
        if (!isExistsPromise()) {
            this.Promise = /** @type PromiseConstructor */ require('../polyfill/promise');
        } else {
            this.Promise = /** @type PromiseConstructor */ Promise;
        }


        this.LOGGER = new FileLogger('api-service');
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

        this.LOGGER.debug('called login function');

        return new this.Promise((resolve, reject) => {
            setTimeout(() => {
                this.client.request('GET', '/login', {
                    app_type: 'web', continue: 'https://accounts.kakao.com/weblogin/account/info'
                }, {
                    Referer: 'https://accounts.kakao.com/', 'Upgrade-Insecure-Requests': '1'
                }).then(e => {
                    this.LOGGER.debug('/login request finished: ' + e.statusCode());

                    if (e.statusCode() !== 200) reject('For an unknown reason, the information required to log in could not be retrieved with status: ' + e.statusCode());

                    let referer = e.url().toExternalForm();

                    this.LOGGER.debug('referer: ' + String(referer));

                    this.client.changeHost('stat.tiara.kakao.com')

                    this.client.request('GET', '/track', {
                        d: JSON.stringify(constants.tiaraData)
                    }, {
                        Referer: 'https://accounts.kakao.com/'
                    }).then(_ => {
                        const parsedData = e.parse();
                        const dataElement = parsedData.getElementById('__NEXT_DATA__');

                        let isNextJS = !!dataElement;

                        this.LOGGER.debug('isNextJS: ' + isNextJS);
                        this.LOGGER.debug('NEXT_DATA: ' + dataElement.data());

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
                            this.LOGGER.debug('auth request finished: ' + r.statusCode());

                            if (r.statusCode() !== 200) reject('An error occurred while loading authenticate.json with status: ' + r.statusCode());

                            const loginRes = JSON.parse(r.body());

                            this.LOGGER.debug('loginRes: ' + JSON.stringify(loginRes));

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
                                case -451:
                                    this.is2FA = true;
                                    this.client.request("POST", "/api/v2/two_step_verification/send_tms_for_login.json", JSON.stringify({"_csrf": csrfToken}), DEFAULT_HEADER, true).then((tmsResult) => {
                                        let token = JSON.parse(tmsResult.body()).token;
                                        let counter = 0;
                                        if (this.timerID !== null) {
                                            try {
                                                clearInterval(this.timerID)
                                            } catch (e) {
                                            }
                                        }
                                        this.timerID = setInterval(() => {
                                            if (counter === 40) {
                                                clearInterval(this.timerID)
                                                reject("2FA is not valid")
                                                return;
                                            }
                                            counter++;
                                            this.client.request("POST", "/api/v2/two_step_verification/verify_tms_for_login.json", JSON.stringify({
                                                "_csrf": csrfToken, "token": token, "isRememberBrowser": true
                                            }), DEFAULT_HEADER, true)
                                                .then((verifyTMS) => {
                                                    const finalResult = JSON.parse(verifyTMS.body()).status;
                                                    if (finalResult.status === -451) {
                                                        return;
                                                    } else if (finalResult.status !== 0) {
                                                        reject("2FA is not valid. Please try it again");
                                                    }
                                                    this.client.request("POST", "/api/v2/two_step_verification/expire_tms_for_login.json", JSON.stringify({
                                                        "_csrf": csrfToken, "token": token
                                                    }), DEFAULT_HEADER)
                                                        .then((afterRemoveRes) => {
                                                            clearInterval(this.timerID);
                                                            resolve(this.client.getCookies())
                                                        });

                                                }).catch(reject)

                                        }, 2500)


                                    }).catch(reject);
                                    break;
                                case -481:
                                    reject("Captcha Detected")
                                    break;
                                default:
                                    reject('An unknown error occurred during login with status: ' + loginRes['status']);
                                    break;
                            }
                            if (!this.is2FA) {
                                let cookies = this.client.getCookies();
                                resolve(cookies);
                            }
                        }).catch(reject);
                    }).catch(reject)
                }).catch(reject)
            }, 0);
        });
    }

    /**
     * 2FA
     * @param {{ email: string; password: string; permanent: boolean; }} data
     */
    KakaoApiService.prototype.twoFA = function (data) {

    }

    /**
     * get release version
     *
     * @return { string }
     */
    KakaoApiService.getReleaseVersion = function () {
        return "1.2.0-snapshot";
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
