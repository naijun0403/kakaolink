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
    const CompletableFuture = java.util.concurrent.CompletableFuture;

    function Promise(executor) {
        const future = this.future = new CompletableFuture();

        try {
            executor(
                (value) => future.complete(value),
                (error) => future.completeExceptionally(value)
            )
        } catch (e) {
            future.completeExceptionally(e);
        }
    }

    Promise.prototype.then = function (onFulfilled, onRejected) {
        Log.d('then!')
        return new Promise((resolve, reject) => {
            this.future.thenAccept((value) => {
                try {
                    const result = onFulfilled ? onFulfilled(value) : value;
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            }).exceptionally(function (error) {
                if (onRejected) {
                    try {
                        const result = onRejected(error);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject(error);
                }
            });
        })
    }

    Promise.prototype.catch = function (onRejected) {
        return this.then(null, onRejected);
    }

    Promise.prototype.finally = function (onFinally) {
        return this.then(onFinally, onFinally);
    }

    module.exports = Promise;
})(module, exports, require);