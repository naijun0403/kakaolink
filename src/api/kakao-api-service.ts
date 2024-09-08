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
import { Configuration, DefaultConfiguration } from '../config';
import { PromiseLike } from '../asynchronous';
import { CreateTokenResponse, PollTokenResponse } from './type';
import { openUri, Timers } from '../util';
import { TiaraFactory } from '../tiara';

export class KakaoApiService {

    private accountClient = new RequestClient('https://accounts.kakao.com');
    private tiaraClient = new RequestClient('https://stat.tiara.kakao.com');

    private constructor(private configuration: Configuration) {
    }

    static createService(
        configuration: Partial<Configuration> = {}
    ): KakaoApiService {
        return new KakaoApiService(
            Object.assign(DefaultConfiguration, configuration)
        );
    }

    login(form: LoginForm): PromiseLike<Record<string, string>> {
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
                path: '/weblogin/account/info',
                headers: {
                    'User-Agent': this.configuration.defaultUserAgent
                },
                followRedirects: true
            }).awaitResult();

            const loginPageParsed = loginPage.parse();

            let nextData: NextData | null = null;
            for (const element of loginPageParsed.select('script').toArray() as org.jsoup.nodes.Element[]) {
                if (String(element.toString()).includes('__NEXT_DATA__')) {
                    nextData = JSON.parse(element.data());
                    break;
                }
            }

            if (nextData === null) throw new Error('Cannot find __NEXT_DATA__ in login page');

            const csrf = nextData.props.pageProps.pageContext.commonContext._csrf;

            this.tiaraClient.cookies.putAll(this.accountClient.cookies)

            const tiaraRes = this.tiaraClient.request({
                method: 'GET',
                path: '/track',
                data: {
                    d: encodeURIComponent(
                        JSON.stringify(TiaraFactory.createTrackObject())
                    )
                },
                headers: {
                    'User-Agent': this.configuration.defaultUserAgent,
                    Referer: 'https://accounts.kakao.com/'
                }
            }).awaitResult()

            this.accountClient.cookies.putAll(tiaraRes.javaCookies)

            const createTokenRes = this.accountClient.request({
                method: 'POST',
                path: '/api/v2/login/web_talk/create_token.json',
                body: {
                    _csrf: csrf,
                },
                headers: {
                    'User-Agent': this.configuration.defaultUserAgent,
                    Referer: loginPage.url,
                    'Content-Type': 'application/json',
                    Origin: 'https://accounts.kakao.com',
                }
            }).awaitResult();

            const createTokenData = createTokenRes.json<CreateTokenResponse>();

            if (createTokenData.status !== 0) {
                reject(`create token error: ${createTokenData.status}`);
                return;
            }

            const userUri = `https://m.search.daum.net/sl/sm/rck/m?ru=${encodeURI(createTokenData.talkLoginScheme)}`;

            openUri(form.context, userUri);

            const maxPollingCount = form.pollingCount ?? 10;
            const pollingInterval = form.pollingInterval ?? 1000;

            let pollingCount = 0;

            const id = Timers.setInterval(() => {
                const pollTokenRes = this.accountClient.request({
                    method: 'POST',
                    path: '/api/v2/login/web_talk/poll.json',
                    body: {
                        _csrf: csrf,
                        token: createTokenData.token,
                        loginUrl: '/login?continue=https%3A%2F%2Faccounts.kakao.com%2Fweblogin%2Faccount%2Finfo',
                        activeSso: true,
                    },
                    headers: {
                        Referer: loginPage.url,
                        'User-Agent': this.configuration.defaultUserAgent,
                        'Content-Type': 'application/json',
                        Origin: 'https://accounts.kakao.com',
                    }
                }).awaitResult();

                const pollTokenData = pollTokenRes.json<PollTokenResponse>();

                switch (pollTokenData.status) {
                    case 0:
                        const resultCookies = new java.util.LinkedHashMap<string, string>();

                        resultCookies.putAll(this.accountClient.cookies)
                        resultCookies.putAll(pollTokenRes.javaCookies);

                        resolve(resultCookies as unknown as Record<string, string>);

                        Timers.clearInterval(id);
                        break;
                    case -420:
                        if (++pollingCount === maxPollingCount) {
                            reject(`poll token error: ${pollTokenData.status}`);

                            Timers.clearInterval(id);
                        }
                        break;
                    default: {
                        reject(`poll token error: ${pollTokenData.status}`);

                        Timers.clearInterval(id);
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
        throw new Error('Sorry, this feature not implemented yet');
    }

}

export type LoginForm = LoginWithKakaotalkForm | LoginWithAccountForm;

export interface LoginFormRoot {
    signInWithKakaoTalk?: boolean; // default: true
    context: android.content.Context;
}

export interface LoginWithKakaotalkForm extends LoginFormRoot {
    signInWithKakaoTalk: true;

    pollingInterval?: number; // default: 1000
    pollingCount?: number; // default: 10
}

export interface LoginWithAccountForm extends LoginFormRoot {
    signInWithKakaoTalk: false;

    email: string;
    password: string;
    staySignedIn?: boolean;
    saveSignedIn?: boolean;
}

export interface LoginResult {
    status: number;
}