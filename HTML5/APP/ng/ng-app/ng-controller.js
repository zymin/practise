/**
 * Created by eyestone001 on 2015/4/27.
 */
var mainApp = angular.module("mainApp", []);//这是一个APP，angular使用宗旨是：：一个页面对应一个APP，一个页面对应多个controller，并且controller要尽量小
//提供一些动态数据
mainApp.controller('HyperLinkController', function($scope) {
    $scope.search = {};
    $scope.search.url = "search-for-cars.html";
    $scope.search.name  = "搜 素";

    $scope.saleMyCar = {};
    $scope.saleMyCar.url = "view-more.html";
    $scope.saleMyCar.name  = "销售您的车---即查看更多";
});
/*
* 查看更多的自定义指令
* */
//Create a directive, first parameter is the html element to be attached.
    //We are attaching student html tag.
    //This directive will be activated as soon as any student element is encountered in html
mainApp.directive('viewMore', function() {
    //define the directive object
    var directive = {};
    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';
    directive.replace = true;
    //template replaces the complete element with its text.
//    directive.template = "Student: <b>{{student.name}}</b> , Roll No: <b>{{student.rollno}}</b>";
    directive.template = "<a href='view-more.html' class='view-more'>查看更多</a>";
    //scope is used to distinguish each student element based on criteria.
//    directive.scope = {
//        viewMore : "=name"
//    };
    //compile is called during application initialization. AngularJS calls it once when html page is loaded.
    directive.compile = function(element, attributes) {
//        element.css({"float":"right","margin-top":"5px","padding":"8px 20px 8px 8px"});    //给view-more添加的样式
        //linkFunction is linked with each element with scope to get the element specific data.
        var linkFunction = function($scope, element, attributes) {
//            element.html("<a href='view-more.html' class='view-more'>查看更多</a>");
        };
        return linkFunction;
    };
    return directive;
});
/*
* 搜索指令
* */
mainApp.directive('searchBtn',function(){
    var directive = {};
    directive.restrict = "E";
    directive.replace = true;//replace为true的时候代替了HTML文本中的<search-btn></search-btn>完全只有a标签，若无replace，那么a标签将在search-btn标签里面
//    directive.templateUrl = 'search-for-cars.html';
    directive.template = "<a href={{hyperLinkUrl.url}} class='search-btn'>{{hyperLinkUrl.name}}</a>";
    directive.scope = {
        hyperLinkUrl : "=name"
    }
//    directive.compile = function(element, attribute) {
//        var linkFunction = function($scope, element, attribute) {
////            element.html("<a href='search-for-cars.html' class='search-btn'>搜 索</a>")
//            console.log(element.val())
//        };
//        return linkFunction;
//    };
    return directive;
});
/*
* 做头部命令
* */
mainApp.directive('topHeader',function(){
    var directive = {};
    directive.restrict = "E";
    directive.replace = true;
    directive.template = "<header class='row head'>" +
        "<div class='col-xs-2 pull_left'>" +
        "<a href='#'><i class='glyphicon glyphicon-menu-hamburger'></i></a>" +
        "</div>" +
        "<div class='col-xs-8'>" +
        "<h3>来 福 乐</h3>" +
        "</div>" +
        "<div class='col-xs-2 pull_right'>" +
        "<a href='#'><i class='glyphicon glyphicon-th'></i></a>" +
        "</div>" +
        "</header>";
    directive.link = function(){
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
    };
    return directive;
});
//myModule.directive('namespaceDirectiveName', function factory(injectables) {
//
//    var directiveDefinitionObject = {
//
//        restrict: string,//指令的使用方式，包括标签，属性，类，注释
//
//        priority: number,//指令执行的优先级
//
//        template: string,//指令使用的模板，用HTML字符串的形式表示
//
//        templateUrl: string,//从指定的url地址加载模板
//
//        replace: bool,//是否用模板替换当前元素，若为false，则append在当前元素上
//
//        transclude: bool,//是否将当前元素的内容转移到模板中
//
//        scope: bool or object,//指定指令的作用域
//
//        controller: function controllerConstructor($scope, $element, $attrs, $transclude){},//定义与其他指令进行交互的接口函数
//
//        require: string,//指定需要依赖的其他指令
//
//        link: function postLink(scope, iElement, iAttrs) {},//以编程的方式操作DOM，包括添加监听器等
//
//        compile: function compile(tElement, tAttrs, transclude){
//
//            return {
//
//                pre: function preLink(scope, iElement, iAttrs, controller){},
//
//                post: function postLink(scope, iElement, iAttrs, controller){}
//
//            }
//
//        }//编程的方式修改DOM模板的副本，可以返回链接函数
//
//    };
//
//    return directiveDefinitionObject;
//
//});
//事实上priority和compile用的比较少，template和templateUrl又是互斥的，两者选其一即可

/*
* 左右侧边栏的命令
* */
mainApp.directive('navigation',function(){
    var directive = {};
    directive.restrict = "E";
    directive.replace = true;
    directive.templateUrl = "includes/nav.html";
//    directive.transclude = true;
//    directive.compile = function(element, attribute) {
//        var linkFunction = function($scope, element, attribute) {
////            element.html("<a href='search-for-cars.html' class='search-btn'>搜 索</a>")
//        };
//        return linkFunction;
//    };
    return directive;
});