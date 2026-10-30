import assert from 'node:assert/strict';
import { test } from 'node:test';
import { KakaoLink } from '../dist/kakao-link.js';
import { RequestClient } from '../dist/request/request-client.js';
import { FakeJavaMap } from './fixtures/java-map.mjs';

function installHost(t) {
    const previousJava = globalThis.java;
    const previousPackages = globalThis.Packages;
    t.after(() => { globalThis.java = previousJava; globalThis.Packages = previousPackages; });
    globalThis.java = { util: { LinkedHashMap: FakeJavaMap } };
    class Intent {
        static ACTION_VIEW = 'android.intent.action.VIEW';
        static FLAG_ACTIVITY_NO_HISTORY = 0x40000000;
        static FLAG_ACTIVITY_NEW_TASK = 0x10000000;
        constructor(action, uri) { this.action = action; this.uri = uri; }
        addFlags() {}
    }
    globalThis.Packages = { android: { content: { Intent }, net: { Uri: { parse: value => value } } } };
}

const loginOptions = { method: 'kakaotalk', context: { startActivity() {} } };

test('login rejects unsupported discriminators before HTTP', async t => {
    installHost(t);
    const request = t.mock.method(RequestClient.prototype, 'request', () => assert.fail('unexpected HTTP'));
    for (const method of ['email', 'password', '', undefined]) {
        await assert.rejects(KakaoLink.login({ ...loginOptions, method }), /Unsupported login method/);
    }
    assert.equal(request.mock.callCount(), 0);
});

test('login rejects invalid polling bounds before HTTP', async t => {
    installHost(t);
    const request = t.mock.method(RequestClient.prototype, 'request', () => assert.fail('unexpected HTTP'));
    for (const polling of [
        { intervalMs: -1 }, { intervalMs: NaN }, { intervalMs: Infinity },
        { maxAttempts: 0 }, { maxAttempts: 1.5 }, { maxAttempts: Infinity },
        { maxAttempts: Number.MAX_SAFE_INTEGER + 1 }
    ]) await assert.rejects(KakaoLink.login({ ...loginOptions, polling }), /polling\./);
    assert.equal(request.mock.callCount(), 0);
});

test('login requires an Android context before HTTP', async t => {
    installHost(t);
    t.mock.method(RequestClient.prototype, 'request', () => assert.fail('unexpected HTTP'));
    await assert.rejects(KakaoLink.login({ method: 'kakaotalk' }), /Android context/);
});

test('KakaoTalk login extracts script, creates token, launches URI and polls into plain cookies', async t => {
    installHost(t);
    const requests = [];
    const launched = [];
    let polls = 0;
    t.mock.method(RequestClient.prototype, 'request', async function (options) {
        requests.push(options);
        switch (options.path) {
            case '/weblogin/account/info':
                this.cookies.put('initial', 'page-cookie');
                return { url: 'https://accounts.kakao.com/weblogin/account/info', parse: () => ({
                    select: selector => {
                        assert.equal(selector, 'script');
                        return { toArray: () => [
                            { toString: () => '<script>unrelated</script>' },
                            { toString: () => '<script id="__NEXT_DATA__">', data: () => JSON.stringify({
                                props: { pageProps: { pageContext: { commonContext: { _csrf: 'csrf-token' } } } }
                            }) }
                        ] };
                    }
                }) };
            case '/track': {
                assert.equal(this.cookies.get('initial'), 'page-cookie');
                const cookies = new FakeJavaMap(); cookies.put('tiara', 'tracked');
                return { javaCookies: cookies };
            }
            case '/api/v2/login/web_talk/create_token.json':
                assert.equal(this.cookies.get('tiara'), 'tracked');
                assert.deepEqual(options.body, { _csrf: 'csrf-token' });
                return { json: () => ({ status: 0, token: 'login-token', talkLoginScheme: 'kakaotalk://login?token=login-token' }) };
            case '/api/v2/login/web_talk/poll.json': {
                assert.equal(options.body.token, 'login-token');
                assert.equal(options.body._csrf, 'csrf-token');
                assert.equal(launched.length, 1);
                const cookies = new FakeJavaMap();
                cookies.put('session', 'authenticated'); cookies.put('__proto__', 'safe-cookie');
                return { json: () => ({ status: polls++ === 0 ? -420 : 0 }), javaCookies: cookies };
            }
            default: assert.fail(`Unexpected path ${options.path}`);
        }
    });
    const session = await KakaoLink.login({ ...loginOptions,
        context: { startActivity: intent => launched.push(intent) },
        polling: { intervalMs: 0, maxAttempts: 2 }
    });
    assert.deepEqual(requests.map(request => request.path), [
        '/weblogin/account/info', '/track', '/api/v2/login/web_talk/create_token.json',
        '/api/v2/login/web_talk/poll.json', '/api/v2/login/web_talk/poll.json'
    ]);
    assert.equal(launched[0].action, 'android.intent.action.VIEW');
    assert.equal(launched[0].uri, 'https://m.search.daum.net/sl/sm/rck/m?ru=kakaotalk://login?token=login-token');
    assert.equal(session.cookies.session, 'authenticated');
    assert.equal(session.cookies.initial, 'page-cookie');
    assert.equal(session.cookies.__proto__, 'safe-cookie');
    assert.equal(typeof session.cookies.entrySet, 'undefined');
    assert.equal(Object.getPrototypeOf(session.cookies), null);
});
