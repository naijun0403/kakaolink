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

import { TrackObject } from './index';

export const TiaraSeeds = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
    'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z'
];

export namespace TiaraFactory {

    export function generateRandomUUIDWithDateTime(): string {
        const builder = ['w-'];

        builder.push(shortenID(12));
        builder.push('_');
        builder.push(currentTimeStamp());

        return builder.join('');
    }

    export function generateRandomUUIDWithDateNumber(): string {
        const builder = ['w-'];

        builder.push(shortenID(12));
        builder.push('_');
        builder.push(currentTimeStamp().substring(0, 6));
        builder.push(randomNumericString(9));

        return builder.join('');
    }

    export function currentTimeStamp(): string {
        const time = new Date();
        time.setHours(time.getHours() + 9);
        return time.toISOString().replace(/[TZ\-:.]/g, '').substring(2)
    }

    export function randomNumericString(length: number): string {
        let element = [];
        for (let i = 0; i < length; i++) {
            element.push(Math.floor(Math.random() * 10));
        }
        return element.join('');
    }

    export function shortenID(id: number) {
        let element = [];
        for (let i = 0; i < id; i++) {
            element.push(
                TiaraSeeds[Math.floor(Math.random() * TiaraSeeds.length)]
            );
        }
        return element.join('');
    }

    export function createTrackObject(): TrackObject {
        const tuid = generateRandomUUIDWithDateTime();
        const uuid = generateRandomUUIDWithDateNumber();

        return {
            sdk: {
                type: 'WEB',
                version: '1.1.31'
            },
            env: {
                screen: '2560X1440',
                tz: '+9',
                cke: 'Y',
                uadata: {
                    fullVersionList: [],
                    mobile: true,
                    model: 'SM-S908B',
                    platform: 'Android',
                    platformVersion: '13'
                }
            },
            common: {
                svcdomain: 'accounts.kakao.com',
                deployment: 'production',
                url: 'https://accounts.kakao.com/login/',
                referrer: 'https://accounts.kakao.com/',
                section: 'login',
                page: 'page-web-talk-login'
            },
            etc: {
                client_info: {
                    tuid,
                    tsid: tuid,
                    uuid,
                    suid: uuid,
                    isuid: generateRandomUUIDWithDateNumber(),
                    client_timestamp: Date.now()
                }
            },
            action: {
                type: 'Pageview',
                name: 'page-web-talk-login',
                kind: ''
            }
        }
    }

}