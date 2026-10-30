# kakaolink
KakaoTalkShare API for kakaobot

## 사용 방법

`KakaoLink.login()`에서 로그인 방법을 선택하고, `KakaoLink.web()` 또는
`KakaoLink.intent()`에서 전송 경로를 선택합니다. Intent 전송에는 별도 로그인이 필요하지 않습니다.

```js
const { KakaoLink } = require('kakaolink');

async function main() {
    const client = KakaoLink.intent({
        context: App.getContext(),
        nativeAppKey: 'YOUR_NATIVE_APP_KEY',
    });

    await client.sendTemplate({
        chatId: '18398338829933617',
        templateId: 12345,
        templateArgs: { title: '계산 결과' },
    });
}

main().catch(error => Log.e(String(error)));
```

Native 키에는 호출하는 메신저봇 앱의 패키지명과 서명 키 해시를 등록해야 합니다.
`chatId`를 생략하면 카카오톡의 대상 선택 화면이 열립니다.
반환값 `status: 'launched'`는 Intent 실행 완료이며 메시지 전달 완료를 보장하지 않습니다.

- [API 및 기존 코드 변경 방법](docs/API.md)
- [로그인 후 웹 전송 예제](example/loginWithKakaotalk.js)
- [로그인 없이 Intent 전송 예제](example/sendWithIntent.js)
- [이미 준비된 SDK URI 실행 예제](example/sendPreparedIntent.js)
- [개발 및 빌드](docs/HOW_TO_BUILD.md)

## 모듈 다운로드

GitHub Actions의 `Build Artifacts` 실행 결과에서 `kakaolink-module` artifact를 다운로드합니다.
ZIP을 풀어 나온 `kakaolink` 폴더를 봇의 모듈 디렉터리에 넣으면 됩니다.
[ZIP 구성과 수동 실행 방법](docs/HOW_TO_BUILD.md#ci-모듈-zip)을 참고하세요.

## 사용된 라이브러리
- [crypto-js](https://github.com/brix/crypto-js)
> 이후 패키지 관리자가 들어올때까지 직접 빌드해서 사용합니다.
>
> 빌드 방법은 [여기](docs/HOW_TO_BUILD.md)를 참고해주세요.

## v1
v1과 v2는 서로 호환되지 않습니다.

이 점 유의해주시고 사용해주세요.

## 확인된 봇 앱
- 메신저봇 (버전 0.7.40a 이상)

> 다른 봇 앱에서도 사용 가능할 수 있지만, 작동을 보장 받을 순 없습니다.
> 
> 혹시 다른 봇 앱에서의 작동을 확인 하셨나요?
> 
> 이슈를 올려 제보해주시면 확인된 봇 앱에 올려드립니다.
