const MAX_LONG_ID = '9223372036854775807';

export function normalizePositiveLongId(value: string, name: string): string {
    if (typeof value !== 'string' || !/^[1-9][0-9]*$/.test(value)) {
        throw new TypeError(`${name} must be a positive decimal string without leading zeros`);
    }
    if (value.length > MAX_LONG_ID.length
        || (value.length === MAX_LONG_ID.length && value > MAX_LONG_ID)) {
        throw new RangeError(`${name} exceeds the maximum Android Long (${MAX_LONG_ID})`);
    }
    return value;
}
