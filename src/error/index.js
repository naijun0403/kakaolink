/**
 * Created by archethic on 2021/07/28
 */

'use strict';

const customError = require("./custom-error");

exports.KakaoLinkLoginError = customError('KakaoLinkLoginError'); //Login Error;

exports.CryptoError = customError('CryptoError'); //-484

exports.AccessError = customError('AccessError'); //-435

exports.ApiKeyError = customError('ApiKeyError'); //401

exports.KakaoLinkSendError = customError('KakaoLinkSendError');