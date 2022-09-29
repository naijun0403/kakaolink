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

const { RequestClient } = require('../request/request-client');
const { isExistsPromise } = require('../util/is-promise');
var { setTimeout } = require('../polyfill/timers');
const { Base64 } = require('../util/base64');

exports.KakaoLinkClient = /** @class */ (function () {
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
        const { KakaoApiService } = require("../service/kakao-api-service");
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
            this.Promise = /** @type PromiseConstructor */ require('../polyfill/promise');
        } else {
            this.Promise = /** @type PromiseConstructor */ Promise;
        }

        return new this.Promise((resolve, reject) => {
            setTimeout(() => {
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

                    const serverData = Base64.decode(encodedServerData);

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

                    const receiver = Base64.encode(
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
                        {}
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
     * generate Kakao Agent
     *
     * @param {string} url
     * @return {string}
     * @private
     */
    KakaoLinkClient.prototype.generateKakaoAgent = function (url) {
        return 'sdk/2.0.0 os/javascript sdk type/javascript lang/ko device/Win32 origin/' + decodeURIComponent(url || 'https://arthic.dev');
    }

    return KakaoLinkClient;
})();