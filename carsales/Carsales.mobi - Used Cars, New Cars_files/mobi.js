'use strict';
var mobiApp = angular.module('mobiApp', ['stockApp', 'editorialApp', 'ui.router', 'csnMembership', 'csnAtomHeader', 'csnCommon', 'csnAdvert', 'ngAnimate', 'ngTouch', 'ngAria', 'ngMaterial', 'ngResource', 'csnGlobalSettings']);
mobiApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider.state('homepage', {url: "/", templateUrl: "/Content/dist/partials/home/layouts/home.html", controller: "MobiHomeController"}).state('signinjoin', {url: "/signinjoin", templateUrl: "/Content/dist/partials/common/layouts/signinjoin.html", controller: "MobiSigninJoinController"}).state('newcars', {url: "/newcars/search", templateUrl: "/Content/dist/partials/newcars/layouts/newcars.html", controller: "MobiNewcarsController"}).state('contentTerms', {url: "/content/terms", templateUrl: "/Content/dist/partials/content/layouts/terms.html", controller: "MobiContentController"}).state('contentPrivacy', {url: "/content/privacy", templateUrl: "/Content/dist/partials/content/layouts/privacy.html", controller: "MobiContentController"}).state('contentContact', {url: "/content/contact", templateUrl: "/Content/dist/partials/content/layouts/contact.html", controller: "MobiContentController"}).state('stockListing', {url: "/cars/results?q&sort&title&useMrecs&page", templateUrl: "/apps/stock/views/stock-listing.html", controller: "StockListingController"}).state('stockListingSlash', {url: "/cars/results/?q&sort&title&useMrecs&page", templateUrl: "/apps/stock/views/stock-listing.html", controller: "StockListingController"}).state('stockListingSortBy', {url: "/cars/results/sort-by?q&sort&NearestNeighbour", templateUrl: "/apps/stock/views/stock-listing-sort-by.html", controller: "StockListingSortByController"}).state('stockListingSortByNearMe', {url: "/cars/results/sort-by/near-me?q&sort&returnUrl", templateUrl: "/apps/stock/views/stock-listing-sort-near.html", controller: "StockListingSortNearmeController"}).state('stockDetail', {url: "/cars/details/:id", templateUrl: "/apps/stock/views/stock-details.html", controller: "StockDetailsController"}).state('stockSearch', {url: "/cars/search?q&sk&sort", templateUrl: "/apps/stock/views/search/stock-search.html", controller: "StockSearchController"}).state('stockSearchSlash', {url: "/cars/search/?q&sk&sort", templateUrl: "/apps/stock/views/search/stock-search.html", controller: "StockSearchController"}).state('stockSearchSelectAspect', {url: "/cars/search/select/aspect?q&sk&a&p&bc&d&sort", templateUrl: "/apps/stock/views/search/stock-search-select-aspect.html", controller: "StockSearchSelectAspectController"}).state('stockSearchSelectRange', {url: "/cars/search/select/range?q&a&dn&min&max&sort", templateUrl: "/apps/stock/views/search/stock-search-select-range.html", controller: "StockSearchSelectRangeController"}).state('stockSearchSelectPostcode', {url: "/cars/search/select/postcode?q&a&dn&postcode&distanceInKms&sort", templateUrl: "/apps/stock/views/search/stock-search-select-postcode.html", controller: "StockSearchSelectPostcodeController"}).state('stockSearchSelectAdType', {url: "/cars/search/select/adtype?q&a&dn&sort", templateUrl: "/apps/stock/views/search/stock-search-select-adtype.html", controller: "StockSearchSelectAdTypeController"}).state('stockSearchSelectKeyword', {url: "/cars/search/select/keyword?q&a&dn&postcode&distanceInKms&sort&DistanceFromMePostcode&keyword", templateUrl: "/apps/stock/views/search/stock-search-select-keyword.html", controller: "StockSearchSelectKeywordController"}).state('editorial', {url: "/editorial", templateUrl: "/apps/editorial/views/editorial-landing.html", controller: "EditorialLandingController"}).state('editorialDetail', {url: "/editorial/details/:id?q&sort&index", templateUrl: "/apps/editorial/views/editorial-details.html", controller: "EditorialDetailsController"}).state('editorialListing', {url: "/editorial/results?q&sort&title", templateUrl: "/apps/editorial/views/editorial-listing.html", controller: "EditorialListingController"}).state('editorialListingSortBy', {url: "/editorial/results/sort-by?q&sort", templateUrl: "/apps/editorial/views/editorial-listing-sort-by.html", controller: "EditorialListingSortByController"}).state('editorialSearch', {url: "/editorial/search?q&sk", templateUrl: "/apps/editorial/views/search/editorial-search.html", controller: "EditorialSearchController"}).state('editorialSearchSelectAspect', {url: "/editorial/search/select?q&sk&a&p&bc", templateUrl: "/apps/editorial/views/search/editorial-search-select-aspect.html", controller: "EditorialSearchSelectAspectController"});
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true).hashPrefix('!');
    $httpProvider.defaults.withCredentials = true;
}]);
'use strict';
mobiApp.controller('MobiSigninJoinController', ['$scope', '$stateParams', '$location', 'globalSettings', 'membershipDataService', function ($scope, $stateParams, $location, globalSettings, membershipDataService) {
    var membershipService = new membershipDataService();
    $scope.state = {};
    $scope.state.authenticated = globalSettings.isAuthenticated;
    $scope.state.dashboardpath = globalSettings.memberCenterDomain + 'membercentre/carsales/dashboard#/';
    $scope.carousel = {};
    $scope.init = function () {
        membershipService.getUserDetails(function (data) {
            $scope.user = data;
            var items = [
                {image: '/Content/dist/images/benefits/sync.png', description: 'Keep track of your cars and searches wherever you are'},
                {image: '/Content/dist/images/benefits/email-alerts.png', description: 'Be the first to know if the price changes on your saved cars'},
                {image: '/Content/dist/images/benefits/dealer-maps.png', description: 'View dealer cars you’ve enquired on, on a map to plan your test drives'}
            ];
            if ($scope.user.HasPreviouslySignedIn) {
                var desc = 'Welcome back! To access your account and saved items sign in now.';
                if ($scope.user.PreviouslySignedInUser) {
                    desc = 'Hi ' + $scope.user.PreviouslySignedInUser + '.' + desc;
                }
                items.unshift({image: '/Content/dist/images/benefits/membership.png', description: desc});
            } else {
                console.log('Condition not met.');
            }
            $scope.carousel.items = items;
        }, function () {
            $scope.user = {};
            console.log('Couldn\'t get user details.');
        });
    }
    $scope.init();
}]);
'use strict'
mobiApp.filter('classname', function () {
    return function (input) {
        var replaced = input;
        if (input) {
            replaced = replaced.toLowerCase();
            replaced = replaced.replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g, "");
            replaced = replaced.replace(/\s+/g, "-");
        }
        return replaced;
    }
});
'use strict'
mobiApp.filter('monthShorten', function () {
    return function (input) {
        var replaced = input;
        if (input) {
            replaced = replaced.replace('January', 'Jan');
            replaced = replaced.replace('February', 'Feb');
            replaced = replaced.replace('March', 'Mar');
            replaced = replaced.replace('April', 'Apr');
            replaced = replaced.replace('May', 'May');
            replaced = replaced.replace('June', 'Jun');
            replaced = replaced.replace('July', 'Jul');
            replaced = replaced.replace('August', 'Aug');
            replaced = replaced.replace('September', 'Sep');
            replaced = replaced.replace('October', 'Oct');
            replaced = replaced.replace('November', 'Nov');
            replaced = replaced.replace('December', 'Dec');
        }
        return replaced;
    }
});
'use strict';
mobiApp.factory('editorialDataService', ['$resource', '$q', '$rootScope', 'globalSettings', function ($resource, $q, $rootScope, globalSettings) {
    var obj = function () {
        this.baseurl = globalSettings.apiBaseUrl;
    };
    obj.prototype.getLatest = function (count, callback, callbackfail) {
        var path = this.baseurl + 'editorials';
        var query = {sortby: 'latest', skip: 0, limit: count || 4, q: 'Service=[CarSales]'};
        _getRequest(path, query, callback, callbackfail, 'getLatest');
    };
    obj.prototype.getSlides = function (slides, callback, callbackfail) {
        var path = this.baseurl + 'editorials';
        var slidecount = slides || 4;
        var count = slidecount * 4;
        var query = {sortby: 'latest', skip: 0, limit: count, q: 'Service=[CarSales]'};
        _getRequest(path, query, callback, callbackfail, 'getLatest');
    };
    var _getRequest = function (path, query, callback, callbackfail, action) {
        $rootScope.$broadcast('csn.loading.start', {service: "Editorial", action: action});
        $resource(path).get(query).$promise.then(function (data) {
            $rootScope.$broadcast('csn.loading.end', {service: "Editorial", action: action, success: true});
            callback(_filterAds(data));
        }, function () {
            $rootScope.$broadcast('csn.loading.end', {service: "Editorial", action: action, success: false});
            if (callbackfail) {
                callbackfail();
            }
        });
    };
    var _filterAds = function (data) {
        var filtered = [];
        angular.forEach(data.results, function (item) {
            if (!item.isAdvert) {
                filtered.push(item);
            }
        });
        return filtered;
    };
    return obj;
}]);
'use strict';
mobiApp.controller('MobiHomeController', ['$scope', '$rootScope', '$stateParams', '$location', 'globalSettings', 'commonViewModel', 'membershipTrackLocalSaves', function ($scope, $rootScope, $stateParams, $location, globalSettings, commonViewModel, membershipTrackLocalSaves) {
    $scope.state = {};
    $scope.state.authenticated = globalSettings.isAuthenticated;
    commonViewModel.headerText = $stateParams.title || "Home";
    commonViewModel.emptyMenu();
    commonViewModel.headerMenus.push({text: 'Feedback', url: {href: '/feedback', target: '_self'}});
}]);
'use strict';
mobiApp.directive('mobi-listblock-editorialmobiListblockEditorial', ['$rootScope', 'editorialDataService', function ($rootScope, editorialDataService) {
    return{scope: {}, templateUrl: '/Content/dist/partials/home/components/listblock-editorial.html', link: function (scope, elm, attrs) {
        var editorialService = new editorialDataService();
        scope.state = {};
        scope.state.loading = false;
        scope.state.failure = false;
        scope.data = {};
        scope.init = function () {
            getSingleSet(4);
        };
        var getSingleSet = function () {
            scope.state.loading = true;
            editorialService.getLatest(4, function (data) {
                scope.data.editorial = data;
                if (data.length === 0) {
                    scope.state.noData = true;
                }
                scope.state.loading = false;
                scope.state.failure = false;
            }, function () {
                scope.state.loading = false;
                scope.state.failure = true;
                console.log('Failed to load editorial data.');
            });
        }
        var getMultiSet = function (slidecount) {
            scope.state.loading = true;
            editorialService.getSlides(slidecount, function (data) {
                if (data.length) {
                    var slides = [];
                    var i;
                    for (i = 0; i < slidecount; i++) {
                        var removed = data.splice(0, 4);
                        slides.push(removed);
                    }
                    scope.data.editorial = slides;
                } else {
                    scope.state.noData = true;
                }
                scope.state.loading = false;
                scope.state.failure = false;
            }, function () {
                scope.state.loading = false;
                scope.state.failure = true;
                console.log('Failed to load editorial data.');
            });
        }
        scope.init();
    }};
}]);
'use strict';
mobiApp.directive('mobiListblockRecentCars', ['$rootScope', 'membershipDataService', 'globa lSettings', function ($rootScope, membershipDataService, globalSettings) {
    return{scope: {}, templateUrl: '/Content/dist/partials/home/components/listblock-recent-cars.html', link: function (scope, elm, attrs) {
        var membershipService = new membershipDataService();
        scope.state = {};
        scope.state.loading = false;
        scope.state.failure = false;
        scope.data = {};
        scope.settings = {};
        scope.settings.memberCenterDomain = globalSettings.memberCenterDomain;
        scope.state.authenticated = globalSettings.isAuthenticated;
        scope.init = function () {
            scope.state.loading = true;
            membershipService.getRecentCars(2, function (data) {
                scope.data.recentcars = data;
                if (data.length == 0) {
                    scope.state.noData = true;
                }
                scope.state.loading = false;
                scope.state.failure = false;
            }, function () {
                scope.state.loading = false;
                scope.state.failure = true;
                console.log('Failed to load Recent Cars.');
            });
        };
        scope.init();
    }};
}]);
'use strict';
mobiApp.directive('mobiListblockSavedCars', ['$rootScope', 'membershipDataService', 'globalSettings', function ($rootScope, membershipDataService, globalSettings) {
    return{scope: {}, templateUrl: '/Content/dist/partials/home/components/listblock-saved-cars.html', link: function (scope, elm, attrs) {
        var membershipService = new membershipDataService();
        scope.state = {};
        scope.state.loading = false;
        scope.state.failure = false;
        scope.data = {};
        scope.settings = {};
        scope.settings.memberCenterDomain = globalSettings.memberCenterDomain;
        scope.state.authenticated = globalSettings.isAuthenticated;
        scope.init = function () {
            scope.state.loading = true;
            membershipService.getSavedCars(4, function (data) {
                scope.data.savedcars = data;
                if (data.length === 0) {
                    scope.state.noData = true;
                }
                scope.state.loading = false;
                scope.state.failure = false;
            }, function () {
                scope.state.loading = false;
                scope.state.failure = true;
                console.log('Failed to load Saved Cars.');
            });
        };
        scope.init();
    }};
}]);
'use strict';
mobiApp.directive('mobiListblockSavedSearches', ['$rootScope', 'membershipDataService', 'globalSettings', function ($rootScope, membershipDataService, globalSettings) {
    return{scope: {}, templateUrl: '/Content/dist/partials/home/components/listblock-saved-searches.html', link: function (scope, elm, attrs) {
        var membershipService = new membershipDataService();
        scope.state = {};
        scope.state.loading = false;
        scope.state.failure = false;
        scope.data = {};
        scope.settings = {};
        scope.settings.memberCenterDomain = globalSettings.memberCenterDomain;
        scope.state.authenticated = globalSettings.isAuthenticated;
        scope.init = function () {
            scope.state.loading = true;
            membershipService.getSavedSearches(5, function (data) {
                scope.data.savedsearches = data;
                if (data.length === 0) {
                    scope.state.noData = true;
                }
                scope.state.loading = false;
                scope.state.failure = false;
            }, function () {
                scope.state.loading = false;
                scope.state.failure = true;
                console.log('Failed to load Saved Searches.');
            });
        };
        scope.init();
    }};
}]);
'use strict';
mobiApp.controller('MobiNewcarsController', ['$scope', 'globalSettings', function ($scope, globalSettings) {
    $scope.state = {};
    $scope.state.authenticated = globalSettings.isAuthenticated;
    $scope.items = [
        {title: 'New Car Showroom', description: 'Customise, price & enquire on your next new car', url: '/new-cars/showroom'},
        {title: 'Special Offers', description: 'Great deals on brand new cars from dealerships across Australia', url: '/special-offers'},
        {title: 'In Stock Now', description: 'Brand new cars availabile now. Skip the waitlist', url: '/cars/search?q=((Service%3D[Carsales])%26(((SiloType%3d[Brand%20new%20cars%20available])|(SiloType%3d[Brand%20new%20cars%20in%20stock]))))'},
        {title: 'Demo Cars', description: 'Get great deals on low km, ex-demo vehicles', url: '/cars/search?q=((Service%3D[Carsales])%26(((SiloType%3d[Demo%20and%20near%20new%20cars]))))'},
        {title: 'Help Me Choose', description: 'We make choosing your next car easier with simple questions and clever recommendations', url: '/help-me-choose'}
    ];
}]);
'use strict';
mobiApp.controller('MobiContentController', ['$scope', 'globalSettings', function ($scope, globalSettings) {
    $scope.state = {};
    $scope.state.authenticated = globalSettings.isAuthenticated;
    $('body').scrollTop(0);
}]);