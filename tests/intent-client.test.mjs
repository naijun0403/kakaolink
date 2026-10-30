import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import { KakaoLink } from '../dist/index.js';
import { KakaoAuth } from '../dist/auth/login.js';
import { RequestClient } from '../dist/request/request-client.js';
import { readNativeAppInfo } from '../dist/intent/app-info.js';
import { FakeJavaMap } from './fixtures/java-map.mjs';

const certificate = [1, 7, 13, 42];
const keyHash = createHash('sha1').update(Buffer.from(certificate)).digest('base64');
const validated = {
    template_id: 54321,
    template_args: { title: 'server-expanded' },
    template_msg: { P: { A: 'signed-token', TP: 'Feed' }, C: { keep: ['original', '서버 값'] } }
};

function installNativeHost(t) {
    const launched = [];
    const metadataCalls = [];
    const previous = ['java', 'Packages'].map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]);
    t.after(() => {
        for (const [name, descriptor] of previous) {
            if (descriptor) Object.defineProperty(globalThis, name, descriptor);
            else delete globalThis[name];
        }
    });
    class Intent {
        static ACTION_SEND = 'android.intent.action.SEND';
        constructor(action, data) { this.action = action; this.data = data; this.extras = {}; }
        setClassName(packageName, className) { this.component = [packageName, className]; }
        addFlags(flags) { this.flags = flags; }
        ['putExtra(java.lang.String,boolean)'](key, value) { this.extras[key] = value; }
        ['putExtra(java.lang.String,int)'](key, value) { this.extras[key] = value; }
        ['putExtra(java.lang.String,long)'](key, value) { this.extras[key] = value; }
    }
    globalThis.java = {
        util: {
            LinkedHashMap: FakeJavaMap,
            Locale: { getDefault: () => ({ getLanguage: () => 'ko', getCountry: () => 'KR' }) }
        },
        lang: { Long: { ['valueOf(java.lang.String)']: decimal => ({ decimal }) } },
        security: { MessageDigest: { getInstance(algorithm) {
            assert.equal(algorithm, 'SHA-1');
            return { digest: bytes => [...createHash('sha1').update(Buffer.from(bytes)).digest()] };
        } } }
    };
    globalThis.Packages = { android: {
        content: { Intent }, net: { Uri: { parse: uri => uri } },
        os: { Build: { MODEL: 'sample phone', VERSION: { SDK_INT: 35 } } },
        util: { Base64: { NO_WRAP: 2, encodeToString(bytes, flags) {
            assert.equal(flags, 2);
            return Buffer.from(bytes).toString('base64');
        } } }
    } };
    const packageInfo = {
        versionName: '1.2.3', signatures: [{ toByteArray: () => certificate }]
    };
    const context = {
        getPackageName: () => 'com.example.bot',
        getPackageManager: () => ({ getPackageInfo(packageName, flags) {
            metadataCalls.push({ packageName, flags });
            return packageInfo;
        } }),
        startActivity: intent => launched.push(intent)
    };
    return { context, packageInfo, launched, metadataCalls };
}

test('native metadata derives the calling app certificate hash and SDK-compatible agent', t => {
    const { context, metadataCalls } = installNativeHost(t);
    const info = readNativeAppInfo(context, '2.25.1');
    assert.deepEqual(metadataCalls, [{ packageName: 'com.example.bot', flags: 0x40 }]);
    assert.equal(info.keyHash, keyHash);
    assert.equal(info.kakaoAgent, `sdk/2.25.1 sdk_type/kotlin os/android-35 lang/ko-KR`
        + ` origin/${keyHash} device/SAMPLE-PHONE android_pkg/com.example.bot app_ver/1.2.3 module_type/open`);
});

test('Intent sending validates with native key and launches server-provided P/C without login', async t => {
    const { context, launched } = installNativeHost(t);
    t.mock.method(KakaoAuth.prototype, 'login', () => assert.fail('Intent sharing must not log in'));
    const requests = [];
    t.mock.method(RequestClient.prototype, 'request', async function (options) {
        requests.push({ url: this.toFullUrl(options.path), ...options });
        return { statusCode: 200, json: () => validated };
    });
    const client = KakaoLink.intent({ context, nativeAppKey: 'native-key' });
    const result = await client.sendTemplate({
        chatId: '18398338829933617', templateId: 12345, templateArgs: { title: 'request' }
    });
    assert.equal(requests.length, 1);
    assert.equal(requests[0].method, 'GET');
    assert.equal(requests[0].url,
        'https://kapi.kakao.com/v2/api/kakaolink/talk/template/validate?link_ver=4.0');
    assert.equal(requests[0].headers.Authorization, 'KakaoAK native-key');
    assert.match(requests[0].headers.KA, /android_pkg\/com\.example\.bot/);
    assert.deepEqual(requests[0].data, { template_id: '12345', template_args: '{"title":"request"}' });
    assert.equal(launched.length, 1);
    const params = new URL(launched[0].data).searchParams;
    assert.equal(params.get('template_id'), '54321');
    assert.deepEqual(JSON.parse(params.get('template_args')), validated.template_args);
    assert.deepEqual(JSON.parse(params.get('template_json')), validated.template_msg);
    assert.deepEqual(JSON.parse(params.get('extras')), {
        appPkg: 'com.example.bot', keyHash, KA: requests[0].headers.KA
    });
    assert.deepEqual(launched[0].extras.key_id, { decimal: '18398338829933617' });
    assert.deepEqual(result, { transport: 'intent', status: 'launched' });
});

test('prepared URI is preserved and opened without HTTP validation or native metadata lookup', t => {
    const { context, launched, metadataCalls } = installNativeHost(t);
    t.mock.method(RequestClient.prototype, 'request', () => assert.fail('Prepared URI must not make HTTP requests'));
    const params = new URLSearchParams({
        linkver: '4.0', appkey: 'native-key', appver: '1.0', template_id: '12345',
        template_args: '{"title":"a+b %25"}', template_json: JSON.stringify(validated.template_msg),
        extras: '{"KA":"original-agent"}', preserved: '%2F'
    });
    const uri = `kakaolink://send?${params}`;
    const result = KakaoLink.openIntent({ context, uri });
    assert.equal(launched[0].data, uri);
    assert.deepEqual(launched[0].extras, {});
    assert.deepEqual(metadataCalls, []);
    assert.equal(result.status, 'launched');
});

test('invalid local inputs fail before metadata lookup, HTTP requests or launch', async t => {
    const { context, launched, metadataCalls } = installNativeHost(t);
    t.mock.method(RequestClient.prototype, 'request', () => assert.fail('Invalid input must not make HTTP requests'));
    const client = KakaoLink.intent({ context, nativeAppKey: 'native-key' });
    await assert.rejects(client.sendTemplate({ templateId: 1, chatId: Number('18398338829933617') }), /Chat ID/);
    await assert.rejects(client.sendTemplate({ templateId: 'not-a-template' }), /templateId/);
    assert.throws(() => KakaoLink.openIntent({ context, uri: 'https://example.com' }), /kakaolink/);
    assert.throws(() => KakaoLink.intent({ context, nativeAppKey: '' }), /nativeAppKey/);
    assert.deepEqual(metadataCalls, []);
    assert.deepEqual(launched, []);
});

test('HTTP errors, malformed templates and missing certificates never launch an Intent', async t => {
    const { context, launched, packageInfo } = installNativeHost(t);
    let response = { statusCode: 403, json() { assert.fail('Error bodies must not be treated as templates'); } };
    t.mock.method(RequestClient.prototype, 'request', async () => response);
    const client = KakaoLink.intent({ context, nativeAppKey: 'native-key' });
    await assert.rejects(client.sendTemplate({ templateId: 1 }), /HTTP 403/);
    response = { statusCode: 200, json: () => ({ ...validated, template_msg: { P: {} } }) };
    await assert.rejects(client.sendTemplate({ templateId: 1 }), /template_msg.C/);
    response = { statusCode: 200, json() { throw new SyntaxError('Invalid JSON'); } };
    await assert.rejects(client.sendTemplate({ templateId: 1 }), /Invalid JSON/);
    packageInfo.signatures = [];
    await assert.rejects(client.sendTemplate({ templateId: 1 }), /signing certificate/);
    assert.deepEqual(launched, []);
});
