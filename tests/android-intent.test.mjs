import assert from 'node:assert/strict';
import { test } from 'node:test';
import { launchKakaoLink } from '../dist/intent/android.js';
import { normalizeChatId } from '../dist/intent/chat-id.js';

function installAndroidBridge(t) {
    const intents = [];
    const longValues = [];
    class Intent {
        static ACTION_SEND = 'android.intent.action.SEND';
        constructor(action, data) {
            this.action = action;
            this.data = data;
            this.extras = [];
            intents.push(this);
        }
        setClassName(packageName, className) { this.component = [packageName, className]; }
        addFlags(flags) { this.flags = (this.flags ?? 0) | flags; }
        ['putExtra(java.lang.String,boolean)'](key, value) {
            assert.equal(typeof value, 'boolean');
            this.extras.push([key, 'boolean', value]);
        }
        ['putExtra(java.lang.String,int)'](key, value) {
            assert.equal(typeof value, 'number');
            this.extras.push([key, 'int', value]);
        }
        ['putExtra(java.lang.String,long)'](key, value) {
            assert.ok(longValues.includes(value), 'long overload receives the exact host value');
            this.extras.push([key, 'long', value]);
        }
    }
    const previousPackages = Object.getOwnPropertyDescriptor(globalThis, 'Packages');
    const previousJava = Object.getOwnPropertyDescriptor(globalThis, 'java');
    t.after(() => {
        for (const [key, descriptor] of [['Packages', previousPackages], ['java', previousJava]]) {
            if (descriptor) Object.defineProperty(globalThis, key, descriptor);
            else delete globalThis[key];
        }
    });
    globalThis.Packages = { android: {
        content: { Intent }, net: { Uri: { parse: text => ({ text }) } }
    } };
    globalThis.java = { lang: { Long: {
        ['valueOf(java.lang.String)'](decimal) {
            assert.equal(typeof decimal, 'string');
            const value = Object.freeze({ decimal });
            longValues.push(value);
            return value;
        }
    } } };
    return { intents, longValues };
}

const uri = 'kakaolink://send?template_json=%7B%22P%22%3A%7B%7D%7D';

test('picker launch sets action, original data, explicit component and flags without extras', t => {
    const { intents, longValues } = installAndroidBridge(t);
    const launched = [];
    launchKakaoLink({ startActivity: intent => launched.push(intent) }, uri);
    assert.equal(intents.length, 1);
    assert.deepEqual(launched, intents);
    assert.equal(intents[0].action, 'android.intent.action.SEND');
    assert.deepEqual(intents[0].data, { text: uri });
    assert.deepEqual(intents[0].component,
        ['com.kakao.talk', 'com.kakao.talk.activity.RecentExcludeIntentFilterActivity']);
    assert.equal(intents[0].flags, 0x14000000);
    assert.deepEqual(intents[0].extras, []);
    assert.deepEqual(longValues, []);
});

test('direct share preserves large chat IDs and selects primitive extra overloads', t => {
    const { intents, longValues } = installAndroidBridge(t);
    for (const chatId of ['1', '18398338829933617', '9223372036854775807']) {
        launchKakaoLink({ startActivity() {} }, uri, chatId);
        assert.equal(longValues.at(-1).decimal, chatId);
        assert.deepEqual(intents.at(-1).extras, [
            ['key_from_direct_share', 'boolean', true],
            ['key_type', 'int', 1],
            ['key_id', 'long', longValues.at(-1)]
        ]);
    }
});

test('chat ID validation rejects malformed, non-string and overflowing values before host calls', t => {
    const { intents } = installAndroidBridge(t);
    const invalidIds = ['', '0', '-1', '+1', '01', ' 1', '1 ', '1.0', '1e3', '１２',
        '9223372036854775808', '99999999999999999999', 1, 1n, null, {}, undefined];
    for (const chatId of invalidIds) {
        assert.throws(() => normalizeChatId(chatId), /Chat ID/);
        if (chatId !== undefined) {
            assert.throws(() => launchKakaoLink({ startActivity() {
                assert.fail('invalid ID must not launch');
            } }, uri, chatId), /Chat ID/);
        }
    }
    assert.deepEqual(intents, []);
    assert.equal(normalizeChatId('18398338829933617'), '18398338829933617');
});

test('Android activity launch errors propagate unchanged', t => {
    installAndroidBridge(t);
    const error = new Error('Activity not found');
    assert.throws(() => launchKakaoLink({ startActivity() { throw error; } }, uri),
        thrown => thrown === error);
});
