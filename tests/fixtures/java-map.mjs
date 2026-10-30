/** Minimal insertion-ordered Java Map bridge used by offline tests. */
export class FakeJavaMap {
    #values = new Map();
    constructor(source) { if (source) this.putAll(source); }
    put(key, value) {
        const previous = this.get(key);
        this.#values.set(key, value);
        return previous;
    }
    get(key) { return this.#values.has(key) ? this.#values.get(key) : null; }
    putAll(source) {
        const entries = source.entrySet().iterator();
        while (entries.hasNext()) {
            const entry = entries.next();
            this.put(entry.getKey(), entry.getValue());
        }
    }
    clear() { this.#values.clear(); }
    entrySet() {
        const values = this.#values;
        return { iterator() {
            const entries = [...values.entries()];
            let index = 0;
            return {
                hasNext: () => index < entries.length,
                next() {
                    if (index >= entries.length) throw new Error('NoSuchElementException');
                    const [key, value] = entries[index++];
                    return { getKey: () => key, getValue: () => value };
                }
            };
        } };
    }
}
