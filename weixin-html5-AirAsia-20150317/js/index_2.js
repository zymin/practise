/**
 * Created by eyestone001 on 2014/12/18.
 */
/**
 * Created by fierayan on 2014/11/13.
 */


// 缈昏浆鍥剧墖
function flipCard(){

    if(isFlip[pageNumber]===2){
        // 杞埌鍙嶉潰

        // 鑳屾櫙鍙樿壊
        $(".content-li").eq(pageNumber).addClass("fliped");

        // 鏄剧ず鎸囧紩
        setTimeout(function(){
            $(".notice-swipe-up").addClass("swipeMove");
        },1200);

        // 淇敼鍙傛暟
        isFlip[pageNumber]=1;

    }else{

        $(".content-li").eq(pageNumber).removeClass("fliped");
        isFlip[pageNumber]=2;

    }

}

// 婊戝姩灞忓箷鎿嶄綔鐩稿叧

// 涓婁竴灞�
function screenBack(){

    var transitionString;
    pageNumber--;

    if(pageNumber<0){
        pageNumber=0;
    }
    currentDistance=screenHeight*pageNumber;
    transitionString="top 0.5s ease-in";

    contentList.css({"top":-currentDistance,"-webkit-transition":transitionString,"transition":transitionString});
}

// 涓嬩竴灞�
function screenForward(){

    var transitionString;
    pageNumber++;

    if(!showTheLast && pageNumber===6){
        pageNumber=5;
    }

    if(pageNumber>6){
        pageNumber=6;
    }
    currentDistance=screenHeight*pageNumber;
    transitionString="top 0.5s ease-in";

    contentList.css({"top":-currentDistance,"-webkit-transition":transitionString,"transition":transitionString});

    // 鏄剧ず寮曞
    if(pageNumber!==6 ){
        if(pageNumber===5){
            if(showTheLast){
                setTimeout(function(){
                    $(".notice-swipe-up").addClass("swipeMove");
                },800);
            }
        }else{
            setTimeout(function(){
                $(".notice-swipe-up").addClass("swipeMove");
            },800);
        }

    }else{
        $(".notice-swipe-up").css("display","none");
    }
}

function startTouch(event) {
    if (!event.touches.length) {
        return;
    }
    tmpEndY = 0;
    var touch = event.touches[0];
    tmpStartY = touch.pageY;
}

function moveTouch(event) {
    event.preventDefault();
    if (!event.touches.length) {
        return;
    }
    var touch = event.touches[0];
    tmpEndY = touch.pageY;
}

// 瑙︽懜缁撴潫鏃跺垽鏂墽琛屼笂缈绘垨鑰呬笅缈�
function endTouch() {
    var endY = tmpEndY;
    var startY = tmpStartY;
    if (endY && endY !== startY && endY-startY<=-25) {
        console.log(pageNumber+":"+isFlip[pageNumber]);
        if(isFlip[pageNumber]<=1){
            screenForward();
            $(".notice-swipe-up").removeClass("swipeMove");

        }else{
            flipCard();
        }

    }else if(endY && endY !== startY && endY-startY>=25){
        console.log(pageNumber+":"+isFlip[pageNumber]);
        if(!isFlip[pageNumber] || isFlip[pageNumber]===2){
            screenBack();
        }else{
            flipCard();
        }

    }
}

// 婊戝姩鐩稿叧 end

// 棰勫姞杞藉浘鐗�

function preImg(ele){
    var img_src=$(ele).css("background-image");
    img_src=img_src.split("(")[1].split(")")[0];
    var preImg=new Image();
    preImg.src=img_src;
    return preImg;
}

// 姝ｅ紡寮€濮�

// 瀹氫箟鍙橀噺
var screenHeight=$(window).height();
var pageNumber=0;
var currentDistance=0;
var contentList=$(".content-list");
var tmpEndY,tmpStartY;
var isFlip=[0,2,2,2,0,0,0];
var showTheLast=0;

// 鍒ゆ柇鏄惁鐭睆鎵嬫満
var isShort;
if($(window).height()<=416){
    isShort=true;
}

// 姣忎竴椤甸珮搴﹁嚜閫傚簲
$(".content-li").each(function () {
    $(this).css("height", $(window).height());
});

// 闀垮睆骞曞鍔犺儗鏅�
if(screenHeight>504){
    var gapHeight=(screenHeight-504)/2;
    $(".p5__extra").css({"top":-gapHeight,"height":gapHeight+5});
    $(".p6__extra").css({"top":-gapHeight,"height":gapHeight+5});
}

// 缁戝畾缈婚〉
contentList.on("touchstart",function(e){
    startTouch(e);
});
contentList.on("touchmove",function(e){
    moveTouch(e);
});
contentList.on("touchend",function(e){
    endTouch(e);
});

// 杞藉叆鍚庢樉绀烘寚寮�
setTimeout(function(){
    $(".notice-swipe-up").addClass("swipeMove");
},500);

// 鍏佽婊氬埌鏈€鍚庝竴椤�
$(".p5__print-wrap").on("tap",function(){
    $(".p5__print").css("opacity","1");
    setTimeout(function(){
        showTheLast=1;
        screenForward();
    },300);
});

// 鏄剧ず鍒嗕韩娴眰
$(".p6__share-btn").on("tap",function(){

    $(".share-mask").css({"display":"block","-webkit-transition":"display 0.3s ease-in","transition":"display 0.3s ease-in"});
    setTimeout(function(){
        $(".share-mask").css("display","none");
    },1500);
});

