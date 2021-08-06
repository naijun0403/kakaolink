/**
 * Created by archethic on 2021/08/06
 */

const { KakaoLinkClient } = require('kakaolink');
const Kakao = new KakaoLinkClient('jsKey', 'url');

Kakao.login('email', 'password');

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if(msg === '!카카오링크') {
        Kakao.sendLink('roomName', {
            template_id: 00000,
            template_args: {
        
            }
        }, 'custom')
    }
}

const logoutKaling = () => Kakao.logout(); //please don't use this