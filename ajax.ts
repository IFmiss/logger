(function ($, w) {
  var _ajax = $.ajax;
  $.ajax = function (arg) {
    var t = new Date().getTime();
    return _ajax.call($, arg).complete(function (i) {
      console.log(newT - t);
      console.log('info', i)
      console.log(location.href)
      var newT = new Date().getTime();
      _ajax({
        url: 'http://www.daiwei.org/vue/server/home.php?inAjax=1&do=getRewardList'
      })
    });
  };
})(jQuery, window);
