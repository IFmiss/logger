var Logger = /** @class */ (function () {
    function Logger() {
        this.timing = window.performance.timing;
        this.initErrorEvent();
    }
    Logger.prototype.getTiming = function () {
        return {
            dns: this.timing.domainLookupEnd - this.timing.domainLookupStart
        };
    };
    /**
     * 初始化error监听事件
     */
    Logger.prototype.initErrorEvent = function () {
        /**
         * @param {String}  errorMessage   错误信息
         * @param {String}  scriptURL      出错文件的URL
         * @param {Number}  lineNumber     出错代码的行号
         * @param {Number}  columnNumber   出错代码的列号
         * @param {Object}  errorObj       错误信息Object
         */
        var _this = this;
        window.onerror = function (errorMessage, scriptURL, lineNumber, columnNumber, errorObj) {
            setTimeout(function () {
                _this.fetchError({
                    errorMessage: errorMessage,
                    scriptURL: scriptURL,
                    lineNumber: lineNumber,
                    columnNumber: columnNumber,
                    errorObj: errorObj
                });
            }, 0);
        };
    };
    /**
     * 事件错误的回调事件
     */
    Logger.prototype.fetchError = function (data) {
        console.log('data', data);
    };
    return Logger;
}());
window.logger = new Logger();
