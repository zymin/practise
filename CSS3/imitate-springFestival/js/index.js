/**
 * Created by eyestone001 on 2015/4/7.
 */
setTimeout(function(){
    $(".P0").addClass("ariseUp");
},1000);
//点击翻页事件
var contentList = $(".content-list");
var translateString = "";
var currentDistance = "";
var currentPage = 0;
var screenHeight = $(window).height();
var transitionString = "";
$("#nextButton").click(function(){//下一页
    if(isFlip[currentPage] == 2){
        isFlip[currentPage] = 1;
        $(".front-title").css('opacity',0);
        $(".front-dialogue").css('opacity',0);
        $(".front-img").addClass("flip");
        $(".back-img").css('opacity',1);
        $(".back-img").removeClass("flip");
        setTimeout(function(){
            $(".back-title").css('opacity',1);
        },1000);
        setTimeout(function(){
            $(".back_1_dialogue").css('opacity',1);
        },1500);
        setTimeout(function(){
            $(".back_2_dialogue").css('opacity',1);
        },2000);
        return;
    }
    currentPage++;
    if(currentPage > 4){
        currentPage = 4;
        return;
    }
    pageTurn(currentPage);
});
$("#prevButton").click(function() {
    if(isFlip[currentPage] == 1){
        $(".back-title").css('opacity',0);
        $(".back_1_dialogue").css('opacity',0);
        $(".back_2_dialogue").css('opacity',0);
        $(".back-img").css('opacity',0);
        $(".back-img").addClass("flip");
        $(".front-img").removeClass("flip");
        setTimeout(function () {
            $(".front-title").css('opacity',1);
        },1000);
        setTimeout(function () {
            $(".front-dialogue").css('opacity',1);
        },1500);
        isFlip[currentPage] = 2;
        return;
    }
    currentPage--;
    if(currentPage < 0){
        currentPage = 0;
        return;
    }
    pageTurn(currentPage);
})
function showElement(currentPage) {
    switch (currentPage){
        case 0:
            setTimeout(function(){
                $(".P0").addClass("ariseUp");
            },500);
            break;
        case 1:
            setTimeout(function(){
            $(".P1").addClass("scale");
        },500);
            break;
        case 2:
            setTimeout(function(){
                $(".P2").addClass("scaleRotate");
            },1000);
            break;
        case 3:
            setTimeout(function(){
                $(".front-title").css('opacity',1);
            },500);
            setTimeout(function(){
                $(".front-dialogue").addClass("skim-over");
            },1000);
            setTimeout(function(){
                $(".front-img").css('opacity',1);
            },500);
            break;
    }
}
/*图片预加载*/
function prevImg(element){
    var imgSrc = $(element).src;
    var img = new Image();
    img.src = imgSrc;
    return img;
}
/*翻页*/
function pageTurn(currentPage){
    currentDistance = currentPage * screenHeight;
    translateString="translate3d(0, -"+currentDistance+"px, 0)";
    transitionString = "all 1s linear";
    contentList.css({"transform":translateString,"-webkit-transform":translateString,"-webkit-transition":transitionString,"transition":transitionString})
    showElement(currentPage);
}
/*P3模块的动画*/
var isFlip = [0,0,0,2,0];//用来判断点击一次发生的是在当前页面的翻转