import { RequestClient } from '../request';
import { NextData } from '../next';
import { TiaraFactory } from '../tiara';

export class KakaoApiService {

    private sharerClient = new RequestClient('https://sharer.kakao.com');
    private accountClient = new RequestClient('https://accounts.kakao.com');
    private tiaraClient = new RequestClient('https://stat.tiara.kakao.com');

    async login(form: LoginForm) {
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

        await this.tiaraClient.request({
            method: 'GET',
            path: '/track',
            data: {
                d: TiaraFactory.createTrackObject()
            }
        }); // get tiara cookie
    }

    static async createService(): Promise<KakaoApiService> {
        return new KakaoApiService();
    }

}

export interface LoginForm {
    email: string;
    password: string;
}