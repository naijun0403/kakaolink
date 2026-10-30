import { normalizePositiveLongId } from '../model/long-id';

/** Validate a positive Android Long without passing through a JavaScript number. */
export function normalizeChatId(value: string): string {
    return normalizePositiveLongId(value, 'Chat ID');
}
