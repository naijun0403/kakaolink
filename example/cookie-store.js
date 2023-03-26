const { KakaoApiService, CookieStore, KakaoLinkClient } = require('kakaolink');

const store = new CookieStore('path', 'key');

const service = KakaoApiService.createService();

let Kakao = new KakaoLinkClient();

if (store.hasCookie()) {
    Kakao.login(store.readCookie(), {
        apiKey: 'apiKey',
        url: 'url'
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
            apiKey: 'apiKey',
            url: 'url'
        })
    }).catch(Log.e);
}

// store.deleteCookie(); // delete cookie