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

const { ModuleDebugService } = require('./module-debug-service');
exports.FileLogger = /** @class */ (function () {

    const { LogType } = require('./type');

    /**
     * FileLogger
     * @param { string } processName
     * @constructor
     */
    function FileLogger(processName) {
        this.processName = processName;
    }

    FileLogger.prototype.debug = function (message) {
        this.log(message, LogType.DEBUG);
    }

    FileLogger.prototype.error = function (message) {
        this.log(message, LogType.ERROR);
    }

    FileLogger.prototype.info = function (message) {
        this.log(message, LogType.INFO);
    }

    FileLogger.prototype.warn = function (message) {
        this.log(message, LogType.WARN);
    }

    /**
     * log
     * @param { string } message
     * @param { LogType } type
     */
    FileLogger.prototype.log = function (message, type) {
        const time = new Date();
        let logType = '';
        switch (type) {
            case LogType.DEBUG: {
                logType = 'DEBUG';
                break;
            }

            case LogType.ERROR: {
                logType = 'ERROR';
                break;
            }

            case LogType.INFO: {
                logType = 'INFO';
                break;
            }

            case LogType.WARN: {
                logType = 'WARN';
                break;
            }

            default: {
                throw new TypeError('Unknown Log Type: ' + type);
            }
        }

        const str = '<' + time.getFullYear() + '/' + time.getMonth() + 1 + '/' + time.getDate() + 1 + '> [' + this.processName + '] [' + logType + '] ' + message;

        this.appendLog(str);
    }

    /**
     * append log in file
     * @private
     * @param { string } message
     */
    FileLogger.prototype.appendLog = function (message) {
        if (ModuleDebugService.INSTANCE.isLogging) {
            FileStream.append(ModuleDebugService.INSTANCE.option.logPath, message);
        }
    }

    return FileLogger;

})();