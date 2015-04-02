/**
 * Created by eyestone001 on 2015/3/26.
 */
function getNowDate(){
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();
    var clock = year+"-";
    if(month < 10)
        clock += "0";
    clock += month+"-";
    if(day < 10)
        clock += "0";
    if(hh < 10)
        hh = "0"+hh;
    if(mm < 10)
        mm = "0"+mm;
    if(ss < 10)
        ss = "0"+ss;
    clock += day+" "+hh+":"+mm+":"+ss;
    return clock;
}
function getUrlFlag(){
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var clock = year+"";
    if(month < 10)
        clock += "0";
    clock += month+"";
    if(day < 10)
        clock += "0";
    if(hh < 10)
        hh = "0"+hh;
    if(mm < 10)
        mm = "0"+mm;
    clock += day+""+hh+""+mm;
    return clock;
}
// 套餐到期时间
var service_expired_date = '2015-07-30 10:27:45';
var now_date =  getNowDate();
var is_show_expire = false;
if('1' == is_delete){
    var split_str =  error_url.indexOf('?') == -1 ? "?" : "&";
    error_url = error_url+split_str+"msg=<h4>很抱歉</h4><p>已被删除</p>";
    window.location.href = error_url;
}
if('0' == is_publish){
    var split_str =  error_url.indexOf('?') == -1 ? "?" : "&";
    error_url = error_url+split_str+"msg=<h4>很抱歉</h4><p>未找到相关信息</p>";
    window.location.href = error_url;
}
if(now_date > service_expired_date){
    var split_str =  error_url.indexOf('?') == -1 ? "?" : "&";
    error_url = error_url+split_str+"msg=<h4>抱歉</h4><p>商家的使用权限已经到期，无法访问。</p>";
    window.location.href = error_url;
}
// 判断有效期
if("2014-09-15 11:34:00" >now_date || "2015-09-01 11:34:00" < now_date){
    is_show_expire = true;
}
(function(){
    var phoneWidth = parseInt(window.screen.width),
        phoneScale = phoneWidth/640,
        ua = navigator.userAgent;

    if (/Android (\d+\.\d+)/.test(ua)){
        var version = parseFloat(RegExp.$1);
        // andriod 2.3
        if(version > 2.3){
            document.write('<meta name="viewport" content="width=640, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');
            // andriod 2.3以上
        }else{
            document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
        }
        // 其他系统
    } else {
        document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
    }
})();
// 过期
var coverUrl = '';
var endUrl = null;
if(true == is_show_expire){
}else{
    coverUrl = 'images/slowly-music.jpg';
    endUrl = '';
}
var config = {
    coverUrl:coverUrl,
    swipeCur: 0,
    is_show_expire:is_show_expire,
    swipeDir:'vertical', // 'vertical' // horizontal
    endUrl: endUrl // 滑动跳转的URL
}
//业务关联链接数组
var ary_biz_jump_id = new Array();
var ary_biz_jump_url = new Array();