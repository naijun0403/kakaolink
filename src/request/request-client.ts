import Jsoup = org.jsoup.Jsoup;
import { ResponseWrapper } from './response-wrapper';

export class RequestClient {

    public cookies: Record<string, string> = {};

    constructor(
        private readonly baseUrl: string,
    ) {
    }

    toFullUrl(path: string): string {
        return this.baseUrl + path;
    }

    async request(option: RequestOption): Promise<ResponseWrapper> {
        const connection = this.toJsoupConnection(option);
        const response = connection.execute();
        return new ResponseWrapper(response);
    }

    toJsoupConnection(option: RequestOption): org.jsoup.Connection {
        const connection = Jsoup.connect(this.toFullUrl(option.path))
            .method(org.jsoup.Connection.Method.valueOf(option.method))
            .headers(option.headers ?? {})
            .followRedirects(option.followRedirects ?? true)
            .ignoreContentType(true)
            .ignoreHttpErrors(true)
            .cookies(this.cookies);

        if (option.data) {
            connection.data(option.data);
        } else if (option.body) {
            connection.requestBody(JSON.stringify(option.body));
        }

        return connection;
    }

}

export interface RequestOption {
    method: string;
    path: string;
    headers?: Record<string, string>;
    data?: Record<string, unknown> | string; // if method get, data is query string
    body?: Record<string, unknown> | string;
    followRedirects?: boolean;
}

export type Method = 'GET' | 'POST'; // other methods are not supported yet