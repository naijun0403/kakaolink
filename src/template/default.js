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

    const { Button } = require('./content/button');

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
     * set object type as text
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setTypeAsText = function () {
        this.setType('text');
        return this;
    }

    /**
     * set object type as list
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setTypeAsList = function () {
        this.setType('list');
        return this;
    }

    /**
     * set object type as location
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setTypeAsLocation = function () {
        this.setType('location');
        return this;
    }

    /**
     * set object type as commerce
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setTypeAsCommerce = function () {
        this.setType('commerce');
        return this;
    }

    /**
     * set item content
     * @param item
     *
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setItemContent = function (item) {
        this.obj['item_content'] = item;
        return this;
    }

    /**
     * set content
     * @param content
     *
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setContent = function (content) {
        this.obj['content'] = content;
        return this;
    }

    /**
     * set contents
     * @param contents
     *
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setContents = function (contents) {
        this.obj['contents'] = contents;
        return this;
    }

    /**
     * set default button title
     * @param { string } title
     *
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setButtonTitle = function (title) {
        this.obj['button_title'] = title;
        return this;
    }

    /**
     * add button
     * @param { Button } button
     *
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.addButton = function (button) {
        if (button instanceof Button) {
            if (!this.obj['buttons']) this.obj['buttons'] = [];
            this.obj['buttons'].push(
                JSON.parse(JSON.stringify(button))
            )
        } else throw new Error('button is not Button instance');

        return this;
    }

    /**
     * using link builder
     * @param link
     *
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setLink = function (link) {
        this.obj['link'] = link;
        return this;
    }

    /**
     * set text
     * @param { string } text
     *
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setText = function (text) {
        this.obj['text'] = text;
        return this;
    }

    /**
     * set header title
     * @param { string } title
     *
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setHeaderTitle = function (title) {
        this.obj['header_title'] = title;
        return this;
    }

    /**
     * using link builder
     * @param link
     *
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setHeaderLink = function (link) {
        this.obj['header_link'] = link;
        return this;
    }

    /**
     * set address
     * @param { string } address
     *
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setAddress = function (address) {
        this.obj['address'] = address;
        return this;
    }

    /**
     * set address title
     * @param { string } title
     *
     * @returns { DefaultTemplateBuilder }
     */
    DefaultTemplateBuilder.prototype.setAddressTitle = function (title) {
        this.obj['address_title'] = title;
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