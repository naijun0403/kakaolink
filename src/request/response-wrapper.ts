export class ResponseWrapper {

    constructor(
        private response: org.jsoup.Connection.Response
    ) {
    }

    get body(): string {
        return this.response.body();
    }

    json<T>(): T {
        return JSON.parse(this.body) as T;
    }

    get statusCode(): number {
        return this.response.statusCode();
    }

    get statusMessage(): string {
        return this.response.statusMessage();
    }

    get headers(): Record<string, string> {
        return this.response.headers() as unknown as Record<string, string>;
    }

    get cookies(): Record<string, string> {
        return this.response.cookies() as unknown as Record<string, string>;
    }

    get url(): string {
        return this.response.url().toString();
    }

    parse(): org.jsoup.nodes.Document {
        return this.response.parse();
    }

}