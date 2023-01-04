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

exports.ModuleDebugService = (function () {

    function ModuleDebugService() {
        this.isLogging = false;
        /** @type { LogOption } */ this.option = {};
    }

    ModuleDebugService.INSTANCE = new ModuleDebugService();

    /**
     * register logger
     * @param { LogOption } option
     */
    ModuleDebugService.registerLogger = function (option) {
        this.INSTANCE.isLogging = true;

        if (!option) {
            this.INSTANCE.option = {
                logPath: '../../log',
                option: {
                    apiService: true,
                    linkClient: true,
                    devClient: true
                }
            }
        } else {
            this.INSTANCE.option = option;
        }
    }

    return ModuleDebugService;

})();

/**
 * @typedef { Record<string, boolean> } OptionLogOn
 *
 * @property { boolean } apiService
 * @property { boolean } linkClient
 * @property { boolean } devClient
 */

/**
 * @typedef { Record<string, unknown> } LogOption
 *
 * @property { string } logPath
 * @property { OptionLogOn } option
 */