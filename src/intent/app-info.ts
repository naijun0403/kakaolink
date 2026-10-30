import { generateNativeKakaoAgent } from '../agent/native-agent';
import type { NativeAppInfo } from './payload';

export function readNativeAppInfo(
    context: Packages.android.content.Context,
    sdkVersion: string
): NativeAppInfo {
    const packageName = String(context.getPackageName());
    const packageInfo = context.getPackageManager().getPackageInfo(packageName, 0x40);
    const signature = packageInfo.signatures?.[0];
    if (!signature) throw new Error('Cannot read the calling app signing certificate');

    const digest = java.security.MessageDigest.getInstance('SHA-1').digest(signature.toByteArray());
    const keyHash = String(Packages.android.util.Base64.encodeToString(
        digest, Packages.android.util.Base64.NO_WRAP
    ));
    const appVersion = String(packageInfo.versionName ?? '');
    const locale = java.util.Locale.getDefault();
    const kakaoAgent = generateNativeKakaoAgent({
        sdkVersion, packageName, appVersion, keyHash,
        language: `${locale.getLanguage()}-${locale.getCountry()}`,
        device: String(Packages.android.os.Build.MODEL),
        androidApiLevel: Packages.android.os.Build.VERSION.SDK_INT
    });
    return { packageName, appVersion, keyHash, kakaoAgent };
}
