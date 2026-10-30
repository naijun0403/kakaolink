# KakaoLink API

공개 진입점은 `require('kakaolink').KakaoLink`입니다. 로그인 방법과 전송 경로는 별도로 선택합니다.
현재 로그인 방법은 `kakaotalk`, 전송 경로는 `web`과 `intent`를 지원합니다.

## 카카오톡으로 로그인하고 웹으로 전송

CommonJS 예제이므로 `await` 호출은 async 함수 안에서 실행합니다.

```js
const { KakaoLink } = require('kakaolink');

async function main() {
    const session = await KakaoLink.login({
        method: 'kakaotalk',
        context: App.getContext(),
        polling: { intervalMs: 1000, maxAttempts: 10 },
    });

    const client = KakaoLink.web({
        jsAppKey: 'YOUR_JAVASCRIPT_APP_KEY',
        origin: 'https://example.com',
        session,
    });

    await client.sendTemplate({
        room: '알림방',
        templateId: 12345,
        templateArgs: { title: '계산 결과' },
    });
}

main().catch(error => Log.e(String(error)));
```

`login()`은 `{ cookies }` 형태의 세션을 반환합니다. 쿠키는 Java Map을 노출하지 않는 JS 객체이며,
웹 클라이언트는 생성할 때 이를 복사합니다. HTTP 기반 로그인 방법은 구현 시 `method`에 별도 값과
그 방법에 필요한 옵션을 추가할 수 있습니다. 미지원 방법은 명시적으로 거부합니다.

`polling.intervalMs`는 유한한 0 이상의 수, `polling.maxAttempts`는 양의 안전한 정수입니다.
기본값은 각각 1000ms와 10회입니다.

웹 전송의 `room`은 방 이름입니다. 반환값은 `{ transport: 'web', status: 'submitted' }`이며,
최종 전송 HTTP 요청이 2xx 응답을 받았다는 뜻입니다. 메시지 전달 확인을 의미하지 않습니다.

## 로그인 없이 Intent로 전송

```js
const client = KakaoLink.intent({
    context: App.getContext(),
    nativeAppKey: 'YOUR_NATIVE_APP_KEY',
});

// async 함수 안에서 실행합니다.
const result = await client.sendTemplate({
    chatId: '18398338829933617',
    templateId: 12345,
    templateArgs: { title: '계산 결과' },
});
```

- JavaScript 키 대신 Native 앱 키를 사용합니다. 이 키에 **호출하는 메신저봇 앱**의 패키지명과
  서명 키 해시가 등록되어 있어야 합니다. 카카오톡 앱의 패키지명·서명을 등록하는 것이 아닙니다.
- 호출 앱의 패키지명·버전·서명을 Context에서 읽고 Native KA 헤더와 Intent extras를 구성합니다.
- 앱 키로 템플릿 검증 API를 호출하므로 네트워크 연결은 필요합니다. 사용자 로그인·세션 쿠키는 사용하지 않습니다.
- 서버가 반환한 `template_id`, `template_args`, `template_msg` 전체를 사용합니다.
  `P`·`C`를 임의 생성하거나 서명 정보를 덮어쓰지 않습니다.
- `chatId`가 있으면 문서의 직접 공유 Extra를 사용하고, 생략하면 대상 선택 화면이 열립니다.
- `chatId`는 양의 Android Long 범위의 십진수 문자열입니다. JS Number를 사용하면 큰 ID가 손상될 수 있어 거부합니다.

결과는 `{ transport: 'intent', status: 'launched' }`입니다. 이는 `startActivity()` 호출이 성공했다는
뜻입니다. 메시지 전달 완료는 [공식 공유 웹훅 안내](https://developers.kakao.com/docs/ko/kakaotalk-share/android-link)를 참고합니다.

지정 채팅방 직접 공유는 `kakaolink-intent.md`의 카카오톡 Android 26.9.1 추출 코드에 근거한 내부 경로입니다.
채팅방 화면이 열릴 수 있으며, 백그라운드 전송 완료를 반환하는 API가 아닙니다.
Android/GraalJS 실환경에서의 실행과 카카오 서버의 최종 수락은 별도 확인이 필요합니다.

## SDK가 이미 만든 URI 실행

```js
const result = KakaoLink.openIntent({
    context: App.getContext(),
    uri: sdkGeneratedUri,
    chatId: '18398338829933617',
});
```

완전한 `kakaolink://send` URI를 이미 확보한 경우 로그인·추가 키 설정·템플릿 검증 HTTP 요청을
생략합니다. 필수 파라미터와 `P`·`C`를 확인한 뒤 원본 URI를 그대로 전달하며, 이중 디코딩하거나
재조합하지 않습니다. `chatId`를 생략하면 대상 선택 화면을 사용합니다.
반환값은 Intent 전송과 같은 `status: 'launched'`입니다.

## 템플릿 입력과 오류

두 클라이언트의 `sendTemplate()`은 `{ templateId, templateArgs? }`를 공통으로 받습니다.
`templateArgs`의 기본값은 빈 객체이고 값은 문자열이어야 합니다. 미구현된 기본 템플릿을 암묵적으로
선택하는 인자는 없습니다. `templateId`는 양의 정수 문자열 또는 안전한 JS 정수입니다.
Intent에서는 Android Long 범위의 ID를 지원하며, 웹 전송에서는 안전한 JS 정수 범위여야 합니다.

비동기 로그인·전송 실패는 Promise rejection, 동기적인 클라이언트 생성·`openIntent()` 실패는
예외로 전달합니다. 검증 실패나 HTTP 오류가 발생하면 Intent를 실행하지 않습니다.

## 이전 API에서 변경

| 이전 | 현재 |
| --- | --- |
| `KakaoApiService.createService().login({ signInWithKakaoTalk: true, context })` | `KakaoLink.login({ method: 'kakaotalk', context })` |
| `createClient()` 이후 `init(key, domain, cookies)` | `KakaoLink.web({ jsAppKey, origin, session })` |
| `sendLink(room, template, 'custom')` | `sendTemplate({ room, templateId, templateArgs })` |
| `pollingInterval`, `pollingCount` | `polling: { intervalMs, maxAttempts }` |
| Java Map으로 위장된 쿠키 Record | 실제 JS 객체인 `session.cookies` |
| 루트에서 내부 HTTP·추적·Next.js 타입까지 전체 export | `KakaoLink`와 공개 옵션·결과 타입만 export |

기존 생성 팩토리, `init`, boolean 로그인 선택, `'default'` 전송 인자는 제거했습니다.

## 내부 책임과 의존 방향

- `kakao-link.ts`: 공개 호출을 인증·전송 모듈에 연결합니다.
- `auth/types.ts`: 로그인 옵션과 세션 데이터 계약을 정의합니다.
- `auth/login.ts`: 현재 카카오톡 로그인 흐름을 수행합니다.
- `web/client.ts`: 세션을 사용한 웹 전송을 수행합니다.
- `intent/kakao-intent-client.ts`: 검증·URI 구성·Android 실행 순서를 조립합니다.
- `intent/template-validator.ts`: Native 템플릿 검증 HTTP 요청을 수행합니다.
- `template`, `intent/payload.ts`, `intent/chat-id.ts`, `agent`: 입력·프로토콜 데이터의 검증과 변환을 담당합니다.
- `request`, `intent/app-info.ts`, `intent/android.ts`: Java/Jsoup 및 Android I/O를 담당합니다.

공개 진입점 → 인증·전송 → HTTP/Android 어댑터 방향으로 의존합니다.
템플릿·URI·ID·KA 변환 로직은 HTTP나 Android 호출 없이 검증할 수 있습니다.
