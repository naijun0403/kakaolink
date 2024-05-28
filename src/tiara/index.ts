/*
 * MIT License
 *
 * Copyright (c) 2024 naijun0403
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
    referrer: string;
    section: string;
    page: string;
}

export interface Env {
    screen: string;
    tz: string;
    cke: string;
    uadata: UserAgentData;
}

export interface UserAgentData {
    fullVersionList: unknown[];
    mobile: boolean;
    model: string;
    platform: string;
    platformVersion: string;
}

export interface Sdk {
    type: string;
    version: string;
}

export * from './factory';