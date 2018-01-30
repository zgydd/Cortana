'use strict';
//Format a date like (new Date()).Format('yyyy-MM-dd hh:mm:ss')
Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
//Get difference between a date to a timestamp
Date.prototype.getDiff = function(oldTimeStamp, hasDays) {
    var timeStampDiff = this.getTime() - oldTimeStamp;

    var days = hasDays ? Math.floor(timeStampDiff / (24 * 3600 * 1000)) : 0;
    var leave1 = hasDays ? (timeStampDiff % (24 * 3600 * 1000)) : timeStampDiff;
    var hours = Math.floor(leave1 / (3600 * 1000));
    var leave2 = leave1 % (3600 * 1000);
    var minutes = Math.floor(leave2 / (60 * 1000));
    var leave3 = leave2 % (60 * 1000);
    var seconds = Math.round(leave3 / 1000);

    var result = {};
    switch (true) {
        case (days > 0):
            result.d = days;
            result.h = hours;
            result.m = minutes;
            result.s = seconds;
            break;
        case (days <= 0 && hours > 0):
            result.h = hours;
            result.m = minutes;
            result.s = seconds;
            break;
        case (days <= 0 && hours <= 0 && minutes > 0):
            result.m = minutes;
            result.s = seconds;
            break;
        case (days <= 0 && hours <= 0 && minutes <= 0 && seconds > 0):
            result.s = seconds;
            break;
        default:
            break;
    }
    return result;
};
//Clone a array data
Array.prototype.clone = function() {
    var innerStr = JSON.stringify(this);
    return JSON.parse(innerStr);
};