# error
이 문서는 카카오링크 사용중 자주나오는 에러에 대해서 설명합니다.
## init
### Either apiKey or url is not a String
`apiKey`나 `url`는 무조건 String 타입이어야합니다.
해당오류는 String 타입이 아닌것이 있을때 나옵니다.
### apiKey must be 32 digits
apiKey는 무조건 32길이의 문자열입니다. 혹여나 다른걸 넣은게 아닌지 확인바랍니다.
### The url does not match the web url format
url을 넣어야하는데 다른걸 넣은거 같습니다. 형식은 다음과 같습니다.
`https://arthic.dev`

## login
### Either email or password is not a String
`email`이나 `password`는 무조건 String 타입이어야합니다.
해당오류는 String 타입이 아닌것이 있을때 나옵니다.
### apiKey not registered
`apiKey`가 제대로 인식이 되지 않았을때 발생합니다. 제대로 `init`하셨나요?
### Login Failed with status: ~~
알 수 없는 이유로 로그인 페이지에 접속하는걸 실패했습니다. 사유는 다음과 같습니다.
1. 사용자 네트워크 문제
2. 카카오 서버 문제
네트워크가 올바른지 확인하시고 만일 그래도 안된다면 이슈를 남겨주세요 빠른시일내에 해결해드리겠습니다.
### Encryption failed.
이슈를 남겨주세요 모듈 문제입니다.
### The country you are trying to access is blocked.
접속하려는 국가가 차단당했습니다. 대부분 해외계정에서 발생합니다.
[여기](https://accounts.kakao.com/)에서 차단 국가를 해제해주세요.
### Email or password is incorrect
이메일이나 패스워드가 잘못되었습니다.
### Unknown Error with status: ~~
스탯코드에 따라 대처 방법이 다릅니다.
### -481
캡챠 에러입니다. 해당 오류는 기다리거나 vpn을 키고 로그인하는거밖에 답이 없습니다.
#### -451
전화번호로 카카오링크에 로그인할려고 하셨나요? 그렇다면 2차인증이 필요합니다.
카카오링크모듈은 이를 기다려주지 않습니다.
이메일로 로그인해주세요

## send
### You cannot access the KakaoLink API before logging in.
로그인을 제대로 하지 않았을때 발생합니다. 제대로 하셨나요?
### Please check the apiKey again
`apiKey`가 올바르지 않을때 발생합니다.
### Unknown Error with status: ~~
스탯코드에 따라 대처 방법이 다릅니다.
#### 400
대부분 모듈에 `init`한 도매인과 디벨로퍼에 등록된 도매인이 다를때 발생합니다.
만일 같다면 `sendType`을 확인해주세요
특별한 경우가 아니라면 보통 `custom`을 사용합니다.
### The room information could not be retrieved for an unknown reason.
알 수 없는 이유로 방정보를 받아오지 못하였습니다.
네트워크를 확인해주시고 다 확인해봐도 해당 오류가 뜨면 이슈를 남겨주세요
### Room name ~~ not found. please check again
방이름이 존재 하지 않습니다. 다시 한번 확인해주세요
> **잠깐만요!:** 만약에 당신이 그룹챗에 보낼려고 했다면 카카오링크에서 받아온 방 정보와 당신의 카톡에 있는 방 정보가
> 서로 일치하지 않은 경우가 종종 있습니다.
> 이 경우 그룹채팅의 이름을 변경하고 잠시 후 시도해보세요
### Unknown Error with status: ~~
스탯코드에 따라 대처 방법이 다릅니다.
#### 400
대부분 모듈에 `init`한 도매인과 디벨로퍼에 등록된 도매인이 다를때 발생합니다.
만일 같다면 `sendType`을 확인해주세요
특별한 경우가 아니라면 보통 `custom`을 사용합니다.
