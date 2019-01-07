class Logger {
  timing: object
  constructor () {
    this.timing = window.performance.timing
    this.initErrorEvent()
  }
  public getTiming (): any {
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
    }
    return _return
  }

  /**
   * 初始化error监听事件
   */
  private initErrorEvent (): void {
    /**
     * @param {String}  errorMessage   错误信息
     * @param {String}  scriptURL      出错文件的URL
     * @param {Number}  lineNumber     出错代码的行号
     * @param {Number}  columnNumber   出错代码的列号
     * @param {Object}  errorObj       错误信息Object
     */
    var _this = this
    window.onerror = function(errorMessage, scriptURL, lineNumber,columnNumber,errorObj) { 
      setTimeout(() => {
        _this.fetchError({
          errorMessage,
          scriptURL,
          lineNumber,
          columnNumber,
          errorObj
        })
      }, 0);
    }
  }

  /**
   * 事件错误的回调事件
   */
  public fetchError (data: object): void {
    window._ajax('data', data)
  }

  /**
   * 页面加载时长的数据信息
   */
  public fetchPageLoadInfo (): void {
    var timingInfo = this.getTiming()
    // window._ajax('data', timingInfo)
    console.log(timingInfo)
  }
}

window.onload = function (): void {
  window.logger = new Logger();

  setTimeout(function() {
    logger.fetchPageLoadInfo()
  }, 1000)
}
