/*
 * MIT License
 *
 * Copyright (c) 2021 naijun0403
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

(function (module, exports, require) {
    const { isGreenApp } = require('../util/is-green-app');

    const stack = [];

    const setTimeout_support = function (callback, timeout) {
        const args = Array.from(arguments);

        // function arguments
        args.pop();
        args.pop();

        if (isGreenApp()) {
            return setTimeout(callback, timeout, args);
        }

        const timer = new java.util.Timer();
        const task = new java.util.TimerTask({
            run: function () {
                callback.call(this, args);
            }
        });
        timer.schedule(task, timeout);

        const id = ++stack.size;
        stack[id] = timer;

        return id;
    };

    const clearTimeout_support = (id) => {
        if (isGreenApp()) {
            return clearTimeout(id);
        }

        const timer = stack[id];
        if (timer === undefined) {
            return undefined;
        }

        timer.cancel();
    };

    const stackInterval = [];

    const setInterval_support = function (callback, timeout) {
        const args = Array.from(arguments);

        // function arguments
        args.pop();
        args.pop();

        if (isGreenApp()) {
            return setTimeout(callback, timeout, args);
        }

        const timer = new java.util.Timer();
        const task = new java.util.TimerTask({
            run: function () {
                callback.call(this, args);
            }
        });
        timer.schedule(task, timeout, timeout);

        const id = ++stackInterval.size;
        stackInterval[id] = timer;

        return id;
    };

    const clearInterval_support = (id) => {
        if (isGreenApp()) {
            return clearTimeout(id);
        }

        const timer = stackInterval[id];
        if (timer === undefined) {
            return undefined;
        }

        timer.cancel();
    };

    module.exports = {
        setTimeout: setTimeout_support,
        clearTimeout: clearTimeout_support,
        setInterval: setInterval_support,
        clearInterval: clearInterval_support
    };
})(module, exports, require);