const { KakaoApiService, CookieStore, KakaoLinkClient } = require('../index');

const store = new CookieStore('path', 'key');

const service = KakaoApiService.createService();

let Kakao = new KakaoLinkClient();

if (store.hasCookie()) {
    Kakao.login(store.readCookie(), {
        apiKey: '',
        url: ''
    });
} else {
    service.login({
        email: 'email',
        password: 'password',
        keepLogin: true,
        twoFA: true
    }).then(e => {
        store.writeCookie(e);

        Kakao.login(e, {
            apiKey: '',
            url: ''
        })
    }).catch(Log.e);
}

store.deleteCookie(); // delete cookie