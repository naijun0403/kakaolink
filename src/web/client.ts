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

import { RequestClient } from '../request';
import { transformToRawTemplate } from '../template';
import type { CustomTemplate } from '../template/custom-template';
import type { KakaoSession } from '../auth/types';
import { Configuration, DefaultConfiguration } from '../config';
import { generateKakaoAgent } from '../agent';
import { Base64 } from '../util';
import { ServerData } from '../model';

export interface WebClientOptions {
    jsAppKey: string;
    origin: string;
    session: KakaoSession;
    configuration?: Partial<Configuration>;
}

export interface WebSendRequest extends CustomTemplate {
    room: string;
}

export interface WebSendResult {
    transport: 'web';
    status: 'submitted';
}

export class WebShareClient {

    private sharerClient = new RequestClient('https://sharer.kakao.com');
    private readonly configuration: Configuration;
    private readonly appKey: string;
    private readonly domain: string;

    constructor(options: WebClientOptions) {
        if (typeof options.jsAppKey !== 'string' || !options.jsAppKey.trim()) {
            throw new TypeError('jsAppKey is required');
        }
        if (typeof options.origin !== 'string' || !/^https?:\/\/[^/?#\s]+\/?$/.test(options.origin)) {
            throw new TypeError('origin must be an HTTP or HTTPS origin');
        }
        if (!options.session || typeof options.session.cookies !== 'object'
            || options.session.cookies === null || Array.isArray(options.session.cookies)) {
            throw new TypeError('A login session is required for web sharing');
        }
        this.configuration = { ...DefaultConfiguration, ...options.configuration };
        this.appKey = options.jsAppKey;
        this.domain = options.origin;
        this.sharerClient.setCookies(options.session.cookies);
    }

    async sendTemplate(request: WebSendRequest): Promise<WebSendResult> {
        if (typeof request.room !== 'string' || !request.room.trim()) {
            throw new TypeError('room is required for web sharing');
        }
        const template = transformToRawTemplate(request);

        const linkRes = await this.sharerClient.request({
            method: 'POST',
            path: '/picker/link',
            data: {
                app_key: this.appKey,
                ka: generateKakaoAgent(this.configuration, this.domain),
                validation_action: 'custom',
                validation_params: JSON.stringify(template)
            },
            headers: {
                'User-Agent': this.configuration.defaultUserAgent
            },
            followRedirects: true
        });

        if (linkRes.statusCode === 401) {
            throw new Error('please check app key again');
        }

        if (linkRes.statusCode !== 200) {
            throw new Error(`An unknown error occurred while sending the message; error code: ${linkRes.statusCode}`);
        }

        const serverDataMatched = linkRes.body.match(/serverData = "(.*)"/);

        if (serverDataMatched === null) {
            throw new Error(`Expected to have serverData, but didn't.\n\nstatus: ${linkRes.statusCode}\n${linkRes.body}`);
        }

        const serverData = JSON.parse(Base64.decode(serverDataMatched[1])) as ServerData;

        const channelData = serverData.data.chats.find(e => e.title === request.room);

        if (!channelData) {
            throw new Error(`Room "${request.room}" doesn't exist, please check again`);
        }

        const receiver = Base64.encode(
            JSON.stringify(channelData)
        );

        const response = await this.sharerClient.request({
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
        });
        if (response.statusCode < 200 || response.statusCode >= 300) {
            throw new Error(`Share submission failed: HTTP ${response.statusCode}`);
        }
        return { transport: 'web', status: 'submitted' };
    }

}
