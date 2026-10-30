import assert from 'node:assert/strict';
import { test } from 'node:test';
import { normalizeCustomTemplate } from '../dist/template/custom-template.js';
import { createKakaoLinkUri, parseValidatedTemplate, validateKakaoLinkUri } from '../dist/intent/payload.js';

const response = {
    template_id: 12345,
    template_args: { '${title}': '서버 값 + 100% & = 😀' },
    template_msg: {
        P: { A: 'signed%2Fvalue', TP: 'Feed', extra: { keep: true } },
        C: { TI: { TD: { T: '서버 템플릿' } } },
        K: { ti: '12345' }
    },
    scheme_params: { list: 'friend', limit: 1, ignored: 'do not forward' }
};
const appInfo = {
    packageName: 'com.example.bot', appVersion: '1.0',
    keyHash: 'signature+/=', kakaoAgent: 'sdk/2.25.1 origin/signature+/='
};

test('template input preserves exact IDs and rejects ambiguous IDs or invalid arguments', () => {
    assert.deepEqual(normalizeCustomTemplate({ templateId: 123 }), { templateId: '123', templateArgs: {} });
    assert.equal(normalizeCustomTemplate({ templateId: '9223372036854775807' }).templateId, '9223372036854775807');
    for (const templateId of [0, -1, 1.5, NaN, Infinity, Number('18398338829933617'), '', '01', '12x', '1e3',
        '9223372036854775808', null, {}, 1n]) {
        assert.throws(() => normalizeCustomTemplate({ templateId }), /templateId/);
    }
    for (const templateArgs of [[], 'text', { count: 1 }, { key: undefined }]) {
        assert.throws(() => normalizeCustomTemplate({ templateId: 1, templateArgs }), /templateArgs/);
    }
});

test('Intent URI uses the complete validated response and native caller metadata with one encoding pass', () => {
    const parsed = parseValidatedTemplate(response);
    const uri = createKakaoLinkUri('native-key', appInfo, parsed);
    const params = new URL(uri).searchParams;
    assert.equal(params.get('linkver'), '4.0');
    assert.equal(params.get('appkey'), 'native-key');
    assert.equal(params.get('appver'), appInfo.appVersion);
    assert.equal(params.get('template_id'), '12345');
    assert.deepEqual(JSON.parse(params.get('template_args')), response.template_args);
    assert.deepEqual(JSON.parse(params.get('template_json')), response.template_msg);
    assert.deepEqual(JSON.parse(params.get('extras')), {
        appPkg: appInfo.packageName, keyHash: appInfo.keyHash, KA: appInfo.kakaoAgent
    });
    assert.equal(params.get('list'), 'friend');
    assert.equal(params.get('limit'), '1');
    assert.equal(params.has('ignored'), false);
    assert.doesNotThrow(() => validateKakaoLinkUri(uri));
    assert.deepEqual(parsed.templateMessage, response.template_msg);
});

test('validation rejects missing or non-object P/C before producing a URI', () => {
    for (const template_msg of [{}, { P: {} }, { P: {}, C: [] }, { P: null, C: {} }, 'text']) {
        assert.throws(() => parseValidatedTemplate({ ...response, template_msg }), /template_msg/);
    }
    assert.throws(() => parseValidatedTemplate({ ...response, template_id: Number('18398338829933617') }), /templateId/);
    assert.throws(() => parseValidatedTemplate({ ...response, template_args: [] }), /template_args/);
    assert.throws(() => parseValidatedTemplate(null), /JSON object/);
});

test('prepared URI validation rejects alternate schemes, duplicate parameters and malformed JSON', () => {
    const uri = createKakaoLinkUri('native-key', appInfo, parseValidatedTemplate(response));
    for (const invalid of [
        uri.replace('kakaolink://send?', 'https://send?'),
        `${uri}#Intent;end`, `${uri}&appkey=second`, `${uri}&app%6Bey=second`,
        uri.replace('linkver=4.0', 'linkver=3.5'),
        uri.replace(/template_json=[^&]+/, 'template_json=%7B'),
        uri.replace(/template_json=[^&]+/, `template_json=${encodeURIComponent('{"P":{}}')}`),
        uri.replace(/extras=[^&]+/, 'extras=null'), `${uri}&invalid=%ZZ`
    ]) {
        assert.throws(() => validateKakaoLinkUri(invalid));
    }
});
