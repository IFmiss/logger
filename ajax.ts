(function ($, w) {
  w._ajax = $.ajax;
  $.ajax = function (arg) {
      var t = new Date().getTime();
      var success = arg.success
      // var successArg = arg.success
      arg.success = function () {
          var data = arguments
          var newT = new Date().getTime();
          // console.log(newT - t);
          var newS = function () {
              console.log(1111111)
              success.call(this, data)
          }
          _ajax({
              url: 'http://www.daiwei.org/vue/server/home.php?inAjax=1&do=getRewardList',
              success: newS
          });
      }
      return _ajax.call($, arg)
  };
})(jQuery, window);
