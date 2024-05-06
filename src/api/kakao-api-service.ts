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
import { NextData } from '../next';
import { TiaraFactory } from '../tiara';
import CryptoJS from '../modules/crypto-js';
import { Configuration, DefaultConfiguration } from '../config';
import { PromiseLike } from '../asynchronous';
import { CreateTokenResponse, PollTokenResponse } from './type';
import { openUri } from '../util/uri';

export class KakaoApiService {

    private constructor(private configuration: Configuration) {}

    private accountClient = new RequestClient('https://accounts.kakao.com');
    private tiaraClient = new RequestClient('https://stat.tiara.kakao.com');

    /**
     * **WARNING**: This method is not recommended to use.
     * please use `loginWithKakaotalk` instead.
     *
     * login and give cookies
     * @param form
     */
    login(form: LoginForm | LoginWithKakaotalkForm | LoginWithAccountForm): PromiseLike<Record<string, string>> {
        if (form.signInWithKakaoTalk) {
            return this.loginWithKakaotalk(form as LoginWithKakaotalkForm);
        } else {
            return this.loginWithAccount(form as LoginWithAccountForm);
        }
    }

    /**
     * login with kakaotalk
     * @param form
     */
    private loginWithKakaotalk(form: LoginWithKakaotalkForm): PromiseLike<Record<string, string>> {
        return new PromiseLike<Record<string, string>>((resolve, reject) => {
            const loginPage = this.accountClient.request({
                method: 'GET',
                path: '/login',
            }).awaitResult();

            const loginPageParsed = loginPage.parse();

            let nextData: NextData | null = null;
            for (const element of loginPageParsed.select('script').toArray() as org.jsoup.nodes.Element[]) {
                if (element.html().includes('__NEXT_DATA__')) {
                    nextData = JSON.parse(element.html().split('__NEXT_DATA__ = ')[1].split(';')[0]);
                    break;
                }
            }

            if (nextData === null) throw new Error('Cannot find __NEXT_DATA__ in login page');

            const csrf = nextData.props.pageProps.pageContext.commonContext._csrf;

            const createTokenRes = this.accountClient.request({
                method: 'POST',
                path: '/api/v2/login/web_talk/create_token.json',
                body: JSON.stringify({
                    _csrf: csrf,
                }),
                headers: {
                    Referer: loginPage.url,
                    'Content-Type': 'application/json',
                    Origin: 'https://accounts.kakao.com',
                }
            }).awaitResult();

            const createTokenData = createTokenRes.json<CreateTokenResponse>();

            if (createTokenData.status !== 0) {
                reject(`create token error: ${createTokenData.status}`);
            }

            const userUri = `https://m.search.daum.net/sl/sm/rck/m?ru=${encodeURI(createTokenData.talkLoginScheme)}`;

            openUri(userUri);

            const pollingInterval = form.pollingInterval ?? 1000;

            const id = setInterval(() => {
                const pollTokenRes = this.accountClient.request({
                    method: 'POST',
                    path: '/api/v2/login/web_talk/poll.json',
                    body: JSON.stringify({
                        _csrf: csrf,
                        token: createTokenData.token,
                        loginUrl: loginPage.url.split('accounts.kakao.com')[1],
                        activeSso: true,
                    }),
                    headers: {
                        Referer: loginPage.url,
                        'Content-Type': 'application/json',
                        Origin: 'https://accounts.kakao.com',
                    }
                }).awaitResult();

                const pollTokenData = pollTokenRes.json<PollTokenResponse>();

                switch (pollTokenData.status) {
                    case 0:
                        resolve(pollTokenRes.cookies);
                        clearInterval(id);
                        break;
                    case -420:
                        break;
                    default: {
                        reject(`poll token error: ${pollTokenData.status}`);
                        clearInterval(id);
                        break;
                    }
                }
            }, pollingInterval);
        });
    }

    /**
     * login with kakaotalk
     *
     * **WARNING**: This method is not recommended to use.
     * please use `loginWithKakaotalk` instead.
     * @param form
     * @private
     */
    private loginWithAccount(form: LoginWithAccountForm): PromiseLike<Record<string, string>> {
        return new PromiseLike<Record<string, string>>((resolve, reject) => {
            const loginPage = this.accountClient.request({
                method: 'GET',
                path: '/login',
            }).awaitResult();

            const loginPageParsed = loginPage.parse();

            let nextData: NextData | null = null;
            for (const element of loginPageParsed.select('script').toArray() as org.jsoup.nodes.Element[]) {
                if (element.html().includes('__NEXT_DATA__')) {
                    nextData = JSON.parse(element.html().split('__NEXT_DATA__ = ')[1].split(';')[0]);
                    break;
                }
            }

            if (nextData === null) throw new Error('Cannot find __NEXT_DATA__ in login page');

            const csrf = nextData.props.pageProps.pageContext.commonContext._csrf;
            const pValue = nextData.props.pageProps.pageContext.commonContext.p; // using crypto-js

            this.tiaraClient.request({
                method: 'GET',
                path: '/track',
                data: {
                    d: TiaraFactory.createTrackObject()
                }
            }).awaitResult(); // get tiara cookie

            const encryptedPassword = CryptoJS.lib.PasswordBasedCipher.encrypt(
                CryptoJS.algo.AES,
                CryptoJS.enc.Utf8.parse(form.password),
                pValue,
            )

            const loginResult = this.accountClient.request({
                method: 'POST',
                path: '/api/v2/login/authenticate.json',
                data: {
                    _csrf: csrf,
                    loginId: form.email,
                    password: encryptedPassword,
                    staySignedIn: form.staySignedIn ?? false,
                    saveSignedIn: form.saveSignedIn ?? false,
                    loginKey: form.email,
                    activeSso: true,
                    loginUrl: loginPage.url.split('accounts.kakao.com')[1],
                    k: true
                },
                headers: {
                    Referer: loginPage.url,
                }
            }).awaitResult();

            const loginResultParsed = loginResult.json<LoginResult>();

            switch (loginResultParsed.status) {
                case 0:
                    break;

                case -451:
                    reject('need to 2fa, but not supported yet');
                    break;

                case -450:
                    reject('invalid password');
                    break;

                default:
                    reject(`login error: ${loginResultParsed.status}`);
                    break;
            }

            return loginResult.cookies;
        });
    }

    static async createService(
        configuration: Partial<Configuration> = {}
    ): Promise<KakaoApiService> {
        return new KakaoApiService(
            Object.assign(DefaultConfiguration, configuration)
        );
    }

}

export interface LoginForm {
    signInWithKakaoTalk?: boolean; // default: true
}

export interface LoginWithKakaotalkForm extends LoginForm {
    signInWithKakaoTalk: true;

    pollingInterval?: number; // default: 1000
    pollingCount?: number; // default: 10
}

export interface LoginWithAccountForm extends LoginForm {
    signInWithKakaoTalk: false;

    email: string;
    password: string;
    staySignedIn?: boolean;
    saveSignedIn?: boolean;
}

export interface LoginResult {
    status: number;
}