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
    currentPage++;
    if(currentPage > 3){
        currentPage = 3;
        return;
    }
    pageTurn();
});
$("#prevButton").click(function() {
    currentPage--;
    if(currentPage < 0){
        currentPage = 0;
        return;
    }
    pageTurn();
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
function pageTurn(){
    currentDistance = currentPage * screenHeight;
    translateString="translate3d(0, -"+currentDistance+"px, 0)";
    transitionString = "all 1s linear";
    contentList.css({"transform":translateString,"-webkit-transform":translateString,"-webkit-transition":transitionString,"transition":transitionString})
    showElement(currentPage);
}