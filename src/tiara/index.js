/**
 * MIT License
 *
 * Copyright (c) 2022 naijun
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

const seedKey = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

exports.TiaraFactory = {
    generateRandomUUIDWithDateTime() {
        let t = ["w-"];
        return t.push(this.shortenID(12)), t.push("_"), t.push(this.currentTimeStamp()), t.join("")
    },

    generateRandomUUIDWithDateNumber() {
        let t = ["w-"];
        return t.push(this.shortenID(12)), t.push("_"), t.push(this.currentTimeStamp().substring(0, 6)), t.push(this.randomNumericString(9)), t.join("")
    },

    currentTimeStamp() {
        let t = new Date;
        return t.setHours(t.getHours() + 9), t.toISOString().replace(/[TZ\-:.]/g, "").substring(2)
    },

    randomNumericString(t) {
        let e = [];
        for (let a = 0; a < t; a++) {
            let n = Math.floor(10 * Math.random());
            e.push(n)
        }
        return e.join("")
    },

    shortenID(t) {
        let e = [];
        for (let a = 0; a < t; a++) {
            let n = seedKey[Math.floor(Math.random() * seedKey.length)];
            e.push(n)
        }
        return e.join("")
    }
}