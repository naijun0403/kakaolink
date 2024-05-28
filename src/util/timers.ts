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

export namespace Timers {

    const stackTimeout: java.util.Timer[] = [];

    export function setTimeout(callback: (args: unknown[]) => void, timeout: number): number {
        const args = Array.from(arguments);

        // function arguments
        args.pop();
        args.pop();

        const timer = new java.util.Timer();
        // @ts-ignore
        const task = new java.util.TimerTask({
            run: function () {
                callback.call(this, args);
            }
        });
        timer.schedule(task, timeout);

        const id = ++stackTimeout.length;
        stackTimeout[id] = timer;

        return id;
    }

    export function clearTimeout(id: number) {
        const timer = stackTimeout[id];
        if (timer === undefined) {
            return undefined;
        }

        timer.cancel();
    }

    const stackInterval: java.util.Timer[] = [];

    export function setInterval(callback: (args: unknown[]) => void, timeout: number) {
        const args = Array.from(arguments);

        // function arguments
        args.pop();
        args.pop();

        const timer = new java.util.Timer();
        // @ts-ignore
        const task = new java.util.TimerTask({
            run: function () {
                callback.call(this, args);
            }
        });
        timer.schedule(task, timeout, timeout);

        const id = ++stackInterval.length;
        stackInterval[id] = timer;

        return id;
    }

    export function clearInterval(id: number) {
        const timer = stackInterval[id];
        if (timer === undefined) {
            return undefined;
        }

        timer.cancel();
    }

}