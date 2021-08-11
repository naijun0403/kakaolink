/**
 * Created by archethic on 2021/07/28
 */

'use strict';

const { BasicConfig } = require("../config");
const { KakaoLinkLoginError, CryptoError, AccessError, ApiKeyError, KakaoLinkSendError } = require("../error");
const { request } = require("../request");
const { CryptoJS } = require('../util/crypto');

module.exports = /** @class */ (function () {
    /**
     * Init
     * @param {String} apiKey JSKey
     * @param {String} url Web Platform Url
     * @param {JSON} cookies don't use it
     */
    function KakaoLinkClient(apiKey, url) {
        if(typeof (apiKey || url) !== 'string') throw new TypeError('Either apiKey or url is not a String');
        if(apiKey.length !== 32) throw new TypeError('apiKey must be 32 digits');
        if(!/^http(s)?\:\/\/.+/.test(url)) throw new TypeError("The url does not match the web url format");
        
        this.apiKey = apiKey;
        this.kakaoAgent = 'sdk/1.25.7 os/javascript lang/ko-kr device/MacIntel origin/' + encodeURIComponent(url || 'https://arthic.dev');
        this.cookies = new java.util.LinkedHashMap();
    }

    /**
     * Login
     * @param {String} email Kakao Accounts Email
     * @param {String} password Kakao Accounts Password
     * @returns {boolean | Error}
     */
    KakaoLinkClient.prototype.login = function (email, password) {
        if(typeof (email || password) !== 'string') throw new TypeError('Either email or password is not a String');
        if(this.apiKey === undefined || this.apiKey === null) throw new Error('apiKey not registered');
        const getLoginRes = request({
            method: 'GET',
            url: BasicConfig.accountsUrl,
            referer: 'https://accounts.kakao.com/'
        });

        if(getLoginRes.statusCode() !== 200) throw new KakaoLinkLoginError('Login Failed with status: ' + getLoginRes.statusCode());

        this.referer = getLoginRes.url().toExternalForm();
        this.cookies = getLoginRes.cookies();

        this.cookies.putAll(request({ method: 'GET', url: BasicConfig.getTiaraUrl }).cookies())

        const loginRes = getLoginRes.parse();
        const cryptoKey = loginRes.select('input[name=p]').attr('value'); //CryptoJS Key(AES)

        const getAuthRes = request({
            method: 'POST',
            url: BasicConfig.getAuthUrl,
            referer: this.referer,
            data: {
                os: 'web',
                webview_v: '2',
                email: CryptoJS.AES.encrypt(email, cryptoKey),
                password: CryptoJS.AES.encrypt(password, cryptoKey),
                stay_signed_in: 'true',
                continue: decodeURIComponent(this.referer.split('=')[1]),
                third: 'false',
                k: 'true',
                authenticity_token: loginRes.select('head > meta:nth-child(3)').attr('content') //이거 햇갈렸는데 csrfToken 이었음
            },
            cookies: this.cookies
        });

        switch (JSON.parse(getAuthRes.body()).status) {
            case 0:
                break;
            case -484:
                throw new CryptoError('CryptoError Contact to Developer');
                break;
            case -435:
                throw new AccessError('Please Access Allow Country');
                break;
            case -450:
                throw new KakaoLinkLoginError('Email or password is incorrect');
                break;
            default:
                throw new KakaoLinkLoginError('Unknown Error with status: ' + JSON.parse(getAuthRes.body()).status);
                break;
        };

        this.cookies.putAll(getAuthRes.cookies());

        return true;
    }

    /**
     * Kakao Link Send
     * @param {String} room Room Name
     * @param {{ link_ver: '4.0', template_id: number | string, template_args: any, template_object: { button_title: string, object_type: 'feed' | 'list' | 'location' | 'commerce' | 'text', 
     * content: { title: string, description: string, image_url: string, link: any }, social: { likeCount: number, commentCount: number, shareCount: number }, 
     * buttons: [{title: string, link: { web_url: string, moblie_web_url: string }}] } }} obj Kakao Send Info
     * @param {'custom' | 'default'} type send Type
     */
    KakaoLinkClient.prototype.sendLink = function (room, obj, type) {
        if(!obj['link_ver']) obj['link_ver'] = '4.0'
        const getLinkRes = request({
            method: 'POST',
            url: BasicConfig.getLoginUrl,
            cookies: this.cookies,
            data: {
                app_key: this.apiKey,
                validation_action: type || 'custom', //일반적으로 커스텀을 더 많이 사용하니깐!
                validation_params: JSON.stringify(obj), //string으로 바꿔 줘야함
                ka: this.kakaoAgent
            }
        });

        if(getLinkRes.statusCode() === 401) throw new ApiKeyError('Please check the apiKey again');
        if(getLinkRes.statusCode() !== 200) throw new KakaoLinkSendError('Unknown Error with status: ' + getLinkRes.statusCode());

        this.cookies.putAll(getLinkRes.cookies());

        const linkRes = getLinkRes.parse();
        const LinkParams = linkRes.select('#validatedTalkLink').attr('value');
        const csrfToken = linkRes.select('div').last().attr('ng-init').slice(7).replace("'", '');
        const roomData = request({
            method: 'GET',
            url: BasicConfig.getChatData,
            cookies: this.cookies,
            referer: BasicConfig.getLoginUrl,
            headers: {
                "Csrf-Token": csrfToken,
                "App-Key": this.apiKey
            },
            returnType: 'json'
        });

        let id, count = null;

        roomData["chats"].map(x => {
            if(x.title === room) {
                id = x.id;
                count = x.memberCount;
                return;
            }
        });

        if(id === null || count === null) throw new KakaoLinkSendError('Room name '+ room +' not found. please check again');
        
        const sendLink = request({
            method: 'POST',
            url: BasicConfig.sendLinkUrl,
            referer: BasicConfig.getLoginUrl,
            cookies: this.cookies,
            headers: {
                "App-Key": this.apiKey,
                "Csrf-Token": csrfToken,
                "Content-Type": "application/json;charset=UTF-8"
            },
            data: {
                validatedTalkLink: JSON.parse(LinkParams),
                securityKey: roomData.securityKey,
                receiverType: 'chat', // 나에게 보내기는 'me'임 'chat'은 일반적인 채팅으로 보낸거
                receiverIds: [id],
                receiverChatRoomMemberCount: [count]
            },
            dataType: 'requestBody'
        });

        if(sendLink.statusCode() !== 200) throw new KakaoLinkSendError('Unknown Error with status: ' + sendLink.statusCode());
    }

    /**
     * logout
     * @returns {Boolean | Error}
     */
    KakaoLinkClient.prototype.logout = function () {
        const getLogout = request({
            method: 'GET',
            url: BasicConfig.logoutUrl,
            referer: 'https://accounts.kakao.com/',
            cookies: this.cookies
        });

        if(getLogout.statusCode() !== 200) throw new Error('Logout Failed with status: ' + getLogout.statusCode());
        
        this.apiKey = null;
        this.cookies = new java.util.LinkedHashMap();

        return true;
    }

    return KakaoLinkClient;
})();