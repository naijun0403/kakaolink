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

const { TiaraFactory } = require("./tiara");

module.exports = {
    constants: {
        tiaraData: {
            sdk: {
                type: 'WEB',
                version: '1.1.23'
            },
            env: {
                screen: '1920X1080',
                tz: '+9',
                cke: 'Y'
            },
            common: {
                svcdomain: 'accounts.kakao.com',
                deployment: 'production',
                url: 'https://accounts.kakao.com/weblogin/account/info',
                referrer: 'https://logins.daum.net/',
                title: 'Kakao Account',
                section: 'manage',
                page: 'pageManage'
            },
            etc: {
                client_info: {
                    tuid: TiaraFactory.generateRandomUUIDWithDateTime(),
                    tsid: this.tuid,
                    uuid: TiaraFactory.generateRandomUUIDWithDateNumber(),
                    suid: this.suid,
                    isuid: TiaraFactory.generateRandomUUIDWithDateNumber(),
                    client_timestamp: Date.now()
                }
            },
            action: {
                type: 'Pageview',
                name: 'pageManage',
                kind: ''
            }
        }
    }
}