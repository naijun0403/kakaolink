/**
 * Created by archethic on 2021/07/28
 */

'use strict';

/**
 * request by jsoup
 * @param {{ method: 'get' | 'GET' | 'post' | 'POST', url: string, data: {} | string, headers: {}, cookies: {}, followRedirect: boolean, referer: string, returnType: 'json' | 'text' | 'jsoup', dataType: 'data' | 'requestBody' }} obj requestObj
 */
 exports.request = function (obj) {
    if(obj.method === 'GET' || obj.method === 'get') obj.method = org.jsoup.Connection.Method.GET;
    else if(obj.method === 'POST' || obj.method === 'post') obj.method = org.jsoup.Connection.Method.POST;
    else throw new Error('incorrect method type')
    if(!/^http(s)?\:\/\/.+/.test(obj.url)) throw new Error(obj.url + " is not a valid url");

    let req = org.jsoup.Jsoup.connect(obj.url).method(obj.method);

    if(!obj.dataType) obj.dataType = 'data'
    if(obj.dataType === 'data') {
        if(typeof obj.data === 'string') req.requestBody(obj.data);
        else if(typeof obj.data === 'object') {
            for(var key in obj.data) {
                req.data(key, obj.data[key].toString());
            }
        }
    } else if(obj.dataType === 'requestBody') {
        if(typeof obj.data === 'string') req.requestBody(obj.data);
        else if(typeof obj.data === 'object') req.requestBody(JSON.stringify(obj.data));
        else throw new Error('dataType is incorrect');
    }

    if(obj.referer) req.referrer(obj.referer);
    if(obj.headers) req.headers(obj.headers);
    if(obj.cookies) req.cookies(obj.cookies);
    if(obj.followRedirect) req.followRedirects(obj.followRedirect);
    if(!obj.returnType) obj.returnType = 'jsoup'; //basic type
    if(obj.returnType === 'json') return JSON.parse(req.ignoreContentType(true).ignoreHttpErrors(true).execute().body());
    else if(obj.returnType === 'text') return req.ignoreContentType(true).ignoreHttpErrors(true).execute().body();
    else if(obj.returnType === 'jsoup') return req.ignoreContentType(true).ignoreHttpErrors(true).execute();
}