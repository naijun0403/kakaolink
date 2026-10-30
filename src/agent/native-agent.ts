interface NativeAgentInfo {
    sdkVersion: string;
    packageName: string;
    appVersion: string;
    keyHash: string;
    language: string;
    device: string;
    androidApiLevel: number;
}

function ascii(value: string): string {
    return value.replace(/[^\x20-\x7e]/g, '*');
}

export function generateNativeKakaoAgent(info: NativeAgentInfo): string {
    const device = ascii(info.device.toUpperCase().replace(/ /g, '-'));
    return `sdk/${ascii(info.sdkVersion)} sdk_type/kotlin`
        + ` os/android-${info.androidApiLevel} lang/${ascii(info.language)}`
        + ` origin/${info.keyHash} device/${device} android_pkg/${ascii(info.packageName)}`
        + ` app_ver/${ascii(info.appVersion)} module_type/open`;
}
