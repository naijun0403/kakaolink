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

const { CryptoJS } = require('../crypto');

/**
 * NextJS로 추후 이동시 삭제될 함수
 * @forRemoval
 * @param isNextJS { boolean }
 * @param form {{ email: string; password: string; keepLogin: boolean; }}
 * @param referer { string }
 * @param cryptoKey { string }
 * @param csrfToken { string }
 *
 * @return {{ method: string; path: string; data: Record<string, unknown> | string; headers: Record<string, string> }}
 */
function createAuthenticateRequestForm(isNextJS, form, referer, cryptoKey, csrfToken) {
    if (isNextJS) {
        return {
            method: 'POST',
            path: '/api/v2/login/authenticate.json',
            data: JSON.stringify({
                _csrf: csrfToken,
                activeSso: true,
                loginKey: form.email,
                loginUrl: String(referer),
                password: CryptoJS.AES.encrypt(String(form.password), String(cryptoKey)).toString(),
                staySignedIn: form.keepLogin
            }),
            headers: {
                Referer: referer,
                'Content-Type': 'application/json'
            }
        }
    } else {
        return {
            method: 'POST',
            path: '/weblogin/authenticate.json',
            data: {
                os: 'web',
                webview_v: '2',
                email: CryptoJS.AES.encrypt(String(form.email), String(cryptoKey)).toString(),
                password: CryptoJS.AES.encrypt(String(form.password), String(cryptoKey)).toString(),
                stay_signed_in: form.keepLogin.toString(),
                continue: decodeURIComponent(referer.split('continue=')[1]),
                third: 'false',
                sdk: 'false',
                k: 'true',
                authenticity_token: csrfToken
            },
            headers: {
                Referer: referer
            }
        }
    }
}

exports.createAuthenticateRequestForm = createAuthenticateRequestForm;