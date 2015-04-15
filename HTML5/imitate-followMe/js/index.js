/**
 * Created by eyestone001 on 2015/4/9.
 */
//canvas先画mask
var clientWidth = document.documentElement.clientWidth,clientHeight = document.documentElement.clientHeight;
var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
var maskContent = document.getElementById("mask");
var maskCtx = maskContent.getContext('2d');
var img = new Image();
var isTouch = false;
img.onload = function(){
    resizeCanvas(maskContent,clientWidth,clientHeight);
    maskCtx.drawImage(img,0,0,clientWidth,clientHeight);
    maskCtx.globalCompositeOperation = 'destination-out';
};
img.src = "image/mask.jpg";
//画中奖画面
var lotteryContent = document.getElementById("lottery");
var lotteryCtx = lotteryContent.getContext('2d');
var lotteryImg = new Image();
lotteryImg.src = "image/busy.jpg";
lotteryImg.onload = function(){
    resizeCanvas(lotteryContent,clientWidth,clientHeight);
    lotteryCtx.drawImage(lotteryImg,0,0,clientWidth,clientHeight);
};
//事件
function resizeCanvas(canvas,width,height){
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').clearRect(0, 0, width, height);
}
function drawPoint(x,y){
    if(isTouch == true){
        maskCtx.beginPath();
        maskCtx.arc(x,y,50,0,Math.PI*2,true);
        maskCtx.closePath();
        maskCtx.fillStyle = "#fff";
        maskCtx.fill();
    }
}
function moveEvent(e){
    if(device == true){
        e.preventDefault();
    }
    var offsetX = maskContent.offsetLeft,
        offsetY = maskContent.offsetTop;
    var x = ((device ? e.touches[0].clientX : e.clientX) + document.body.scrollLeft || e.pageX) - offsetX || 0;
    var y = ((device ? e.touches[0].clientY : e.clientY) + document.body.scrollTop || e.pageY) - offsetY || 0;
    drawPoint(x,y);
}
function startEvent(e){
    isTouch = true;
    if(device == true){
        e.preventDefault();
    }
    var offsetX = maskContent.offsetLeft,
        offsetY = maskContent.offsetTop;
    var x = ((device ? e.touches[0].clientX : e.clientX) + document.body.scrollLeft || e.pageX) - offsetX || 0;
    var y = ((device ? e.touches[0].clientY : e.clientY) + document.body.scrollTop || e.pageY) - offsetY || 0;
    drawPoint(x,y);
}
function endEvent(e){
    if(device == true){
        e.preventDefault();
    }
    isTouch = false;
}
window.onload = function(){
//    鼠标事件
    maskContent.addEventListener('mousemove',moveEvent);
    maskContent.addEventListener('mousedown',startEvent);
    maskContent.addEventListener('mouseup',endEvent);
//    手机滑动事件
    maskContent.addEventListener('touchmove',moveEvent);
    maskContent.addEventListener('touchstart',startEvent);
    maskContent.addEventListener('touchend',endEvent);
}