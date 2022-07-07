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

const { KakaoApiService, KakaoLinkClient, KakaoDevClient} = require('../index')

const Kakao = new KakaoLinkClient();
const DevClient = new KakaoDevClient();

KakaoApiService.createService().login({
    email: 'email',
    password: 'password',
    keepLogin: true,
}).then(e => {
    DevClient.login(e);
    DevClient.getAppList().then(r => {
        Kakao.login(e, {
            apiKey: r[0]['app']['app_key']['JAVASCRIPT_KEY'],
            url: r[0]['app']['web']['web_site_url'][0]
        });
    })
}).catch(e => {
    Log.e(e);
});

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if(msg === '!카카오링크') {
        Kakao.sendLink('roomName', {
            template_id: 12345,
            template_args: {

            }
        }, 'custom').then(e => {
            replier.reply('카링 보내기 성공!')
        }).catch(e => {
            replier.reply(e);
        })
    }
}