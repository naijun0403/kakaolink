import type { Configuration } from '../config';

export interface KakaoSession {
    readonly cookies: Readonly<Record<string, string>>;
}

export interface LoginOptions {
    method: 'kakaotalk';
    context: Packages.android.content.Context;
    polling?: {
        intervalMs?: number;
        maxAttempts?: number;
    };
    configuration?: Partial<Configuration>;
}
