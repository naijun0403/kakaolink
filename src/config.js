/**
 * Created by archethic on 2021/07/28
 */

 exports.BasicConfig = {
    getLoginUrl: "https://sharer.kakao.com/talk/friends/picker/link",
    getTiaraUrl: "https://stat.tiara.kakao.com/track?d=" + encodeURIComponent(JSON.stringify({"sdk":{"type":"WEB","version":"1.1.15"}})),
    logoutUrl: "https://sharer.kakao.com/talk/friends/picker/logout",
    getAuthUrl: "https://accounts.kakao.com/weblogin/authenticate.json",
    getChatData: "https://sharer.kakao.com/api/talk/chats",
    sendLinkUrl: 'https://sharer.kakao.com/api/talk/message/link'
}