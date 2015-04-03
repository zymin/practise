/**
 * Created by eyestone001 on 2015/4/2.
 */
function $setCookie(a, b, c, d, e, f) {
    var g = new Date, c = arguments[2] || null, d = arguments[3] || "/", e = arguments[4] || null, f = arguments[5] || !1;
    c ? g.setMinutes(g.getMinutes() + parseInt(c)) : "", document.cookie = a + "=" + escape(b) + (c ? ";expires=" + g.toGMTString() : "") + (d ? ";path=" + d : "") + (e ? ";domain=" + e : "") + (f ? ";secure" : "")
}
function $getCookie(a) {
    var b = new RegExp("(^| )" + a + "(?:=([^;]*))?(;|$)"), c = document.cookie.match(b);
    return c ? c[2] ? unescape(c[2]) : "" : null
}
function param() {
    return strToJson(location.search, "?", "&")
}
function strToJson(a, b, c) {
    var f, g, h, d = a.replace(b, "").split(c), e = {};
    for (f = 0, g = d.length; g > f; f++)h = d[f].split("="), e[h[0]] = h[1];
    return e
}
function preImg2(a, b) {
    var d, c = $(a).css("background-image");
    return c = c.split("(")[1].split(")")[0], 0 == c.indexOf('"') && (c = c.replace(/\"/g, "")), d = new Image, d.onload = b, d.src = c, d
}
$(document).ready(function () {
    var e, f, g, h, i, a = navigator.userAgent.toLowerCase(), b = "android" == a.match(/android/i), c = a.indexOf("android"), d = parseFloat(a.slice(c + 8));
    b && 3 > d ? head.load("js/index.js", "css/icon.css", "css/p0.css", "css/p1.css", "css/p2.css", "css/p3.css", function () {
        var a = preImg(".p1__f_img");
        a.onload = function () {
            $(".loading-wrap").css("display", "none"), head.load("css/p4.css", "css/p5.css", "css/p6_2.css", function () {
                var a = preImg(".share-guide");
                a.onload = function () {
                    $(".share-mask").css("display", "none")
                }
            })
        }
    }) : head.load("js/index.js", "css/icon.css", "css/p0.css", "css/p1.css", "css/p2.css", "css/p3.css", function () {
        preImg2(".p1__f_img", function () {
            function c() {
                $("html").on("touchstart", function () {
                    0 == b && (a.play(), b = 1)
                })
            }

            var a, b;
            $(".loading-wrap").css("display", "none"), a = document.querySelector("audio"), a.oncanplay = c(), b = 0, $(".speaker").css("display", "block"), head.load("css/p4.css", "css/p5.css", "css/p6.css", function () {
                preImg2(".share-guide", function () {
                    $(".share-mask").css("display", "none")
                })
            })
        })
    }), e = localStorage ? localStorage.getItem("timer") : "", e = e ? e : $getCookie("spring_pv"), f = "2015央视春晚主题发布!", g = "2015央视春晚邀您一起参与全民“家和万事兴”行动", h = param(), i = "http://yao.qq.com/tv/entry?redirect_uri={#redirect_uri#}&cb41faa22e731e9b={#cb41faa22e731e9b#}&t=" + new Date, i = i.replace("{#redirect_uri#}", encodeURIComponent("http://yaotv.qq.com/shake_tv/proj/spring_festival/my-demo.html")).replace("{#cb41faa22e731e9b#}", h.cb41faa22e731e9b), e && !isNaN(parseInt(e)) ? ($(".p6__number").html(e), $(".part.p6__p").show(), f = "春晚“家和万事兴”行动,我是第" + e + "位参与者!") : $.ajax({type: "GET", url: "http://yao.qq.com/tv/pv?pageid=1001", dataType: "jsonp", success: function (a) {
        0 == a["errorCode"] && (a = a["data"], isNaN(parseInt(a["pv"])) || ($(".p6__number").html(a["pv"]), $(".part.p6__p").show(), f = "春晚“家和万事兴”行动,我是第" + a["pv"] + "位参与者!", $(".p5__print-wrap").on("tap", function () {
            localStorage && localStorage.setItem("timer", a["pv"]), $setCookie("spring_pv", a["pv"], 7200), shaketv.wxShare("http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/img/thumb-logo.jpg", f, g, i)
        }), $(".p5__print-wrap").on("longTap", function () {
            localStorage && localStorage.setItem("timer", a["pv"]), $setCookie("spring_pv", a["pv"], 7200), shaketv.wxShare("http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/img/thumb-logo.jpg", f, g, i)
        })))
    }}), shaketv.wxShare("http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/img/thumb-logo.jpg", f, g, i)
}), window.onresize = function () {
    $(".content-li").each(function () {
        $(this).css("height", $(window).height())
    }), screenHeight = $(window).height()
}, setTimeout(function () {
    $(window).resize()
}, 1e3);