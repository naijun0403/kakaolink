/**
 * Created by archethic on 2021/07/28
 */

'use strict';

exports.BasicConfig = {
    getLoginUrl: "https://sharer.kakao.com/talk/friends/picker/link",
    getTiaraUrl: "https://stat.tiara.kakao.com/track?d=" + encodeURIComponent(JSON.stringify({
        sdk: { type: 'WEB', version: '1.1.17' },
        env: { screen: '1920X1080', tz: '+9', cke: 'Y' },
        common: {
          svcdomain: 'accounts.kakao.com',
          deployment: 'production',
          url: 'https://accounts.kakao.com/login',
          referrer: 'https://m.search.daum.net/',
          title: '카카오계정',
          section: 'login',
          page: 'pageLogin'
        },
        action: { type: 'Pageview', name: 'pageLogin', kind: '' }
      })),
    logoutUrl: "https://sharer.kakao.com/talk/friends/picker/logout",
    getAuthUrl: "https://accounts.kakao.com/weblogin/authenticate.json",
    getChatData: "https://sharer.kakao.com/api/talk/chats",
    sendLinkUrl: 'https://sharer.kakao.com/api/talk/message/link',
    accountsUrl: 'https://accounts.kakao.com/login?continue=https%3A%2F%2Faccounts.kakao.com%2Fweblogin%2Faccount%2Finfo'
}