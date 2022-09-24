# CHANGE_LOG
## 1.0.0
`KakaoDevClient`가 대부분의 기능이 구현되었습니다.

이에 따라 로그인시 디벨로퍼 계정과 봇 계정이 같다면 `apiKey`, `url`을 들고옵니다.

`KakaoLinkClient`에 `kakaolink-legacy` 3.5 이전 방식이 다시 호환됩니다.

`KakaoApiService`에 `getReleaseVersion`메소드가 추가되서 버전을 확인 할 수 있습니다.

동기방식에서 비동기로 완벽하게 전환되었습니다.

## 1.0.1
안드로이드 누가 미만인 기기에서 `putIfAbsent`가 존재하지 않다고 하는 버그가 수정되었습니다.

## 1.0.2
1. `KakaoApiService`에서 리다이렉트가 계속되며, 로그인이 안되던 버그가 수정되었습니다.

2. `KakaoDevClient`에 `debugUrl`로 카카오 서버를 경우해 `url`을 `scrap` 할 수 있습니다.

## 1.0.3
1. `KakaoApiService`에서 로그인이 안되던 버그가 수정되었습니다.

## 1.0.4
1. 카카오 로그인시 기존 방식과 신 방식 (Next.JS)가 둘다 호환이 되게 변경하였습니다.

2. `tiara`를 받을때 사용하는 데이터를 최신화 하였습니다.

3. `TiaraFactory`의 코드를 개선하였습니다.