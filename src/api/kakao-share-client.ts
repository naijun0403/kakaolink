import { RequestClient } from "../request";

export class KakaoShareClient {

    private sharerClient = new RequestClient('https://sharer.kakao.com');

    private isInited = false;
    private cookies: Record<string, string> = {};

    async init(cookies: Record<string, string>) {
        this.isInited = true;
        this.cookies = { ...cookies };
    }

    async sendLink() {

    }

    /**
     * compatibility with old version
     * @returns same with sendLink
     */
    async send() {
        return await this.sendLink();
    }

}