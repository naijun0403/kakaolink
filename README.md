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
}, 'custom')
```

레포 전체를 다운받은뒤 압축풀고 kakaolink-main을 kakaolink로 변경후 폴더 전체를 global_modules에 옮겨주세요