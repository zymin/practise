(function ($) {
    $.fn.touchwipe = function (settings) {
        var config = {min_move_x: 20, min_move_y: 20, wipeLeft: function () {
        }, wipeRight: function () {
        }, wipeUp: function () {
        }, wipeDown: function () {
        }, preventDefaultEvents: true};
        if (settings)$.extend(config, settings);
        this.each(function () {
            var startX;
            var startY;
            var isMoving = false;

            function cancelTouch() {
                this.removeEventListener('touchmove', onTouchMove);
                startX = null;
                isMoving = false
            }

            function onTouchMove(e) {
                if (config.preventDefaultEvents) {
                    e.preventDefault()
                }
                if (isMoving) {
                    var x = e.touches[0].pageX;
                    var y = e.touches[0].pageY;
                    var dx = startX - x;
                    var dy = startY - y;
                    if (Math.abs(dx) >= config.min_move_x) {
                        cancelTouch();
                        if (dx > 0) {
                            config.wipeLeft()
                        } else {
                            config.wipeRight()
                        }
                    } else if (Math.abs(dy) >= config.min_move_y) {
                        cancelTouch();
                        if (dy > 0) {
                            config.wipeDown()
                        } else {
                            config.wipeUp()
                        }
                    }
                }
            }

            function onTouchStart(e) {
                if (e.touches.length == 1) {
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                    isMoving = true;
                    this.addEventListener('touchmove', onTouchMove, false)
                }
            }

            if ('ontouchstart'in document.documentElement) {
                this.addEventListener('touchstart', onTouchStart, false)
            }
        });
        return this
    }
})(jQuery);
$(document).ready(function () {
    var page_index = 1;
    var total_num = 12;
    $("body").touchwipe({wipeDown: function () {
        if (page_index < total_num) {
            var page_object = ".calendar_page_" + page_index;
            $(page_object).addClass("page_up");
            var timer = setTimeout(function () {
                $(page_object).removeClass("page_up").addClass("calendar_page_upend");
                page_index += 1;
                clearTimeout(timer);
            }, 600);
        }
        else {
        }
    }, wipeUp: function () {
        if (page_index > 1) {
            var page_object = ".calendar_page_" + (page_index - 1);
            $(page_object).addClass("page_down");
            var timer = setTimeout(function () {
                $(page_object).removeClass("calendar_page_upend").removeClass("page_down");
                page_index -= 1;
                clearTimeout(timer);
            }, 600);
        }
        else {
        }
    }, min_move_x: 80, min_move_y: 80, preventDefaultEvents: true});
    $(".link_1").bind("click", function () {
        var page_object = ".calendar_page_1";
        $(page_object).addClass("page_down");
        var timer = setTimeout(function () {
            $(page_object).removeClass("calendar_page_upend").removeClass("page_down");
            page_index = 1;
            var upend_set = $(".calendar_page_upend");
            for (var i = 0; i < upend_set.length; i++) {
                $(upend_set[i]).removeClass("calendar_page_upend");
            }
            clearTimeout(timer);
        }, 600);
    });
    var imgUrl = 'http://sunnyzhen.github.io/demo/calendar/image/calendar.jpg';
    var lineLink = location.href;
    var descContent = "腾讯2015校园招聘火热启动！送你一本小鹅历，助你校招大丰收！";
    var shareTitle = document.title;
    var appid = '';

    function shareFriend() {
        WeixinJSBridge.invoke('sendAppMessage', {"appid": appid, "img_url": imgUrl, "img_width": "200", "img_height": "200", "link": lineLink, "desc": descContent, "title": shareTitle}, function (res) {
        })
    }

    function shareTimeline() {
        WeixinJSBridge.invoke('shareTimeline', {"img_url": imgUrl, "img_width": "200", "img_height": "200", "link": lineLink, "desc": descContent, "title": shareTitle}, function (res) {
        });
    }

    function shareWeibo() {
        WeixinJSBridge.invoke('shareWeibo', {"content": descContent, "url": lineLink}, function (res) {
        });
    }

    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            shareFriend();
        });
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            shareTimeline();
        });
        WeixinJSBridge.on('menu:share:weibo', function (argv) {
            shareWeibo();
        });
    }, false);
});
/*  |xGv00|371ed58a6f05ca53d5d56ec7765cdfb7 */