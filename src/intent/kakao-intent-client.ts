import { DefaultConfiguration, type Configuration } from '../config';
import { normalizeCustomTemplate, type CustomTemplate } from '../template/custom-template';
import { launchKakaoLink } from './android';
import { readNativeAppInfo } from './app-info';
import { normalizeChatId } from './chat-id';
import { createKakaoLinkUri, validateKakaoLinkUri } from './payload';
import { validateNativeTemplate } from './template-validator';

export interface IntentClientOptions {
    context: Packages.android.content.Context;
    nativeAppKey: string;
    configuration?: Partial<Configuration>;
}

export interface IntentSendRequest extends CustomTemplate {
    chatId?: string;
}

export interface OpenIntentOptions {
    context: Packages.android.content.Context;
    uri: string;
    chatId?: string;
}

export interface IntentLaunchResult {
    transport: 'intent';
    status: 'launched';
}

export class KakaoIntentClient {
    private readonly context: Packages.android.content.Context;
    private readonly nativeAppKey: string;
    private readonly configuration: Configuration;

    constructor(options: IntentClientOptions) {
        if (!options.context || typeof options.context.startActivity !== 'function') {
            throw new TypeError('An Android context is required');
        }
        if (typeof options.nativeAppKey !== 'string' || !options.nativeAppKey.trim()) {
            throw new TypeError('nativeAppKey is required');
        }
        this.context = options.context;
        this.nativeAppKey = options.nativeAppKey;
        this.configuration = { ...DefaultConfiguration, ...options.configuration };
    }

    async sendTemplate(request: IntentSendRequest): Promise<IntentLaunchResult> {
        const template = normalizeCustomTemplate(request);
        const chatId = request.chatId === undefined ? undefined : normalizeChatId(request.chatId);
        const appInfo = readNativeAppInfo(this.context, this.configuration.nativeSdkVersion);
        const validated = await validateNativeTemplate(this.nativeAppKey, appInfo, template);
        const uri = createKakaoLinkUri(this.nativeAppKey, appInfo, validated);
        launchKakaoLink(this.context, uri, chatId);
        return { transport: 'intent', status: 'launched' };
    }

}

export function openIntent(options: OpenIntentOptions): IntentLaunchResult {
    validateKakaoLinkUri(options.uri);
    launchKakaoLink(options.context, options.uri, options.chatId);
    return { transport: 'intent', status: 'launched' };
}
