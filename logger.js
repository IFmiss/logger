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
            loadT: this.timing.domLoading - this.timing.navigationStart,
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
        window.addEventListener('error', function (e) {
            setTimeout(function () {
                _this.staticError({
                    errorMessage: e.message,
                    scriptURL: e.filename,
                    lineNumber: e.lineno,
                    columnNumber: e.colno,
                    errorObj: e.error
                });
            }, 0);
        });
    };
    /**
     * 事件错误的回调事件
     */
    Logger.prototype.staticError = function (data) {
        $.ajax({
            url: '',
            type: 'POST',
            dataType: 'json',
            data: {
                url: window.location.href,
                current_time: new Date().getTime(),
                js_url: data.scriptURL,
                error_info: data.errorMessage,
                error_line: data.lineNumber,
                error_column: data.columnNumber
            }
        });
    };
    /**
     * 页面加载时长的数据信息
     */
    Logger.prototype.fetchPageLoadInfo = function () {
        var timingInfo = this.getTiming();
        $.ajax({
            url: '',
            type: 'POST',
            dataType: 'json',
            data: {
                url: window.location.href,
                current_time: new Date().getTime(),
                response_time: timingInfo.loadT
            }
        });
    };
    return Logger;
}());
window.logger = new Logger();
window.addEventListener('load', function () {
    setTimeout(function () {
        logger.fetchPageLoadInfo();
    }, 1000);
}, false);
