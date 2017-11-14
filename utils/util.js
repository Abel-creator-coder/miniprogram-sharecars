const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formatTime = function (timestamp, fmt) {
  var fmt = fmt || 'yyyy-MM-dd hh:mm';
  var date = new Date();
  if (timestamp) {
    timestamp = parseInt(timestamp);
    date.setTime(timestamp * 1000);
  }
  var meta = {
    "M+": date.getMonth() + 1,                 //月份   
    "d+": date.getDate(),                    //日   
    "h+": date.getHours(),                   //小时   
    "m+": date.getMinutes(),                 //分   
    "s+": date.getSeconds(),                 //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in meta) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (meta[k]) : (("00" + meta[k]).substr(("" + meta[k]).length)));
    }
  }
  return fmt;
}
module.exports = {
  formatTime: formatTime
}
