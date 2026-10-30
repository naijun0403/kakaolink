const { KakaoLink } = require('kakaolink');

async function main() {
    const session = await KakaoLink.login({
        method: 'kakaotalk',
        context: App.getContext(),
    });

    const client = KakaoLink.web({
        jsAppKey: 'YOUR_JAVASCRIPT_APP_KEY',
        origin: 'https://example.com',
        session,
    });

    await client.sendTemplate({
        room: 'roomName',
        templateId: 1, // 사용할 커스텀 템플릿 ID
        templateArgs: {},
    });
}

main().catch(error => {
    Log.e(String(error));
});
