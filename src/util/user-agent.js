exports.generateAndroidUserAgent = function () {
    const builder = [];

    const sdkVersion = android.os.Build.VERSION.SDK_INT

    builder.push('Mozilla/5.0');
    builder.push('(Linux; Android ' + sdkVersion + '; sdk Build/KL);');
    builder.push(android.os.Build.MODEL);

    return builder.join(' ');
}