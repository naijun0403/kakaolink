import assert from 'node:assert/strict';
import { test } from 'node:test';
import { KakaoLink } from '../dist/kakao-link.js';
import { RequestClient } from '../dist/request/request-client.js';
import { DefaultConfiguration } from '../dist/config.js';
import { FakeJavaMap } from './fixtures/java-map.mjs';

function installHost(t) {
    const previousJava = globalThis.java;
    const previousPackages = globalThis.Packages;
    t.after(() => { globalThis.java = previousJava; globalThis.Packages = previousPackages; });
    class JavaString {
        constructor(value) { this.value = typeof value === 'string' ? value : Buffer.from(value).toString('utf8'); }
        getBytes() { return [...Buffer.from(this.value)]; }
        toString() { return this.value; }
    }
    globalThis.java = { util: { LinkedHashMap: FakeJavaMap }, lang: { String: JavaString } };
    globalThis.Packages = { android: { util: { Base64: {
        NO_WRAP: 2, URL_SAFE: 8,
        encodeToString: bytes => Buffer.from(bytes).toString('base64'),
        decode: text => [...Buffer.from(text, 'base64')]
    } } } };
}

const options = () => ({ jsAppKey: 'app-key', origin: 'https://example.com', session: { cookies: { session: 'original' } } });
const room = { title: 'Target room', id: 'room-id', members: 3 };
function pickerResponse() {
    const serverData = { data: { chats: [{ title: 'Other room', id: 'other' }, room],
        shortKey: 'short-key', csrfToken: 'csrf', checksum: 'checksum' } };
    return { statusCode: 200, body: `serverData = "${Buffer.from(JSON.stringify(serverData)).toString('base64')}"` };
}

test('web construction requires credentials and session immediately', t => {
    installHost(t);
    for (const invalid of [{ session: undefined }, { session: { cookies: null } }, { session: { cookies: [] } },
        { jsAppKey: '' }, { origin: 'invalid' }]) {
        assert.throws(() => KakaoLink.web({ ...options(), ...invalid }), /required|origin/);
    }
});

test('web send uses copied session, custom payload, selected room and isolated configuration', async t => {
    installHost(t);
    const configuration = { sdkVersion: 'custom-sdk', defaultUserAgent: 'custom-agent' };
    const firstOptions = { ...options(), configuration };
    Object.defineProperty(firstOptions.session.cookies, '__proto__', { value: 'safe-cookie', enumerable: true });
    const first = KakaoLink.web(firstOptions);
    const second = KakaoLink.web(options());
    firstOptions.session.cookies.session = 'mutated';
    configuration.sdkVersion = 'mutated';
    configuration.defaultUserAgent = 'mutated';
    const calls = [];
    t.mock.method(RequestClient.prototype, 'request', async function (request) {
        calls.push({ request, cookies: this.cookies });
        return request.path === '/picker/link' ? pickerResponse() : { statusCode: 204 };
    });
    const request = { room: 'Target room', templateId: 123, templateArgs: { title: 'hello' } };
    assert.deepEqual(await first.sendTemplate(request), { transport: 'web', status: 'submitted' });
    await second.sendTemplate(request);
    assert.equal(calls[0].cookies.get('session'), 'original');
    assert.equal(calls[0].cookies.get('__proto__'), 'safe-cookie');
    assert.notEqual(calls[0].cookies, calls[2].cookies);
    assert.equal(calls[0].request.headers['User-Agent'], 'custom-agent');
    assert.match(calls[0].request.data.ka, /^sdk\/custom-sdk /);
    assert.equal(calls[2].request.headers['User-Agent'], DefaultConfiguration.defaultUserAgent);
    assert.match(calls[2].request.data.ka, new RegExp(`^sdk/${DefaultConfiguration.sdkVersion} `));
    assert.equal(calls[0].request.data.validation_action, 'custom');
    assert.equal(calls[0].request.data.app_key, 'app-key');
    assert.deepEqual(JSON.parse(calls[0].request.data.validation_params), {
        link_ver: '4.0', template_id: 123, template_args: { title: 'hello' }
    });
    assert.equal(calls[1].request.path, '/picker/send');
    assert.deepEqual(JSON.parse(Buffer.from(calls[1].request.data.receiver, 'base64').toString()), room);
    assert.equal(calls[1].request.data.short_key, 'short-key');
    assert.equal(calls[1].request.data._csrf, 'csrf');
    assert.equal(calls[1].request.data.checksum, 'checksum');
});

test('web missing room or template is rejected before HTTP', async t => {
    installHost(t);
    const client = KakaoLink.web(options());
    const request = t.mock.method(RequestClient.prototype, 'request', () => assert.fail('unexpected HTTP'));
    for (const invalid of [{ templateId: 1 }, { room: '', templateId: 1 }, { room: 'Target room' },
        { room: 'Target room', templateId: 0 }]) {
        await assert.rejects(client.sendTemplate(invalid), /room|templateId/);
    }
    assert.equal(request.mock.callCount(), 0);
});

test('web propagates final non-2xx submission failures', async t => {
    installHost(t);
    const client = KakaoLink.web(options());
    const calls = [];
    t.mock.method(RequestClient.prototype, 'request', async request => {
        calls.push(request.path);
        return request.path === '/picker/link' ? pickerResponse() : { statusCode: 503 };
    });
    await assert.rejects(client.sendTemplate({ room: 'Target room', templateId: 123 }), /HTTP 503/);
    assert.deepEqual(calls, ['/picker/link', '/picker/send']);
});
