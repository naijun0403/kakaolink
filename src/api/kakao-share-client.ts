/*
 * MIT License
 *
 * Copyright (c) 2024 naijun0403
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

import { RequestClient, ResponseWrapper } from '../request';
import { PromiseLike } from '../asynchronous';
import { SendType, Template, transformToRawTemplate } from '../template';
import { Configuration, DefaultConfiguration } from '../config';
import { generateKakaoAgent } from '../agent';
import { Base64 } from '../util';
import { ServerData } from '../model';

export class KakaoShareClient {

    private sharerClient = new RequestClient('https://sharer.kakao.com');
    private isInited = false;
    private appKey: string | null = null;
    private domain: string | null = null;

    private constructor(private configuration: Configuration) {
    }

    static createClient(
        configuration: Partial<Configuration> = {}
    ): KakaoShareClient {
        return new KakaoShareClient(
            Object.assign(DefaultConfiguration, configuration)
        )
    }

    /**
     * init KakaoShareClient
     * @param appKey js key
     * @param domain web platform registered domain
     * @param cookies login cookies
     */
    init(appKey: string, domain: string, cookies: Record<string, string>) {
        this.isInited = true;
        this.appKey = appKey;
        this.domain = domain;
        this.sharerClient.setCookies(cookies);
    }

    sendLink(room: string, template: Template, type: SendType = 'default'): PromiseLike<ResponseWrapper> {
        return new PromiseLike<ResponseWrapper>((resolve, reject) => {
            if (!this.isInited) {
                reject('KakaoShareClient is not initialized');
                return;
            }

            const linkRes = this.sharerClient.request({
                method: 'POST',
                path: '/picker/link',
                data: {
                    app_key: this.appKey,
                    ka: generateKakaoAgent(this.configuration, this.domain!),
                    validation_action: type,
                    validation_params: JSON.stringify(transformToRawTemplate(type, template))
                },
                headers: {
                    'User-Agent': this.configuration.defaultUserAgent
                },
                followRedirects: true
            }).awaitResult();

            if (linkRes.statusCode === 401) {
                reject('please check app key again');
                return;
            }

            if (linkRes.statusCode !== 200) {
                reject(`An unknown error occurred while sending the message; error code: ${linkRes.statusCode}`);
                return;
            }

            const serverDataMatched = linkRes.body.match(/serverData = "(.*)"/);

            if (serverDataMatched === null) {
                reject('Expected to have serverData, but didn\'t.');
                return;
            }

            const serverData = JSON.parse(Base64.decode(serverDataMatched[1])) as ServerData;

            let channelData = serverData.data.chats.find(e => e.title === room);

            if (!channelData) {
                reject(`Room "${room}" doesn't exist, please check again`);
                return;
            }

            const receiver = Base64.encode(
                JSON.stringify(channelData)
            );

            return this.sharerClient.request({
                method: 'POST',
                path: '/picker/send',
                data: {
                    app_key: this.appKey,
                    short_key: serverData.data.shortKey,
                    _csrf: serverData.data.csrfToken,
                    checksum: serverData.data.checksum,
                    receiver: receiver
                },
                headers: {
                    'User-Agent': this.configuration.defaultUserAgent,
                },
                followRedirects: true
            }).awaitResult()
        });
    }

    clear() {
        this.isInited = false;
        this.sharerClient.cookies = new java.util.LinkedHashMap<string, string>();
    }

}