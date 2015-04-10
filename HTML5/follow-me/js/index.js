/**
 * Created by eyestone001 on 2015/4/9.
 */
//canvas先画mask
var clientWidth = document.documentElement.clientWidth,clientHeight = document.documentElement.clientHeight;
var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
var maskContent = document.getElementById("mask");
var maskCtx = maskContent.getContext('2d');
var img = new Image();
img.onload = function(){
    resizeCanvas(maskContent,clientWidth,clientHeight);
    maskCtx.drawImage(img,0,0,clientWidth,clientHeight);
    maskCtx.globalCompositeOperation = "destination-out";
};
img.src = "images/slowly-music.jpg";
function resizeCanvas(canvas,width,height){
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').clearRect(0, 0, width, height);
}
function drawPoint(x,y){
    maskCtx.beginPath();
    maskCtx.arc(x,y,50,0,Math.PI*2,true);
    maskCtx.closePath();
    maskCtx.fillStyle = "#fff";
    maskCtx.fill();
}
function moveEvent(e){
    var offsetX = maskContent.offsetLeft,
        offsetY = maskContent.offsetTop;
    var x = ((device ? e.touches[0].clientX : e.clientX) + document.body.scrollLeft || e.pageX) - offsetX || 0;
    var y = ((device ? e.touches[0].clientY : e.clientY) + document.body.scrollTop || e.pageY) - offsetY || 0;
    drawPoint(x,y);
}
//画中奖画面
var lotteryContent = document.getElementById("lottery");
var lotteryCtx = lotteryContent.getContext('2d');
var lotteryImg = new Image();
lotteryImg.onload = function(){
    resizeCanvas(lotteryContent,clientWidth,clientHeight);
    lotteryCtx.drawImage(img,0,0,clientWidth,clientHeight);
};
lotteryImg.src = "images/busy.jpg";


window.onload = function(){
    maskContent.addEventListener('mousemove',moveEvent);
}