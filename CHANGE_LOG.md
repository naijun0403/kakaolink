# CHANGE_LOG
## 1.0.0
`KakaoDevClient`가 대부분의 기능이 구현되었습니다.

이에 따라 로그인시 디벨로퍼 계정과 봇 계정이 같다면 `apiKey`, `url`을 들고옵니다.

`KakaoLinkClient`에 `kakaolink-legacy` 3.5 이전 방식이 다시 호환됩니다.

`KakaoApiService`에 `getReleaseVersion`메소드가 추가되서 버전을 확인 할 수 있습니다.

동기방식에서 비동기로 완벽하게 전환되었습니다.