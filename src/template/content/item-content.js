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

exports.ItemContentBuilder = (function () {

    const { ItemInfo } = require("./item-info");

    function ItemContentBuilder() {
        this.obj = {};
    }

    /**
     * set profile text
     * @param { string } text
     * @returns { ItemContentBuilder }
     */
    ItemContentBuilder.prototype.setProfileText = function (text) {
        this.obj['profile_text'] = text;
        return this;
    }

    /**
     * set profile image url
     * @param { string } url
     * @returns { ItemContentBuilder }
     */
    ItemContentBuilder.prototype.setProfileImageUrl = function (url) {
        this.obj['profile_image_url'] = url;
        return this;
    }

    /**
     * set title image text
     * @param { string } text
     * @returns { ItemContentBuilder }
     */
    ItemContentBuilder.prototype.setTitleImageText = function (text) {
        this.obj['title_image_text'] = text;
        return this;
    }

    /**
     * set title image url
     * @param { string } url
     * @returns { ItemContentBuilder }
     */
    ItemContentBuilder.prototype.setTitleImageUrl = function (url) {
        this.obj['title_image_url'] = url;
        return this;
    }

    /**
     * set title image category
     * @param { string } category
     * @returns { ItemContentBuilder }
     */
    ItemContentBuilder.prototype.setTitleImageCategory = function (category) {
        this.obj['title_image_category'] = category;
        return this;
    }

    /**
     * add item info
     * @param { ItemInfo } itemInfo
     * @returns { ItemContentBuilder }
     */
    ItemContentBuilder.prototype.addItemInfo = function (itemInfo) {
        if (itemInfo instanceof ItemInfo) {
            if (!this.obj['items']) this.obj['items'] = [];
            this.obj['items'].push(
                JSON.parse(JSON.stringify(itemInfo))
            )
        } else throw new Error('itemInfo is not ItemInfo instance');

        return this;
    }

    /**
     * set summary
     * @param { string } text
     * @returns {ItemContentBuilder}
     */
    ItemContentBuilder.prototype.setSummary = function (text) {
        this.obj['sum'] = text;
        return this;
    }

    /**
     * set summary op
     * @param { string } text
     * @returns { ItemContentBuilder }
     */
    ItemContentBuilder.prototype.setSummaryOp = function (text) {
        this.obj['sum_op'] = text;
        return this;
    }

    /**
     * build
     */
    ItemContentBuilder.prototype.build = function () {
        return this.obj;
    }

    return ItemContentBuilder;

})();