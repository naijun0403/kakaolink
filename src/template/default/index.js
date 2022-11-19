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

exports.DefaultTemplateBuilder = (function () {
    function DefaultTemplateBuilder() {
        this.linkVer = '4.0';
        this.obj = {}; // template_object
    }

    /**
     * set link version
     * @param linkVer
     *
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setLinkVersion = function (linkVer) {
        this.linkVer = linkVer;
        return this;
    }

    /**
     * set object type
     * @param type
     *
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setType = function (type) {
        this.obj['object_type'] = type;
        return this;
    }

    /**
     * set object type as feed
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setTypeAsFeed = function () {
        this.setType('feed');
        return this;
    }

    /**
     * set ItemContent
     *
     * @param item
     *
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setItemContent = function (item) {
        this.obj['item_content'] = item;
        return this;
    }

    /**
     * build
     * @returns {{template_object: (*|{}), link_ver: string}}
     */
    DefaultTemplateBuilder.prototype.build = function () {
        return {
            link_ver: this.linkVer,
            template_object: this.obj
        }
    }

    return DefaultTemplateBuilder;
})();