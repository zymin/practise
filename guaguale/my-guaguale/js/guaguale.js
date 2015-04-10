/**
 * Created by eyestone001 on 2015/3/27.
 */
/*
* id：刮奖容器的id
 cover：涂层内容，可以为图片地址或颜色值，可空，默认为 #ccc
 coverType：涂层类型，值为 image 或 color，可空，默认为 color
 width：刮奖区域宽度，默认为300px，可空
 height：刮奖区域高度，默认为100px，可空
 drawPercentCallback：刮开的区域百分比回调，可空
 然后还定义了几个需要用到的变量：
 background：第一个canvas元素
 backCtx：background元素的2d上下文（context）
 mask：第二个canvas元素
 maskCtx：mask元素的2d上下文（context）
 lottery：刮开后显示的内容，可以为图片地址或字符串
 lotteryType：刮开后显示的内容类型，值为 image 或 text，要跟lottery匹配
 clientRect：用于记录mask元素的 getBoundingClientRect() 值,=====getBoundingClientRect()这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。
* */
function Lottery(id, cover, coverType, width, height, drawPercentCallback) {//Lottery类
    this.conId = id;
    this.conNode = document.getElementById(this.conId);
    this.cover = cover;
    this.coverType = coverType;
    this.background = null;
    this.backCtx = null;
    this.mask = null;
    this.maskCtx = null;
    this.lottery = null;
    this.lotteryType = 'image';
    this.width = width || 300;
    this.height = height || 100;
    this.clientRect = null;
    this.drawPercentCallback = drawPercentCallback;
}

Lottery.prototype = {
    createElement: function (tagName, attributes) {
        var ele = document.createElement(tagName);
        for (var key in attributes) {
            ele.setAttribute(key, attributes[key]);
        }
        return ele;
    },
    getTransparentPercent: function(ctx, width, height) {
        var imgData = ctx.getImageData(0, 0, width, height),
            pixles = imgData.data,
            transPixs = [];
        for (var i = 0, j = pixles.length; i < j; i += 4) {
            var a = pixles[i + 3];
            if (a < 128) {
                transPixs.push(i);
            }
        }
        return (transPixs.length / (pixles.length / 4) * 100).toFixed(2);
    },
    resizeCanvas: function (canvas, width, height) {
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').clearRect(0, 0, width, height);
    },
    drawPoint: function (x, y) {//画出的形状
        this.maskCtx.beginPath();
        var radgrad = this.maskCtx.createRadialGradient(x, y, 0, x, y, 30);
        radgrad.addColorStop(0, 'rgba(0,0,0,0.6)');
        radgrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        this.maskCtx.fillStyle = radgrad;
        this.maskCtx.arc(x, y, 30, 0, Math.PI * 2, true);
        this.maskCtx.fill();
        if (this.drawPercentCallback) {
            this.drawPercentCallback.call(null, this.getTransparentPercent(this.maskCtx, this.width, this.height));
        }
    },
    bindEvent: function () {
        var _this = this;
        var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
        var clickEvtName = device ? 'touchstart' : 'mousedown';//三目运算符，判断是手机或是是电脑，不同设备绑定不同的事件，电脑
        var moveEvtName = device? 'touchmove': 'mousemove';//手机或者平板电脑，device为false的时候是电脑
        if (!device) {//电脑鼠标
            var isMouseDown = false;
            document.addEventListener('mouseup', function(e) {
                isMouseDown = false;
            }, false);
        } else {//手机触摸
            document.addEventListener("touchmove", function(e) {
                if (isMouseDown) {
                    e.preventDefault();
                }
            }, false);
            document.addEventListener('touchend', function(e) {
                isMouseDown = false;
            }, false);
        }
        this.mask.addEventListener(clickEvtName, function (e) {//添加电脑上的点击事件
            isMouseDown = true;
            var docEle = document.documentElement;
            if (!_this.clientRect) {
                _this.clientRect = {
                    left: 0,
                    top:0
                };
            }
            var x = (device ? e.touches[0].clientX : e.clientX) - _this.clientRect.left + docEle.scrollLeft - docEle.clientLeft;
            var y = (device ? e.touches[0].clientY : e.clientY) - _this.clientRect.top + docEle.scrollTop - docEle.clientTop;
            _this.drawPoint(x, y);
        }, false);

        this.mask.addEventListener(moveEvtName, function (e) {
            if (!device && !isMouseDown) {
                return false;
            }
            var docEle = document.documentElement;
            if (!_this.clientRect) {
                _this.clientRect = {
                    left: 0,
                    top:0
                };
            }
            var x = (device ? e.touches[0].clientX : e.clientX) - _this.clientRect.left + docEle.scrollLeft - docEle.clientLeft;
            var y = (device ? e.touches[0].clientY : e.clientY) - _this.clientRect.top + docEle.scrollTop - docEle.clientTop;
            _this.drawPoint(x, y);
        }, false);
    },
//    添加二个canvas到刮奖容器，并获取2d上下文,这里用于了createElement工具方法，另外还绑定了事件
    drawLottery: function () {
//        alert(this.width);在这里this.width是300
        this.background = this.background || this.createElement('canvas', {
            style: 'position:absolute;left:0;top:0;'
        });
        this.mask = this.mask || this.createElement('canvas', {
            style: 'position:absolute;left:0;top:0;'
        });
//        alert(this.width);仍然是300
        if (!this.conNode.innerHTML.replace(/[\w\W]| /g, '')) {//在lotteryContainer中添加两个canvas
            this.conNode.appendChild(this.background);
            this.conNode.appendChild(this.mask);
            this.clientRect = this.conNode ? this.conNode.getBoundingClientRect() : null;
            this.bindEvent();
        }
//        alert(this.width);仍然是300
        this.backCtx = this.backCtx || this.background.getContext('2d');
        this.maskCtx = this.maskCtx || this.mask.getContext('2d');
//第一个canvas分两种类型，image 和 string，如果是图片直接用canvas的drawImage就可以了，如果是string，要先用白色填充，然后在上下左右居中的地方绘制字符串，代码如下
        if (this.lotteryType == 'image') {//刮奖之后的内容的类型，画刮奖之后的图片
            var image = new Image(),
                _this = this;
//            alert(this.width):仍然是300
            image.onload = function () {
                _this.width = this.width;
                _this.height = this.height;
                _this.resizeCanvas(_this.background, this.width, this.height);
                _this.backCtx.drawImage(this, 0, 0);
                _this.drawMask();
            }
            image.src = this.lottery;
        } else if (this.lotteryType == 'text') {
            this.width = this.width;
            this.height = this.height;
            this.resizeCanvas(this.background, this.width, this.height);
            this.backCtx.save();
            this.backCtx.fillStyle = '#FFF';
            this.backCtx.fillRect(0, 0, this.width, this.height);
            this.backCtx.restore();
            this.backCtx.save();
            var fontSize = 30;
            this.backCtx.font = 'Bold ' + fontSize + 'px Arial';
            this.backCtx.textAlign = 'center';
            this.backCtx.fillStyle = '#F60';
            this.backCtx.fillText(this.lottery, this.width / 2, this.height / 2 + fontSize / 2);
            this.backCtx.restore();
            this.drawMask();
        }
    },
    drawMask: function() {
        this.resizeCanvas(this.mask, this.width, this.height);
        if (this.coverType == 'color') {
            this.maskCtx.fillStyle = this.cover;
            this.maskCtx.fillRect(0, 0, this.width, this.height);
            this.maskCtx.globalCompositeOperation = 'destination-out';
        } else if (this.coverType == 'image'){//涂层为图片的时候
            var image = new Image(),
                _this = this;
            image.onload = function () {
                _this.maskCtx.drawImage(this, 0, 0);
                _this.maskCtx.globalCompositeOperation = 'destination-out';
            }
            image.src = this.cover;
        }
    },
    init: function (lottery, lotteryType) {
        this.lottery = lottery;
        this.lotteryType = lotteryType || 'image';
        this.drawLottery();
//        var _this = this;
//        window.addEventListener("resize",function(){
//            _this.width = document.documentElement.clientWidth,
//                _this.height = document.documentElement.clientHeight,
//                _this.resizeCanvas(_this.mask, _this.width, _this.height)
//        });
    }
}

window.onload = function () {
//    alert(Lottery.prototype instanceof Object);
    var lottery = new Lottery('lotteryContainer', '../my-guaguale/images/mask.jpg', 'image', 300, 100, drawPercent);
    lottery.init('../my-guaguale/images/busy.jpg', 'image');//百度图片：width=270px;height=129px

    document.getElementById('freshBtn').onclick = function() {
        drawPercentNode.innerHTML = '0%';
        lottery.init(getRandomStr(10), 'text');
    }

    var drawPercentNode = document.getElementById('drawPercent');

    function drawPercent(percent) {
        drawPercentNode.innerHTML = percent + '%';
    }
}

function getRandomStr(len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}