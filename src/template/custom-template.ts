import { normalizePositiveLongId } from '../model/long-id';

export interface CustomTemplate {
    templateId: string | number;
    templateArgs?: Readonly<Record<string, string>>;
}

export function normalizeTemplateId(id: string | number): string {
    if ((typeof id !== 'string' && typeof id !== 'number')
        || (typeof id === 'number' && !Number.isSafeInteger(id))) {
        throw new TypeError('templateId must be a positive decimal string or safe integer');
    }
    return normalizePositiveLongId(String(id), 'templateId');
}

export function normalizeCustomTemplate(template: CustomTemplate): {
    templateId: string;
    templateArgs: Record<string, string>;
} {
    const templateId = normalizeTemplateId(template.templateId);
    const args = template.templateArgs ?? {};
    if (typeof args !== 'object' || args === null || Array.isArray(args)
        || Object.values(args).some(value => typeof value !== 'string')) {
        throw new TypeError('templateArgs must be an object containing string values');
    }
    return { templateId, templateArgs: { ...args } };
}
