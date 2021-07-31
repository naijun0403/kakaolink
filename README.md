# kakaolink
## how to use?
```javascript
const { KakaoLinkClient } = require('kakaolink');
const Kakao = new KakaoLinkClient("apiKey", "url")

Kakao.login("email", "password");

Kakao.sendLink('roomName', {
    template_id: 00000,
    template_args: {

    }
}, 'custom') // or 'default' for not use custom template
```

release 또는 링크에서 압축파일을 다운받고 압축해제 한 다음 폴더 전체를 global_modules에 옮겨주세요(2번 문항 참고)

## download
[github release](https://github.com/archethic/kakaolink/releases)

[Developer Server](http://arthic.dev/download/kakaolink)
