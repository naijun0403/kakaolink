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

import Jsoup = org.jsoup.Jsoup;
import { ResponseWrapper } from './response-wrapper';
import { PromiseLike } from '../asynchronous';

export class RequestClient {

    public cookies: java.util.LinkedHashMap<string, string> = new java.util.LinkedHashMap<string, string>();

    constructor(
        private readonly baseUrl: string,
    ) {
    }

    setCookies(cookies: Record<string, string>) {
        this.cookies = cookies as unknown as java.util.LinkedHashMap<string, string>;
    }

    toFullUrl(path: string): string {
        return this.baseUrl + path;
    }

    request(option: RequestOption): PromiseLike<ResponseWrapper> {
        return new PromiseLike<ResponseWrapper>((resolve, reject) => {
            const connection = this.toJsoupConnection(option);

            const response = connection.execute();
            const responseWrapper = new ResponseWrapper(response);

            this.cookies.putAll(response.cookies())

            resolve(responseWrapper);
        });
    }

    toJsoupConnection(option: RequestOption): org.jsoup.Connection {
        const connection = Jsoup.connect(this.toFullUrl(option.path))
            .method(org.jsoup.Connection.Method.valueOf(option.method))
            .headers(option.headers ?? {})
            .followRedirects(option.followRedirects ?? true)
            .ignoreContentType(true)
            .ignoreHttpErrors(true)
            .cookies(this.cookies)
            .maxBodySize(0);

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