# migration

> 해당 마이그레이션 가이드는 버전 `3.5`이후만 동작합니다.

## From under `3.5`
### require
이전 방식
```js
const { KakaoLinkClient } = require('kakaolink');
```
`3.5` 이상 방식
```js
const { KakaoApiService, KakaoLinkClient } = require('kakaolink');
```

### use
#### login
이전 방식
```js
const Kakao = new KakaoLinkClient('apiKey', 'url');

Kakao.login('email', 'password');
```

`3.5` 이상 방식
```js
const Kakao = new KakaoLinkClient();

KakaoApiService.createService().login({
    email: 'email',
    password: 'password',
    keepLogin: true,
    apiKey: 'apiKey',
    url: 'url'
}).then(e => {
    Kakao.login(e);
}).catch(e => {
    console.error(e)
});
```

#### send
이전 방식
```js
Kakao.sendLink('room', {
    template_id: 52312,
    template_args: {
        
    }
}, 'custom') // 안넣으면 자동으로 'custom'으로 대체, 기본 방식은 'default'
```

`3.5`이후 방식
```js
Kakao.sendLink('roomName', {
    template_id: 12345,
    template_args: {

    }}, 'custom').then().catch()
```

3번째에 있는 타입은 해당 모듈의 경우 커스텀 템플릿을 사용하실꺼면 생략해도 무방합니다.
그러나 기본 템플릿의 경우 생략하면 안됩니다.

2번째에 있는 `object`중 `link_ver`은 해당모듈은 자동으로 채워줍니다. 따라서 생략해도 무방합니다.

## From Delta/Kiri
### require
델타님꺼나 키리님꺼는 모듈을 불러올때
```js
const Kakao = require('kaling');
```
이런식으로 많이 불러옵니다. 그러나 이 모듈은
```js
const { KakaoApiService, KakaoLinkClient } = require('kakaolink');
```
이런식으로 불러와야합니다.
### use
#### login
델타님꺼나 키리님꺼는 `apiKey`, `domain`을 `login`할때
```js
Kakao.init('apiKey', 'domain');

Kakao.login('email', 'password');
```
이런식으로 `login` 해야합니다.

그러나 이 모듈은
```js
const Kakao = new KakaoLinkClient();

KakaoApiService.createService().login({
    email: 'email',
    password: 'password',
    keepLogin: true,
    apiKey: 'apiKey',
    url: 'url'
}).then(e => {
    Kakao.login(e);
}).catch(e => {
    console.error(e)
});
```
이런식으로 `login` 해야합니다.

#### send
델타님꺼나 키리님꺼는 카카오링크를 전송할때
```javascript
Kakao.send('room', {
    link_ver: '4.0',
    template_id: 52312,
    template_args: {
        
    }
}, 'custom') // 안넣으면 자동으로 'default'로 대체
```
이런식으로 전송합니다.

그러나 이 모듈은
```js
Kakao.sendLink('roomName', {
    template_id: 12345,
    template_args: {

    }}, 'custom')
```
이런식으로 전송합니다.

3번째에 있는 타입은 해당 모듈의 경우 커스텀 템플릿을 사용하실꺼면 생략해도 무방합니다.
그러나 기본 템플릿의 경우 생략하면 안됩니다.

2번째에 있는 `object`중 `link_ver`은 해당모듈은 자동으로 채워줍니다. 따라서 생략해도 무방합니다.