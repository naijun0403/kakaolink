import { normalizeTemplateId } from '../template/custom-template';

export interface NativeAppInfo {
    packageName: string;
    appVersion: string;
    keyHash: string;
    kakaoAgent: string;
}

export interface ValidatedIntentTemplate {
    templateId: string;
    templateArgs: Record<string, unknown>;
    templateMessage: Record<string, unknown>;
    schemeParams: Record<string, unknown>;
}

function objectField(value: unknown, name: string): Record<string, unknown> {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        throw new TypeError(`${name} must be a JSON object`);
    }
    return value as Record<string, unknown>;
}

export function parseValidatedTemplate(value: unknown): ValidatedIntentTemplate {
    const result = objectField(value, 'Template validation response');
    const id = result.template_id;
    if (typeof id !== 'string' && typeof id !== 'number') {
        throw new TypeError('Template validation response is missing template_id');
    }
    const templateId = normalizeTemplateId(id);
    const templateArgs = objectField(result.template_args, 'template_args');
    const templateMessage = objectField(result.template_msg, 'template_msg');
    objectField(templateMessage.P, 'template_msg.P');
    objectField(templateMessage.C, 'template_msg.C');
    const schemeParams = objectField(result.scheme_params ?? {}, 'scheme_params');
    return { templateId, templateArgs, templateMessage, schemeParams };
}

export function createKakaoLinkUri(
    appKey: string,
    appInfo: NativeAppInfo,
    template: ValidatedIntentTemplate
): string {
    const params: Record<string, string> = {
        linkver: '4.0',
        appkey: appKey,
        appver: appInfo.appVersion,
        template_id: template.templateId,
        template_args: JSON.stringify(template.templateArgs),
        template_json: JSON.stringify(template.templateMessage),
        extras: JSON.stringify({ appPkg: appInfo.packageName, keyHash: appInfo.keyHash, KA: appInfo.kakaoAgent })
    };
    for (const name of ['list', 'limit']) {
        const value = template.schemeParams[name];
        if (typeof value === 'string' || typeof value === 'number') params[name] = String(value);
    }
    return 'kakaolink://send?' + Object.keys(params)
        .map(name => `${name}=${encodeURIComponent(params[name])}`).join('&');
}

export function validateKakaoLinkUri(uri: string): void {
    if (typeof uri !== 'string' || !uri.startsWith('kakaolink://send?') || uri.includes('#')) {
        throw new TypeError('A kakaolink://send URI is required');
    }
    const params: Record<string, string> = Object.create(null);
    for (const pair of uri.slice('kakaolink://send?'.length).split('&')) {
        const separator = pair.indexOf('=');
        if (separator < 0) throw new TypeError('Invalid KakaoLink URI query');
        const name = decodeURIComponent(pair.slice(0, separator).replace(/\+/g, ' '));
        if (name in params) throw new TypeError(`Duplicate KakaoLink URI parameter: ${name}`);
        params[name] = decodeURIComponent(pair.slice(separator + 1).replace(/\+/g, ' '));
    }
    if (params.linkver !== '4.0' || !params.appkey || !('appver' in params)) {
        throw new TypeError('KakaoLink URI requires linkver=4.0, appkey and appver');
    }
    parseValidatedTemplate({
        template_id: params.template_id,
        template_args: JSON.parse(params.template_args),
        template_msg: JSON.parse(params.template_json)
    });
    objectField(JSON.parse(params.extras), 'extras');
}
