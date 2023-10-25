export namespace CookieParser {
    
    export function parse(rawString: string): Record<string, string> {
        const cookies: Record<string, string> = {};
        for (const cookie of rawString.split('; ')) {
            const [key, value] = cookie.split('=');
            cookies[key] = value;
        }
        return cookies;
    }

}