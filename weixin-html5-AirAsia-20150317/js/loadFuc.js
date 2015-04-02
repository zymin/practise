/**
 * Created by eyestone001 on 2014/12/18.
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
    b && 3 > d ? head.load("css/icon.css", function () {
        var a = preImg(".p1__bubble");
        a.onload = function () {
            $(".loading-wrap").css("display", "none"), head.load(function () {
                var a = preImg(".share-guide");
                a.onload = function () {
                    $(".share-mask").css("display", "none")
                }
            })
        }
    }) : head.load("js/index.js", "css/icon.css", "css/p0.css",  function () {
        var a = preImg2(".p1__bubble");
        a.onload = function () {
            function c() {
                $("html").on("touchstart", function () {
                    0 == b && (a.play(), b = 1)
                })
            }

            var a, b;
            $(".loading-wrap").css("display", "none"), b = 0, $(".speaker").css("display", "block"), head.load( function () {
                var a = preImg2(".p1__bubble");
                a.onload = function () {
                    $(".share-mask").css("display", "none")
                }
            })
        }
    })
}), window.onresize = function () {
    $(".content-li").each(function () {
        $(this).css("height", $(window).height())
    }), screenHeight = $(window).height()
}, setTimeout(function () {
    $(window).resize()
}, 1e3);