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