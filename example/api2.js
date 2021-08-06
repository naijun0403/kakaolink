const bot = BotManager.getCurrentBot();

const { KakaoLinkClient } = require('kakaolink');
const Kakao = new KakaoLinkClient('jsKey', 'url');

Kakao.login('email', 'password');

function onMessage(msg) {
    if(msg.content === '!카카오링크') {
        Kakao.sendLink('roomName', {
            template_id: 00000,
            template_args: {
        
            }
        }, 'custom')
    }
}
bot.addListener(Event.MESSAGE, onMessage);