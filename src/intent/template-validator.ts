import { RequestClient } from '../request/request-client';
import { normalizeCustomTemplate, type CustomTemplate } from '../template/custom-template';
import { parseValidatedTemplate, type NativeAppInfo, type ValidatedIntentTemplate } from './payload';

export async function validateNativeTemplate(
    nativeAppKey: string,
    appInfo: NativeAppInfo,
    template: CustomTemplate
): Promise<ValidatedIntentTemplate> {
    const normalized = normalizeCustomTemplate(template);
    const response = await new RequestClient('https://kapi.kakao.com').request({
        method: 'GET',
        path: '/v2/api/kakaolink/talk/template/validate?link_ver=4.0',
        headers: {
            Authorization: `KakaoAK ${nativeAppKey}`,
            KA: appInfo.kakaoAgent
        },
        data: {
            template_id: normalized.templateId,
            template_args: JSON.stringify(normalized.templateArgs)
        }
    });
    if (response.statusCode !== 200) {
        throw new Error(`Native template validation failed: HTTP ${response.statusCode}`);
    }
    return parseValidatedTemplate(response.json<unknown>());
}
