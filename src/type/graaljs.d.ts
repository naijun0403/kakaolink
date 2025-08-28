
declare namespace java {
    namespace lang {
        class String {
            constructor(str: string);
            constructor(bytes: number[]);
            getBytes(): number[];
        }
        
        interface Runnable {
            run(): void;
        }
    }
    
    namespace util {
        class Timer {
            constructor();
            constructor(name: string);
            constructor(isDaemon: boolean);
            constructor(name: string, isDaemon: boolean);
            
            schedule(task: TimerTask, delay: number): void;
            schedule(task: TimerTask, delay: number, period: number): void;
            scheduleAtFixedRate(task: TimerTask, delay: number, period: number): void;
            cancel(): void;
            purge(): number;
        }
        
        abstract class TimerTask implements java.lang.Runnable {
            abstract run(): void;
            cancel(): boolean;
            scheduledExecutionTime(): number;
        }

        interface Map<K, V> {
            get(key: K): V | null;
            put(key: K, value: V): V | null;
            remove(key: K): V | null;
            clear(): void;
            size(): number;
            isEmpty(): boolean;
            containsKey(key: K): boolean;
            containsValue(value: V): boolean;
            keySet(): Set<K>;
            values(): Collection<V>;
            entrySet(): Set<Map.Entry<K, V>>;
        }
        
        namespace Map {
            interface Entry<K, V> {
                getKey(): K;
                getValue(): V;
                setValue(value: V): V;
            }
        }

        /**
         * LinkedHashMap - 삽입 순서를 유지하는 HashMap [[4]][[5]]
         */
        class LinkedHashMap<K, V> implements Map<K, V> {
            constructor();
            constructor(initialCapacity: number);
            constructor(initialCapacity: number, loadFactor: number);
            constructor(initialCapacity: number, loadFactor: number, accessOrder: boolean);
            constructor(m: Map<K, V>);
            
            // Map 인터페이스 구현
            get(key: K): V | null;
            put(key: K, value: V): V | null;
            remove(key: K): V | null;
            clear(): void;
            size(): number;
            isEmpty(): boolean;
            containsKey(key: K): boolean;
            containsValue(value: V): boolean;
            keySet(): Set<K>;
            values(): Collection<V>;
            entrySet(): Set<Map.Entry<K, V>>;
            
            // LinkedHashMap 특정 메서드
            removeEldestEntry(eldest: Map.Entry<K, V>): boolean;

            putAll(m: Map<K, V>): void;
        }
        
        /**
         * HashMap - 순서를 보장하지 않는 Map 구현
         */
        class HashMap<K, V> implements Map<K, V> {
            constructor();
            constructor(initialCapacity: number);
            constructor(initialCapacity: number, loadFactor: number);
            constructor(m: Map<K, V>);
            
            get(key: K): V | null;
            put(key: K, value: V): V | null;
            remove(key: K): V | null;
            clear(): void;
            size(): number;
            isEmpty(): boolean;
            containsKey(key: K): boolean;
            containsValue(value: V): boolean;
            keySet(): Set<K>;
            values(): Collection<V>;
            entrySet(): Set<Map.Entry<K, V>>;
        }
        
        interface Set<T> {
            add(element: T): boolean;
            remove(element: T): boolean;
            contains(element: T): boolean;
            size(): number;
            isEmpty(): boolean;
            clear(): void;
            iterator(): Iterator<T>;
        }
        
        interface Collection<T> {
            add(element: T): boolean;
            remove(element: T): boolean;
            contains(element: T): boolean;
            size(): number;
            isEmpty(): boolean;
            clear(): void;
        }
        
        interface Iterator<T> {
            hasNext(): boolean;
            next(): T;
            remove(): void;
        }
    }

    namespace net {
        class URL {
            constructor(url: string);
            toString(): string;
            getProtocol(): string;
            getHost(): string;
            getPort(): number;
            getPath(): string;
            getQuery(): string;
        }
    }
}

declare namespace org {
    namespace jsoup {
        namespace Connection {
            interface Response {
                body(): string;
                bodyAsBytes(): number[];
                statusCode(): number;
                statusMessage(): string;
                charset(): string;
                contentType(): string;
                headers(): java.util.Map<string, string>;
                header(name: string): string;
                cookies(): java.util.Map<string, string>;
                cookie(name: string): string;
                url(): java.net.URL;
                parse(): org.jsoup.nodes.Document;
                readFully(): org.jsoup.Connection.Response;
                readBody(): string;
            }
            
            interface Request {
                url(): java.net.URL;
                method(): Method;
                headers(): java.util.Map<string, string>;
                header(name: string): string;
                cookies(): java.util.Map<string, string>;
                cookie(name: string): string;
                data(): java.util.Collection<KeyVal>;
                postDataCharset(): string;
                timeout(): number;
                maxBodySize(): number;
                followRedirects(): boolean;
                ignoreContentType(): boolean;
                ignoreHttpErrors(): boolean;
            }
            
            interface KeyVal {
                key(): string;
                value(): string;
            }
            
            enum Method {
                GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, TRACE
            }

            namespace Method {
                function valueOf(name: string): Method;
            }
        }
        
        namespace nodes {
            class Document extends Element {
                title(): string;
                title(title: string): void;
                head(): Element;
                body(): Element;
                createElement(tagName: string): Element;
                normalise(): Document;
                charset(): java.nio.charset.Charset;
                updateMetaCharsetElement(update: boolean): void;
                outputSettings(): Document.OutputSettings;
            }
            
            namespace Document {
                class OutputSettings {
                    charset(): java.nio.charset.Charset;
                    charset(charset: java.nio.charset.Charset): OutputSettings;
                    escapeMode(): org.jsoup.select.EscapeMode;
                    escapeMode(escapeMode: org.jsoup.select.EscapeMode): OutputSettings;
                    prettyPrint(): boolean;
                    prettyPrint(pretty: boolean): OutputSettings;
                    indentAmount(): number;
                    indentAmount(indentAmount: number): OutputSettings;
                }
            }
            
            class Element extends Node {
                tagName(): string;
                attr(attributeKey: string): string;
                attr(attributeKey: string, attributeValue: string): Element;
                hasAttr(attributeKey: string): boolean;
                removeAttr(attributeKey: string): Element;
                text(): string;
                text(text: string): Element;
                html(): string;
                html(html: string): Element;
                val(): string;
                val(value: string): Element;
                select(cssQuery: string): org.jsoup.select.Elements;
                getElementById(id: string): Element | null;
                getElementsByTag(tagName: string): org.jsoup.select.Elements;
                getElementsByClass(className: string): org.jsoup.select.Elements;
                getElementsByAttribute(key: string): org.jsoup.select.Elements;
                getElementsByAttributeValue(key: string, value: string): org.jsoup.select.Elements;
                addClass(className: string): Element;
                removeClass(className: string): Element;
                hasClass(className: string): boolean;
                toggleClass(className: string): Element;
                data(): string;
            }
            
            class Node {
                nodeName(): string;
                hasParent(): boolean;
                parent(): Node | null;
                remove(): void;
                before(html: string): Node;
                after(html: string): Node;
                wrap(html: string): Node;
            }
        }
        
        namespace select {
            class Elements extends java.util.ArrayList<nodes.Element> {
                text(): string;
                hasText(): boolean;
                html(): string;
                html(html: string): Elements;
                val(): string;
                val(value: string): Elements;
                attr(attributeKey: string): string;
                hasAttr(attributeKey: string): boolean;
                attr(attributeKey: string, attributeValue: string): Elements;
                removeAttr(attributeKey: string): Elements;
                addClass(className: string): Elements;
                removeClass(className: string): Elements;
                toggleClass(className: string): Elements;
                hasClass(className: string): boolean;
                select(query: string): Elements;
                first(): nodes.Element | null;
                last(): nodes.Element | null;
                eq(index: number): nodes.Element | null;
                get(index: number): nodes.Element;
                size(): number;
                toArray(): nodes.Element[];
            }
        }
        
        class Jsoup {
            static parse(html: string): nodes.Document;
            static parse(html: string, baseUri: string): nodes.Document;
            static connect(url: string): Connection;
            static clean(html: string, whitelist: safety.Whitelist): string;
        }
        
        interface Connection {
            url(url: string): Connection;
            userAgent(userAgent: string): Connection;
            timeout(millis: number): Connection;
            maxBodySize(bytes: number): Connection;
            referrer(referrer: string): Connection;
            followRedirects(followRedirects: boolean): Connection;
            method(method: Connection.Method): Connection;
            ignoreHttpErrors(ignoreHttpErrors: boolean): Connection;
            ignoreContentType(ignoreContentType: boolean): Connection;
            data(key: string, value: string): Connection;
            data(data: java.util.Map<string, string> | Record<string, unknown> | string): Connection;
            header(name: string, value: string): Connection;
            headers(headers: java.util.Map<string, string> | Record<string, string>): Connection;
            cookie(name: string, value: string): Connection;
            cookies(cookies: java.util.Map<string, string>): Connection;
            parser(parser: org.jsoup.parser.Parser): Connection;
            postDataCharset(charset: string): Connection;
            requestBody(body: string): Connection;
            execute(): Connection.Response;
            get(): nodes.Document;
            post(): nodes.Document;
        }
    }
}

declare namespace java.util {
    class ArrayList<T> {
        constructor();
        add(element: T): boolean;
        get(index: number): T;
        size(): number;
        isEmpty(): boolean;
        clear(): void;
        remove(index: number): T;
        contains(element: T): boolean;
        indexOf(element: T): number;
    }
}

declare namespace java.nio.charset {
    class Charset {
        static forName(charsetName: string): Charset;
        name(): string;
        displayName(): string;
    }
}

declare namespace org.jsoup.safety {
    class Whitelist {
        static none(): Whitelist;
        static simpleText(): Whitelist;
        static basic(): Whitelist;
        static basicWithImages(): Whitelist;
        static relaxed(): Whitelist;
    }
}

declare namespace org.jsoup.parser {
    class Parser {
        static xmlParser(): Parser;
        static htmlParser(): Parser;
    }
}

declare namespace org.jsoup.select {
    class Entities {}

    type EscapeMode = 'xhtml' | 'html' | 'xml' | 'extended' | 'base';
}

declare namespace Packages {
    namespace android {
        namespace util {
            class Base64 {
                static NO_WRAP: number;
                static URL_SAFE: number;
                static encodeToString(bytes: number[], flags: number): string;
                static decode(str: string, flags: number): number[];
            }
        }
        namespace content {
            class Context {
                startActivity(intent: Intent): void;
            }
            class Intent {
                static ACTION_VIEW: string;
                static FLAG_ACTIVITY_NO_HISTORY: number;
                static FLAG_ACTIVITY_NEW_TASK: number;
                constructor(action: string, uri: android.net.Uri);
                addFlags(flags: number): void;
            }
        }
        namespace net {
            class Uri {
                static parse(uriString: string): Uri;
            }
        }
    }
}

// android.content.Context 타입 alias (for global usage)
declare namespace android.content {
    type Context = Packages.android.content.Context;
}