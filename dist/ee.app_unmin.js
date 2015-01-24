(function() {
  'use strict';
  angular.module('app.core', []);

}).call(this);

(function() {
  'use strict';
  angular.module('app.about', ['app.core']);

}).call(this);

(function() {
  'use strict';
  angular.module('app.account', ['app.core']);

}).call(this);

(function() {
  'use strict';
  angular.module('app.auth', ['app.core']);

}).call(this);

(function() {
  'use strict';
  angular.module('app.catalog', ['app.core']);

}).call(this);

(function() {
  'use strict';
  angular.module('app.contact', ['app.core']);

}).call(this);

(function() {
  'use strict';
  angular.module('app.landing', []);

}).call(this);

(function() {
  'use strict';
  angular.module('app.orders', ['app.core']);

}).call(this);

(function() {
  'use strict';
  angular.module('app.storefront', ['app.core']);

}).call(this);

(function() {
  'use strict';
  angular.module('app.about').controller('aboutCtrl', ["$scope", "eeProductData", function($scope, eeProductData) {
    $scope.sellerPrice = 3;
    $scope.examplePrice = 50;
    $scope.slidePos = 'slide-1';
  }]);

}).call(this);

(function() {
  'use strict';
  angular.module('app.account').controller('app.accountCtrl', ["$scope", "$rootScope", function($scope, $rootScope) {
    $rootScope.toggle = true;
  }]);

}).call(this);

(function() {
  'use strict';
  angular.module('app.auth').controller('loginCtrl', ["$scope", "$location", "$state", "$cookies", "eeFirebaseSvc", function($scope, $location, $state, $cookies, eeFirebaseSvc) {
    if ($cookies.superSecret === "ABCD") {
      $state.go('app.storefront.home');
    }
    $scope.authWithPassword = function() {
      if ($scope.email === "demo@eeosk.com" && $scope.password === 'secret') {
        $cookies.superSecret = "ABCD";
        $state.go('app.storefront.home');
      }
    };
  }]);

  angular.module('app.auth').controller('loginTempCtrl', ["$scope", "$location", "$state", "$cookies", "$http", "eeBack", function($scope, $location, $state, $cookies, $http, eeBack) {
    $scope.res = '';
    if (!!$cookies.loginToken) {
      eeBack.loginWithToken($cookies.loginToken).then(function(res) {
        return console.log('auto result:', res);
      });
    }
    $scope.authWithPassword = function() {
      eeBack.authWithPassword($scope.email, $scope.password).then(function(data) {
        $scope.res = data.message;
        return $cookies.loginToken = data.token;
      });
    };
  }]);

  angular.module('app.auth').controller('logoutCtrl', ["$location", "eeFirebaseSvc", function($location, eeFirebaseSvc) {
    eeFirebaseSvc.unauth();
    $location.path('/');
  }]);

}).call(this);

(function() {
  'use strict';
  angular.module('app.catalog').controller('app.catalogCtrl', ["$scope", "$rootScope", "eeBack", function($scope, $rootScope, eeBack) {
    $rootScope.toggle = true;
    eeBack.getProducts().then(function(products) {
      return $scope.products = products;
    });
  }]);

}).call(this);

(function() {
  'use strict';
  angular.module('app.contact').controller('contactCtrl', ["$scope", "$location", "eeFirebaseSvc", function($scope, $location, eeFirebaseSvc) {
    $scope.signup = {};
    $scope.signup.location = $location.path();
    $scope.submitForm = function() {
      $scope.buttonDisabled = true;
      eeFirebaseSvc.createSignup($scope.signup).then(function() {
        $scope.signupCreated = true;
      })["catch"](function(err) {
        alert("Failed to process signup");
        $scope.buttonDisabled = false;
      });
    };
  }]);

}).call(this);

(function() {
  'use strict';
  angular.module('app.landing').controller('landingCtrl', ["$scope", "$location", "$anchorScroll", function($scope, $location, $anchorScroll) {
    $scope.navbarCollapsed = true;
    $scope.scrollToMore = function() {
      $location.hash('more');
      return $anchorScroll();
    };
  }]);

}).call(this);

(function() {
  'use strict';
  angular.module('app.orders').controller('app.ordersCtrl', ["$scope", "$rootScope", "eeOrderData", function($scope, $rootScope, eeOrderData) {
    $rootScope.toggle = true;
    $scope.orders = eeOrderData;
  }]);

}).call(this);

(function() {
  'use strict';
  angular.module('app.storefront').controller('app.storefrontCtrl', ["$scope", "$rootScope", "eeBack", function($scope, $rootScope, eeBack) {
    $rootScope.toggle = true;
    eeBack.getProducts().then(function(products) {
      return $scope.products = products;
    });
  }]);

}).call(this);

(function() {
  'use strict';
  angular.module('app.about').config(["$stateProvider", function($stateProvider) {}]);

}).call(this);

(function() {
  'use strict';
  angular.module('app.account').config(["$stateProvider", function($stateProvider) {
    return $stateProvider.state('app.account', {
      url: '/account',
      templateUrl: 'app/account/account.html',
      controller: 'app.catalogCtrl',
      data: {
        pageTitle: 'Account | eeosk',
        offscreenCategory: 'Account',
        offscreenColor: 'dark'
      }
    });
  }]);

}).call(this);

(function() {
  'use strict';
  angular.module('app.auth').config(["$stateProvider", function($stateProvider) {
    return $stateProvider.state('login', {
      url: '/user/login',
      templateUrl: 'app/auth/auth.login.html',
      controller: 'loginCtrl',
      data: {
        pageTitle: 'Login | eeosk'
      }
    }).state('loginTemp', {
      url: '/login',
      templateUrl: 'app/auth/auth.loginTemp.html',
      controller: 'loginTempCtrl',
      data: {
        pageTitle: 'Login | eeosk'
      }
    }).state('logout', {
      url: '/user/logout',
      template: '',
      controller: 'logoutCtrl',
      data: {
        pageTitle: 'Logout | eeosk'
      }
    });
  }]);

}).call(this);

(function() {
  'use strict';
  angular.module('app.catalog').config(["$stateProvider", function($stateProvider) {
    return $stateProvider.state('app.catalog', {
      url: '/catalog',
      templateUrl: 'app/catalog/catalog.html',
      controller: 'app.catalogCtrl',
      data: {
        pageTitle: 'Add products | eeosk',
        offscreenCategory: 'Catalog',
        offscreenColor: 'gold'
      }
    });
  }]);

}).call(this);

(function() {
  'use strict';
  angular.module('app.contact').config(["$stateProvider", function($stateProvider) {
    return $stateProvider.state('signupSell', {
      url: '/create-online-store',
      templateUrl: 'app/contact/contact.signup.html',
      controller: 'contactCtrl',
      data: {
        pageTitle: 'Create your store | eeosk'
      }
    });
  }]);

}).call(this);

(function() {
  'use strict';
  angular.module('app.landing').config(["$stateProvider", "$locationProvider", function($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider.state('landing', {
      url: '/',
      templateUrl: 'app/landing/landing.html',
      controller: 'landingCtrl',
      data: {
        pageTitle: 'Online store builder, ecommerce storefront, dropship product catalog | eeosk',
        pageDescription: 'Create an online store from a catalog of products.'
      }
    });
  }]);

}).call(this);

(function() {
  'use strict';
  angular.module('app.orders').config(["$stateProvider", function($stateProvider) {
    return $stateProvider.state('app.orders', {
      url: '/orders',
      templateUrl: 'app/orders/orders.html',
      controller: 'app.ordersCtrl',
      resolve: {
        eeOrderData: ["eeFirebaseSvc", function(eeFirebaseSvc) {
          return eeFirebaseSvc.getOrders();
        }]
      },
      data: {
        pageTitle: 'My orders | eeosk',
        offscreenCategory: 'Orders',
        offscreenColor: 'green'
      }
    });
  }]);

}).call(this);

(function() {
  'use strict';
  angular.module('app.storefront').config(["$stateProvider", function($stateProvider) {
    return $stateProvider.state('app.storefront', {
      url: '/storefront',
      templateUrl: 'app/storefront/storefront.view.container.html',
      controller: 'app.storefrontCtrl',
      data: {
        pageTitle: 'Build your store | eeosk',
        offscreenCategory: 'Storefront',
        offscreenColor: 'blue'
      }
    }).state('app.storefront.home', {
      url: '/home',
      templateUrl: 'app/storefront/storefront.home.html'
    }).state('app.storefront.shop', {
      url: '/shop/:shopCategory',
      templateUrl: 'app/storefront/storefront.shop.html'
    }).state('app.storefront.blog', {
      url: '/blog',
      templateUrl: 'app/storefront/storefront.blog.html'
    }).state('app.storefront.about', {
      url: '/about',
      templateUrl: 'app/storefront/storefront.about.html'
    }).state('app.storefront.audience', {
      url: '/audience',
      templateUrl: 'app/storefront/storefront.audience.html'
    });
  }]);

}).call(this);
