/**
 * Created by eyestone001 on 2015/4/16.
 */
var screenWidth = $(window).width()/2;
//tab中的点击事件
$(".home").on('click',function(){
    var translateString="translate3d(0, 0, 0)";
    $("#member-center").css({"display":"none"});
    $("#content-home").css({"display":"block"});
    $(".tabs-link").css({"transform":translateString,"-webkit-tansform":translateString})
});
$(".member-center").on("click",function(){
    var translateString="translate3d("+screenWidth+"px, 0, 0)";
    $("#member-center").css({"display":"block"});
    $("#content-home").css({"display":"none"});
    $(".tabs-link").css({"transform":translateString,"-webkit-tansform":translateString})
});
function carDetail(){
    window.location.href = "car-detail.html";
}
//nav中的点击事件
$(".pull_left").on("click",function(){
    var translateString="translate3d(0, 0, 0)";
    $("#modal-panel").css({"display":"block"});
    $("#left-nav").css({"transform":translateString});
});
$("#modal-panel").on("click",function(){
    var translateString="translate3d(-100%, 0, 0)";
    var translateStringRight="translate3d(100%, 0, 0)";
    $("#left-nav").css({"transform":translateString});
    $("#right-nav").css({"transform":translateStringRight});
    $("#modal-panel").css({"display":"none"});
});
$(".pull_right").on("click",function(){
    var translateString="translate3d(-100%, 0, 0)";
    $("#modal-panel").css({"display":"block"});
    $("#right-nav").css({"transform":translateString});
});
$(".tabs-content-home-search").on("click",function(){
    window.location.href = "search-for-cars.html";
});
//搜索中的点击事件
$("#show-options-plus").on("click",function(){
    $(this).css({"display":"none"});
    $("#hidden-search-list").slideDown();
    $("#show-options-minus").css({"display":"block"})
});
$("#show-options-minus").on("click",function(){
    $(this).css({"display":"none"});
    $("#show-options-plus").css({"display":"block"});
    $("#hidden-search-list").slideUp();
});
//车的详情中的事件
//按下鼠标并移动时(拖动)，调用的函数；
function startSelection(event){
    $("#car-img").css({"left":-screenWidth})
}

//解除移动时的处理函数；
function cancelSelection() {
    $(document).unbind('mousemove', startSelection).unbind('mouseup', cancelSelection);
}
//鼠标在按下时调用的函数
function imgMouseDown(event){
    $(document).mousemove(startSelection).mouseup(cancelSelection);
}
$("#car-img .img-items img").bind("mousedown",imgMouseDown);
$("#car-detail-comments-show").on("click",function(){
    $(this).css({"display":"none"});
    $("#car-detail-comments-hidden").css({"display":"block"});
    $("#comment-content").css({"display":"block"});
});
$("#car-detail-comments-hidden").on("click",function(){
    $(this).css({"display":"none"});
    $("#car-detail-comments-show").css({"display":"block"});
    $("#comment-content").css({"display":"none"});
});
//特别优惠页面中的事件
