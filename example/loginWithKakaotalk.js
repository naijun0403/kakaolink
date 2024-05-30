var { KakaoApiService, KakaoShareClient } = require('kakaolink');

const service = KakaoApiService.createService();
const client = KakaoShareClient.createClient();

/**
 * 알아서 카카오톡으로 접속해 로그인 세션을 불러옴
 */
const cookies = service.login({
    signInWithKakaoTalk: true
}).awaitResult();

client.init('js app key', 'web platform domain', cookies);

client.sendLink('roomName', {
    templateId: 1, // your template id
    templateArgs: {},
}, 'custom').awaitResult();