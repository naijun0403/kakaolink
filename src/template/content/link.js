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

exports.LinkBuilder = (function () {

    function LinkBuilder() {
        this.obj = {};
    }

    /**
     * set web url
     * @param { string } url
     * @returns { LinkBuilder }
     */
    LinkBuilder.prototype.setWebUrl = function (url) {
        this.obj['web_url'] = url;
        return this;
    }

    /**
     * set mobile web url
     * @param { string } url
     * @returns { LinkBuilder }
     */
    LinkBuilder.prototype.setMobileWebUrl = function (url) {
        this.obj['mobile_web_url'] = url;
        return this;
    }

    /**
     * set android execution params
     * @param { string } param
     * @returns { LinkBuilder }
     */
    LinkBuilder.prototype.setAndroidExecutionParams = function (param) {
        this.obj['android_execution_params'] = param;
        return this;
    }

    /**
     * set ios execution params
     * @param { string } param
     * @returns { LinkBuilder }
     */
    LinkBuilder.prototype.setIosExecutionParams = function (param) {
        this.obj['ios_execution_params'] = param;
        return this;
    }

    /**
     * build
     * @returns {*|{}}
     */
    LinkBuilder.prototype.build = function () {
        return this.obj;
    }

    return LinkBuilder;

})();