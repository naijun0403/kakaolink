/*
 * MIT License
 *
 * Copyright (c) 2024 naijun0403
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export interface NextData {
    props: Props;
    page: string;
    query: LinkParams;
    buildId: string;
    assetPrefix: string;
    nextExport: boolean;
    isFallback: boolean;
    gip: boolean;
    scriptLoader: unknown[];
}

export interface Props {
    pageProps: PageProps;
}

export interface PageProps {
    pageContext: PageContext;
}

export interface PageContext {
    commonContext: CommonContext;
    context: Context;
}

export interface Context {
    webType: string;
    defaultEmail?: unknown;
    showStaySignIn: boolean;
    defaultStaySignIn: boolean;
    appendStaySignedIn: boolean;
    defaultCountryCode: string;
    showQrLogin: boolean;
    showWebTalkLogin: boolean;
    showDeviceFormLogin: boolean;
    needCaptcha: boolean;
    showIpSecurity: boolean;
    loginUrl: string;
    continueUrl: string;
    useSimpleLogin: boolean;
    exceedSimpleLoginLimit: boolean;
    defaultSaveSignIn: boolean;
    isTalkLoginError: boolean;
    linkParams: LinkParams2;
    requests: Requests;
}

export interface Requests {
    check_daum_sso: string[];
}

export interface LinkParams2 {
    lang: string[];
}

export interface CommonContext {
    locale: string;
    uaClass: string;
    responsiveView: boolean;
    responsivePopup: boolean;
    mobile: boolean;
    webview: Webview;
    supportRefererMetaTag: boolean;
    showHeader: boolean;
    showFooter: boolean;
    linkParams: LinkParams;
    showDarkMode?: unknown;
    _csrf: string;
    kage_file_max_size: number;
    upload_kage_url: string;
    p: string;
}

export interface LinkParams {
}

export interface Webview {
    app: string;
    webViewType: string;
    appVersion: string;
    os: string;
    osVersion: string;
    supportNavigation: boolean;
    supportFilePicker: boolean;
    supportExecUrlScheme: boolean;
    supportMarketUrlScheme: boolean;
}