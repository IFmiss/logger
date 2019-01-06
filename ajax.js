(function ($, w) {
    var _ajax = $.ajax;
    $.ajax = function (arg) {
        var t = new Date().getTime();
        return _ajax.call($, arg).complete(function (i) {
            console.log(newT - t);
            console.log('info', i);
            var newT = new Date().getTime();
            _ajax({
                url: 'http://www.daiwei.org/vue/server/home.php?inAjax=1&do=getRewardList'
            });
        });
    };
})(jQuery, window);
// (function ($, w) {
//   var jQ = $;
//   $.ajax = function (...arg) {
//       var t = new Date().getTime();
//       console.log('time', t);
//       return function () {
//           jQ.ajax.call(this, arg);
//       };
//   };
// })(jQuery, window);
