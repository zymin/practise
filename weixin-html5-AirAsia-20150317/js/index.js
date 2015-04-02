/**
 * Created by fierayan on 2014/11/13.
 */


// 渐显元素
function showElement(){
//    alert('pageNumber='+pageNumber);
    switch (pageNumber){
        case 1:
            setTimeout(function(){
                $(".p2__bubble").addClass("riseUp");
            },500);
            break;
        case 2:
            setTimeout(function(){
                $(".p3__bubble").addClass("riseUp");
            },500);
            break;
        case 3:
            setTimeout(function(){
                $(".p4__bubble").addClass("riseUp");
            },500);
            break;
        case 4:
            setTimeout(function(){
                $(".p5__bubble").addClass("riseUp");
            },500);
            break;
        case 5:
            setTimeout(function(){
                $(".p6__bubble").addClass("riseUp");
            },500);
            break;
        case 6:
            setTimeout(function(){
                $(".p7__bubble").addClass("riseUp");
            },500);
            break;
        case 7:
            setTimeout(function(){
                $(".p8__bubble").addClass("riseUp");
            },500);
            break;
        case 8:
            setTimeout(function(){
                $(".p9__bubble").addClass("riseUp");
            },500);
            setTimeout(function(){
                $(".p9__share-btn").addClass("riseUp");
            },1000);
            break;
        default :
            break;
    }
}
// 隐藏内容
function hideContent(){
}
// 显示内容
function showContent(){
}

// 翻转图片
function flipCard(){
}

// 滑动屏幕操作相关

// 上一屏
function screenBack(){

    var translateString,transitionString;
    pageNumber--;

    if(pageNumber<0){
        pageNumber=0;
    }
    currentDistance=screenHeight*pageNumber;
    translateString="translate3d(0, -"+currentDistance+"px, 0)";
    transitionString="all 0.5s ease-in";
    $(".notice-swipe-up").css("display","block");
    contentList.css({"-webkit-transform":translateString,"transform":translateString,"-webkit-transition":transitionString,"transition":transitionString});
}

// 下一屏
function screenForward(){

    var translateString,transitionString;
    pageNumber++;
    if(!showTheLast && pageNumber===10){
        pageNumber=9;
    }

    if(pageNumber>10){
        pageNumber=10;
    }
    currentDistance=screenHeight*pageNumber;
//    translateString="translate3d(0, -"+currentDistance+"px, 0)";
    translateString="translate3d(0, -"+currentDistance+"px, 0)";
    transitionString="all 0.5s ease-in";

    contentList.css({"-webkit-transform":translateString,"transform":translateString,"-webkit-transition":transitionString,"transition":transitionString});
    // 显示元素
    showElement();
    // 显示指引
    if(pageNumber!==9){
        setTimeout(function(){
            $(".notice-swipe-up").addClass("swipeMove");
        },800);

    }else{
        $(".notice-swipe-up").css("display","none");
    }
}

function startTouch(event) {//手指放在屏幕上的时候触发
    if (!event.touches.length) {
        return;
    }
    tmpEndY = 0;
    var touch = event.touches[0];//获取第一个触点
    tmpStartY = touch.pageY;
}

function moveTouch(event) {//手指移动的时候触发
    event.preventDefault();//阻止出现滚动条
    if (!event.touches.length) {
        return;
    }
    var touch = event.touches[0];
    tmpEndY = touch.pageY;
}

// 触摸结束时判断上翻或下翻
function endTouch() {//手指从屏幕上拿起的时候触发
    var endY = tmpEndY;
    var startY = tmpStartY;
//    alert('endY='+endY+'-----startY='+startY);
//    alert('pageNumber='+pageNumber+'==============isFlip[pageNumber]='+isFlip[pageNumber]);
    if (endY && endY !== startY && endY-startY<=-25) {
//        console.log(pageNumber+":"+isFlip[pageNumber]);
//        if(isFlip[pageNumber]<=1){
            screenForward();
//            $(".notice-swipe-up").removeClass("swipeMove");

//        }

    }else if(endY && endY !== startY && endY-startY>=25){
//        console.log(pageNumber+":"+isFlip[pageNumber]);
//        if(!isFlip[pageNumber] || isFlip[pageNumber]===2){
            screenBack();
//        }

    }
}

// 滑动 end

// 预加载图片

function preImg(ele){
    var img_src=$(ele).css("background-image");
    img_src=img_src.split("(")[1].split(")")[0];
    var preImg=new Image();
    preImg.src=img_src;
    return preImg;
}

// 正文开始

// 定义变量
var screenHeight=$(window).height();
var pageNumber=0;
var currentDistance=0;
var contentList=$(".content-list");
var tmpEndY,tmpStartY;
//var isFlip=[0,0,0,0,0,0,0,0];
var showTheLast=0;


// 判断是否安卓

var sUserAgent = navigator.userAgent.toLowerCase();
var bIsAndroid = sUserAgent.match(/android/i) == "android";

// 判断是否短屏
var isShort;
if($(window).height()<=416){
    isShort=true;
}


// 每一页高度自适应
$(".content-li").each(function () {
    $(this).css("height", $(window).height());
});

// 长屏幕增加背景
if(screenHeight>504){
    var gapHeight=(screenHeight-504)/2;
    $(".p5__extra").css({"top":-gapHeight,"height":gapHeight+5});
    $(".p6__extra").css({"top":-gapHeight,"height":gapHeight+5});
}

// 首页动画
setTimeout(function(){
    $(".p1__bubble").addClass("riseUp");
//    $(".p2__bubble").addClass("riseUp");
//    $(".p3__bubble").addClass("riseUp");
//    $(".p4__bubble").addClass("riseUp");
//    $(".p5__bubble").addClass("riseUp");
//    $(".p6__bubble").addClass("riseUp");
//    $(".p7__bubble").addClass("riseUp");
//    $(".p8__bubble").addClass("riseUp");
//    $(".p9__bubble").addClass("riseUp");
//    $(".p10__bubble").addClass("riseUp");
},500);
//setTimeout(function(){
//    $(".p9__share-btn").addClass("riseUp");
//},1000);



// 绑定翻页
contentList.on("touchstart",function(e){
    startTouch(e);
});
contentList.on("touchmove",function(e){
    moveTouch(e);
});
contentList.on("touchend",function(e){
    endTouch(e);
});

// 绑定后显示指引
setTimeout(function(){
    $(".notice-swipe-up").addClass("swipeMove");
},500);

// 显示分享浮沉
$(".p9__share-btn").on("tap",function(){
    screenForward();
});