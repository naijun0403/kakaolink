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

exports.KakaoLinkClient = /** @class */ (function () {
    function KakaoLinkClient() {
        this.cookies = null;
        this.client = new RequestClient('sharer.kakao.com')
        this.isLogin = false;
        this.apiKey = null;
        this.url = null;
        this.kakaoAgent = null;
    }

    /**
     * Login Client
     * @param cookies
     */
    KakaoLinkClient.prototype.login = function (cookies) {
        this.cookies = cookies;
        this.isLogin = true;
        this.apiKey = cookies.get('apiKey');
        this.url = cookies.get('url')
        cookies.remove('apiKey');
        cookies.remove('url');
        this.kakaoAgent = this.generateKakaoAgent(this.url);
        this.client.setCookies(cookies);
    }

    /**
     * Kakao Link Send
     * @param {String} room Room Name
     * @param {{ link_ver: '4.0', template_id: number | string, template_args: any, template_object: { button_title: string, object_type: 'feed' | 'list' | 'location' | 'commerce' | 'text',
     * content: { title: string, description: string, image_url: string, link: any }, social: { likeCount: number, commentCount: number, shareCount: number },
     * buttons: [{title: string, link: { web_url: string, moblie_web_url: string }}] } }} data Kakao Send Info
     * @param {'custom' | 'default'} type send Type
     */
    KakaoLinkClient.prototype.sendLink = function (room, data, type) {
        if (!this.isLogin) throw new Error('You cannot access the KakaoLink API before logging in.')
        if (!data.hasOwnProperty('link_ver')) data['link_ver'] = '4.0';

        if (!isExistsPromise()) {
            this.Promise = /** @type PromiseConstructor */ require('../polyfill/promise').Promise;
        } else {
            this.Promise = /** @type PromiseConstructor */ Promise;
        }

        return new this.Promise((resolve, reject) => {
            this.client.request(
                'POST',
                '/talk/friends/picker/link',
                {
                    app_key: this.apiKey,
                    validation_action: type || 'custom',
                    validation_params: JSON.stringify(data),
                    ka: this.kakaoAgent,
                    lcba: ''
                },
                {}
            ).then(e => {
                if (e.statusCode() === 401) reject('Please check the apiKey again');
                if (e.statusCode() !== 200) reject('An unknown error occurred while sending the message with status: ' + e.statusCode());

                const parsedData = e.parse();
                const csrfToken = String(parsedData.select('div').last().attr('ng-init').slice(7).replace("'", ''));
                const linkData = parsedData.select('#validatedTalkLink').attr('value');

                this.client.request(
                    'GET',
                    '/api/talk/chats',
                    {},
                    {
                        Referer: 'https://sharer.kakao.com/talk/friends/picker/link',
                        'Csrf-Token': csrfToken,
                        'App-Key': this.apiKey
                    }
                ).then(r => {
                    const roomData = /** @type {{chats: Array<{id:string;title:string;memberCount:number;}>}} */ JSON.parse(r.body());

                    let id = null, memberCount = null;
                    roomData['chats'].forEach(element => {
                        if (element.title === room) {
                            memberCount = element.memberCount;
                            id = element.id;
                            return false;
                        }
                    });

                    if (id === null || memberCount === null) reject('There is no room called "' + room + '", please check again');

                    this.client.request(
                        'POST',
                        '/api/talk/message/link',
                        JSON.stringify({
                            validatedTalkLink: JSON.parse(linkData),
                            securityKey: roomData['securityKey'],
                            receiverType: 'chat',
                            receiverIds: [id],
                            receiverChatRoomMemberCount: [memberCount]
                        }),
                        {
                            Referer: 'https://sharer.kakao.com/talk/friends/picker/link',
                            'App-Key': this.apiKey,
                            'Csrf-Token': csrfToken,
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    ).then(result => {
                        resolve(result)
                    }).catch(err => {
                        reject(err);
                    })
                }).catch(err => {
                    reject(err);
                })
            })
        });
    }

    /**
     * generate Kakao Agent
     * @param url
     * @return {string}
     * @private
     */
    KakaoLinkClient.prototype.generateKakaoAgent = function (url) {
        return 'sdk/1.25.7 os/javascript lang/ko-KR device/MacIntel origin/' + decodeURIComponent(url || 'https://arthic.dev');
    }

    return KakaoLinkClient;
})();