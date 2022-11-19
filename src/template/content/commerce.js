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

exports.CommerceBuilder = (function () {

    function CommerceBuilder() {
        this.obj = {};
    }

    /**
     * set product name
     * @param { string } name
     * @returns { CommerceBuilder }
     */
    CommerceBuilder.prototype.setProductName = function (name) {
        this.obj['product_name'] = name;
        return this;
    }

    /**
     * set regular price
     * @param { number } price
     * @returns { CommerceBuilder }
     */
    CommerceBuilder.prototype.setRegularPrice = function (price) {
        this.obj['price'] = price;
        return this;
    }

    /**
     * set discount price
     * @param { number } price
     * @returns { CommerceBuilder }
     */
    CommerceBuilder.prototype.setDiscountPrice = function (price) {
        this.obj['discount_price'] = price;
        return this;
    }

    /**
     * set discount rate
     * @param { number } rate
     * @returns { CommerceBuilder }
     */
    CommerceBuilder.prototype.setDiscountRate = function (rate) {
        this.obj['discount_rate'] = rate;
        return this;
    }

    /**
     * set currency unit
     * @param { string } unit
     * @returns { CommerceBuilder }
     */
    CommerceBuilder.prototype.setCurrencyUnit = function (unit) {
        this.obj['currency_unit'] = unit;
        return this;
    }

    /**
     * set currency unit position
     * @param { number } position
     * @returns { CommerceBuilder }
     */
    CommerceBuilder.prototype.setCurrencyUnitPosition = function (position) {
        this.obj['currency_unit_position'] = position;
        return this;
    }

    /**
     * build
     * @returns {*|{}}
     */
    CommerceBuilder.prototype.build = function () {
        return this.obj;
    }

    return CommerceBuilder;

})();