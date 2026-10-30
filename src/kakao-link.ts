import { KakaoAuth } from './auth/login';
import { WebShareClient, type WebClientOptions } from './web/client';
import type { KakaoSession, LoginOptions } from './auth/types';
import {
    KakaoIntentClient, openIntent, type IntentClientOptions, type OpenIntentOptions, type IntentLaunchResult
} from './intent/kakao-intent-client';

export const KakaoLink = {
    async login(options: LoginOptions): Promise<KakaoSession> {
        return new KakaoAuth(options.configuration).login(options);
    },

    web(options: WebClientOptions): WebShareClient {
        return new WebShareClient(options);
    },

    intent(options: IntentClientOptions): KakaoIntentClient {
        return new KakaoIntentClient(options);
    },

    openIntent(options: OpenIntentOptions): IntentLaunchResult {
        return openIntent(options);
    }
};
