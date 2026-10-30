import { normalizeChatId } from './chat-id';

/** Launch an already validated KakaoLink URI through KakaoTalk's Android entry point. */
export function launchKakaoLink(
    context: Packages.android.content.Context,
    uri: string,
    chatId?: string
): void {
    if (!context || typeof context.startActivity !== 'function') {
        throw new TypeError('An Android context is required');
    }
    const normalizedChatId = chatId === undefined ? undefined : normalizeChatId(chatId);
    const intent = new Packages.android.content.Intent(
        Packages.android.content.Intent.ACTION_SEND,
        Packages.android.net.Uri.parse(uri)
    );
    intent.setClassName('com.kakao.talk', 'com.kakao.talk.activity.RecentExcludeIntentFilterActivity');
    intent.addFlags(0x14000000);

    if (normalizedChatId !== undefined) {
        // Parse the decimal ID in Java and pass it directly to the primitive-long overload.
        const javaChatId = java.lang.Long['valueOf(java.lang.String)'](normalizedChatId);
        intent['putExtra(java.lang.String,boolean)']('key_from_direct_share', true);
        intent['putExtra(java.lang.String,int)']('key_type', 1);
        intent['putExtra(java.lang.String,long)']('key_id', javaChatId);
    }
    context.startActivity(intent);
}
