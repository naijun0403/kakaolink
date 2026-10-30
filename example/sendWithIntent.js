const { KakaoLink } = require('kakaolink');

async function main() {
    // 이 Native 키에 메신저봇 앱의 패키지명과 서명 키 해시를 등록해야 합니다.
    const client = KakaoLink.intent({
        context: App.getContext(),
        nativeAppKey: 'YOUR_NATIVE_APP_KEY',
    });

    const result = await client.sendTemplate({
        chatId: '18398338829933617', // 정밀도를 보존하려면 문자열로 전달합니다. 생략하면 대상 선택 화면이 열립니다.
        templateId: 12345,
        templateArgs: { title: '계산 결과' },
    });

    // launched는 카카오톡 Intent 실행 완료이며, 메시지 전달 완료를 의미하지 않습니다.
    Log.i(result.status);
}

main().catch(error => {
    Log.e(String(error));
});
