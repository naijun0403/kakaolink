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

import { normalizeCustomTemplate, type CustomTemplate } from './custom-template';

export interface RawCustomTemplate {
    link_ver: '4.0';
    template_id: number;
    template_args: Record<string, string>;
}

export function transformToRawTemplate(template: CustomTemplate): RawCustomTemplate {
    const normalized = normalizeCustomTemplate(template);
    const id = Number(normalized.templateId);
    if (!Number.isSafeInteger(id)) {
        throw new RangeError('Web templateId must fit in a JavaScript safe integer');
    }
    return {
        link_ver: '4.0',
        template_id: id,
        template_args: normalized.templateArgs
    };
}
