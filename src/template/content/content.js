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

exports.ContentBuilder = (function () {

    function ContentBuilder() {
        this.obj = {};
    }

    /**
     * set title
     * @param { string } title
     * @returns { ContentBuilder }
     */
    ContentBuilder.prototype.setTitle = function (title) {
        this.obj['title'] = title;
        return this;
    }

    /**
     * set image url
     * @param { string } url
     * @returns { ContentBuilder }
     */
    ContentBuilder.prototype.setImageUrl = function (url) {
        this.obj['image_url'] = url;
        return this;
    }

    /**
     * set image width
     * @param { number } width
     * @returns { ContentBuilder }
     */
    ContentBuilder.prototype.setImageWidth = function (width) {
        this.obj['image_width'] = width;
        return this;
    }

    /**
     * set image height
     * @param { number } height
     * @returns { ContentBuilder }
     */
    ContentBuilder.prototype.setImageHeight = function (height) {
        this.obj['image_height'] = height;
        return this;
    }

    /**
     * set description
     * @param { string } description
     * @returns { ContentBuilder }
     */
    ContentBuilder.prototype.setDescription = function (description) {
        this.obj['description'] = description;
        return this;
    }

    /**
     * set link (using link builder)
     * @param link
     * @returns { ContentBuilder }
     */
    ContentBuilder.prototype.setLink = function (link) {
        this.obj['link'] = link;
        return this;
    }

    /**
     * build
     * @return {*|{}}
     */
    ContentBuilder.prototype.build = function () {
        return this.obj;
    }

    return ContentBuilder;

})();