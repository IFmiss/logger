var Logger = /** @class */ (function () {
    function Logger() {
        this.timing = window.performance.timing;
        this.initErrorEvent();
    }
    Logger.prototype.getTiming = function () {
        var _return = {
            // DNS查询耗时
            dnsT: this.timing.domainLookupEnd - this.timing.domainLookupStart,
            // 白屏时间
            loadT: this.timing.responseStart - this.timing.navigationStart,
            // request请求耗时
            requestT: this.timing.responseEnd - this.timing.responseStart,
            // TCP链接耗时
            tcpT: this.timing.connectEnd - this.timing.connectStart,
            // 解析dom树耗时
            renderDomT: this.timing.domComplete - this.timing.domInteractive,
            // domready时间(用户可操作时间节点) 
            readyDomT: this.timing.domContentLoadedEventEnd - this.timing.navigationStart,
            // onload时间(总下载时间)
            onLoadT: this.timing.loadEventEnd - this.timing.navigationStart
        };
        return _return;
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
window.onload = function () {
    window.logger = new Logger();
    // console.log(logger.timing.loadEventEnd);
    // console.log(logger.timing.navigationStart);
    // console.log(logger.timing.loadEventEnd - logger.timing.navigationStart);
    // console.log(logger.timing);
    // console.log(logger.getTiming());
    setTimeout(function () {
        console.log(logger.getTiming());
    }, 300);
};
