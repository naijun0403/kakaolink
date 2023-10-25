export interface TrackObject {
    sdk: Sdk;
    env: Env;
    common: Common;
    etc: Etc;
    action: Action;
}

export interface Action {
    type: string;
    name: string;
    kind: string;
}

export interface Etc {
    client_info: Clientinfo;
}

export interface Clientinfo {
    tuid: string;
    tsid: string;
    uuid: string;
    suid: string;
    isuid: string;
    client_timestamp: number;
}

export interface Common {
    svcdomain: string;
    deployment: string;
    url: string;
    section: string;
    page: string;
}

export interface Env {
    screen: string;
    tz: string;
    cke: string;
}

export interface Sdk {
    type: string;
    version: string;
}

export * from './factory';