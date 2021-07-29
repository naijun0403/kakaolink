/**
 * Created by archethic on 2021/07/28
 */

'use strict';

module.exports = /** @class */ function (ErrorName) {
    function errForm(message) {
        this.message = message;
    }
    function CustomErrorType(message) {
        Error.captureStackTrace(this, this.constructor);
        this.message = message;
        errForm && errForm.call(this, arguments[0]);
    }

    CustomErrorType.prototype = new Error();
    CustomErrorType.prototype.name = ErrorName;
    CustomErrorType.prototype.constructor = CustomErrorType;
    
    return CustomErrorType;
}