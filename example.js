const { KakaoLinkClient } = require('./index');
const Kakao = new KakaoLinkClient("apiKey", "url")

Kakao.login("email", "password");

Kakao.sendLink('roomName', {
    template_id: 00000,
    template_args: {

    }
}, 'custom')