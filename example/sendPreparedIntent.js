const { KakaoLink } = require('kakaolink');

try {
    // SDK가 반환한 원본 kakaolink://send URI를 넣습니다.
    const result = KakaoLink.openIntent({
        context: App.getContext(),
        uri: 'YOUR_SDK_KAKAOLINK_URI',
        chatId: '18398338829933617',
    });
    Log.i(result.status);
} catch (error) {
    Log.e(String(error));
}
