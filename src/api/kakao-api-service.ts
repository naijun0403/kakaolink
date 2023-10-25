import { RequestClient } from '../request';
import { NextData } from '../next';
import { TiaraFactory } from '../tiara';
import CryptoJS from '../modules/crypto-js';

export class KakaoApiService {

    private accountClient = new RequestClient('https://accounts.kakao.com');
    private tiaraClient = new RequestClient('https://stat.tiara.kakao.com');

    /**
     * login and give cookies
     * @param form
     */
    async login(form: LoginForm): Promise<Record<string, string>> {
        const loginPage = await this.accountClient.request({
            method: 'GET',
            path: '/login',
        });

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

        await this.tiaraClient.request({
            method: 'GET',
            path: '/track',
            data: {
                d: TiaraFactory.createTrackObject()
            }
        }); // get tiara cookie

        const encryptedPassword = CryptoJS.lib.PasswordBasedCipher.encrypt(
            CryptoJS.algo.AES,
            CryptoJS.enc.Utf8.parse(form.password),
            pValue,
        )

        const loginResult = await this.accountClient.request({
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
        });

        const loginResultParsed = loginResult.json<LoginResult>();

        switch (loginResultParsed.status) {
            case 0:
                break;

            case -451:
                throw new Error('need to 2fa, but not supported yet');

            case -450:
                throw new Error('invalid password');

            default:
                throw new Error(`login error: ${loginResultParsed.status}`);
        }

        return loginResult.cookies;
    }

    static async createService(): Promise<KakaoApiService> {
        return new KakaoApiService();
    }

}

export interface LoginForm {
    email: string;
    password: string;
    staySignedIn?: boolean;
    saveSignedIn?: boolean;
}

export interface LoginResult {
    status: number;
}