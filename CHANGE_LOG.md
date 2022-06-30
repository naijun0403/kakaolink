# CHANGE_LOG
버전 3.5부터 작성합니다.
## 3.5
요청 방식을 비동기로 재구현하였습니다. (`Promise`)

모듈의 대부분을 재구현 하였습니다.

로그인 방식이 변경되었습니다.
> example 폴더를 참고해주세요

`tiara`쿠키를 받을때 누락된 데이터가 다시 들어갑니다.
## 3.6
메신저봇 지원 
`Promise` Polyfill 변경

## 3.7
`KakaoDevClient`가 추가되었습니다.
> 앱 정보 바꾸기, 앱 정보 불러오기, 앱 생성하기 ...

## 3.7.1
약간 로그인 방식이 변경되었습니다.

```js
const Kakao = new KakaoLinkClient();

KakaoApiService.createService().login({
    email: 'email',
    password: 'password',
    keepLogin: true,
}).then(e => {
    Kakao.login(e, {
        apiKey: 'apiKey',
        url: 'url'
    });
}).catch(e => {
    Log.e(e);
});
```

만일 당신이 원한다면 `apiKey`와 `url`은 명시할 이유가 없습니다.