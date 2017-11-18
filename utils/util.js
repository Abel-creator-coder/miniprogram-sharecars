//appid及appsecret
const AppConf = { 'appid': 'wxaa96bb0942b0eff2', 'appsecret': '0b44d65c2e289bc8bee75e5b9df23b99' };
const apiHost = 'https://ab.crm.magcloud.cc';
const formatTime = function (timestamp, fmt) {
  var fmt = fmt || 'yyyy-MM-dd hh:mm';
  timestamp = String(timestamp).replace('T',' ').replace('Z','');
  var date = new Date(timestamp);
//   if (timestamp) {
//       timestamp = parseInt(new Date(timestamp).getTime() / 1000);
//     date.setTime(timestamp * 1000);
//   }
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
};
const getDayType = function(timestamp) {
    timestamp = String(timestamp).replace('T', ' ').replace('Z', '');    
    timestamp = parseInt(new Date(timestamp).getTime() / 1000);
    var daytype = 0,
        currentTimestamp = parseInt(new Date().getTime() / 1000),
        currentDay = new Date().getDate();
    var currentMonth = new Date().getMonth();
    var currentYear = new Date().getFullYear();

    var todayStart = currentYear + '-' + (currentMonth + 1) + '-' + currentDay + ' 00:00:00',
        todayStartTimestamp = parseInt(new Date(todayStart).getTime() / 1000);

    var today = currentYear + '-' + (currentMonth + 1) + '-' + currentDay + ' 23:59:59',
        todayDiff = parseInt(new Date(today).getTime() / 1000) - parseInt(new Date().getTime() / 1000);

    var isToday = timestamp >= todayStartTimestamp && (timestamp - todayStartTimestamp) < 24 * 60 * 60;
    if (isToday) {
        daytype = 1;
    }
    var isTomorrow = (timestamp - currentTimestamp - todayDiff) > 0
        && (timestamp - currentTimestamp - todayDiff) < 24 * 60 * 60;
    if (isTomorrow) {
        daytype = 2;
    }
    return daytype;
};
module.exports = {
  formatTime: formatTime,
  getDayType: getDayType,
  AppConf: AppConf,
  apiHost: apiHost
}
