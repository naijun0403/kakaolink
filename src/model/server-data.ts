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

export interface ServerData {
    type: string;
    lang: string;
    isMobileBrowser: boolean;
    data: ServerDataInfo;
}

export interface ServerDataInfo {
    appKey: string;
    shortKey: string;
    csrfToken: string;
    checksum: string;
    preview: ServerDataInfoPreview;
    me: ServerDataMe;
    friends: ServerDataFriend[];
    chats: ServerDataChat[];
}

export interface ServerDataInfoPreview {
    title: string;
    did: string;
    service_name: string;
    service_icon: string;
    image_url: string;
}

export interface ServerDataUser {
    id: string;
    profile_nickname: string;
    profile_thumbnail_image: string;
}

export interface ServerDataMe extends ServerDataUser {
}

export interface ServerDataFriend extends ServerDataUser {
    favorite: boolean;
}

export interface ServerDataChat {
    id: string;
    title: string;
    member_count: number;
    display_member_images: string[];
    chat_room_type: string;
}