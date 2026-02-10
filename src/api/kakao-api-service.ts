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

import { RequestClient } from '../request/index';
import { NextData } from '../next/index';
import { Configuration, DefaultConfiguration } from '../config';
import { CreateTokenResponse, PollTokenResponse } from './type';
import { openUri } from '../util/index';
import { TiaraFactory } from '../tiara/index';

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

    async login(form: LoginForm): Promise<Record<string, string>> {
        if (form.signInWithKakaoTalk) {
            return await this.loginWithKakaotalk(form as LoginWithKakaotalkForm);
        } else {
            return await this.loginWithAccount(form as LoginWithAccountForm);
        }
    }

    /**
     * login with kakaotalk
     * @param form
     */
    private async loginWithKakaotalk(form: LoginWithKakaotalkForm): Promise<Record<string, string>> {
        const loginPage = await this.accountClient.request({
            method: 'GET',
            path: '/weblogin/account/info',
            headers: {
                'User-Agent': this.configuration.defaultUserAgent
            },
            followRedirects: true
        });

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

        const tiaraRes = await this.tiaraClient.request({
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
        });

        this.accountClient.cookies.putAll(tiaraRes.javaCookies)

        const createTokenRes = await this.accountClient.request({
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
        });

        const createTokenData = createTokenRes.json<CreateTokenResponse>();

        if (createTokenData.status !== 0) {
            throw new Error(`create token error: ${createTokenData.status}`);
        }

        const userUri = `https://m.search.daum.net/sl/sm/rck/m?ru=${encodeURI(createTokenData.talkLoginScheme)}`;

        openUri(form.context, userUri);

        const maxPollingCount = form.pollingCount ?? 10;
        const pollingInterval = form.pollingInterval ?? 1000;

        let pollingCount = 0;

        while (pollingCount < maxPollingCount) {
            await new Promise(resolve => setTimeout(resolve, pollingInterval));

            const pollTokenRes = await this.accountClient.request({
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
            });

            const pollTokenData = pollTokenRes.json<PollTokenResponse>();

            switch (pollTokenData.status) {
                case 0: {
                    const resultCookies = new java.util.LinkedHashMap<string, string>();

                    resultCookies.putAll(this.accountClient.cookies);
                    resultCookies.putAll(pollTokenRes.javaCookies);

                    return resultCookies as unknown as Record<string, string>;
                }
                case -420:
                    pollingCount++;
                    if (pollingCount === maxPollingCount) {
                        throw new Error(`poll token error: ${pollTokenData.status}`);
                    }
                    break;
                default:
                    throw new Error(`poll token error: ${pollTokenData.status}`);
            }
        }

        throw new Error('Polling timeout: maximum polling count reached');
    }

    /**
     * login with kakaotalk
     *
     * **WARNING**: This method is not recommended to use.
     * please use `loginWithKakaotalk` instead.
     * @param form
     * @private
     */
    private async loginWithAccount(form: LoginWithAccountForm): Promise<Record<string, string>> {
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