class Logger {
  timing: object
  constructor () {
    this.timing = window.performance.timing
    this.initErrorEvent()
  }
  public getTiming (): any {
    return {
      dns: this.timing.domainLookupEnd - this.timing.domainLookupStart,
    }
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
    console.log('data', data)
  }
}

window.logger = new Logger()
