export function toStringRecord(map: java.util.Map<string, string>): Record<string, string> {
    const result: Record<string, string> = Object.create(null);
    const entries = map.entrySet().iterator();
    while (entries.hasNext()) {
        const entry = entries.next();
        result[String(entry.getKey())] = String(entry.getValue());
    }
    return result;
}

export function toJavaStringMap(values: Readonly<Record<string, string>>): java.util.LinkedHashMap<string, string> {
    const result = new java.util.LinkedHashMap<string, string>();
    for (const name of Object.keys(values)) {
        if (typeof values[name] !== 'string') throw new TypeError('Map values must be strings');
        result.put(name, values[name]);
    }
    return result;
}
