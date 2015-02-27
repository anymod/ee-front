'use strict'

angular.module('store.core').config ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) ->

  $stateProvider
    .state 'app.storefront',
      url: ''
      templateUrl: 'app/storefront/storefront.view.container.html'
      controller: 'storeCtrl'
      resolve:
        storefront: ($rootScope, eeAuth, eeStorefront) ->
          eeAuth.getUsername()
          .then (username) -> eeStorefront.storefrontFromUsername(username)
          .then (storefront) ->
            $rootScope.storeName = storefront.storefront_meta.home.name
            storefront
          .catch () ->
            $rootScope.storeName = 'Not found'
            {
              storefront_meta: false
              product_selection: false
            }
    .state 'app.storefront.home',
      url: '/'
      templateUrl: 'app/storefront/storefront.home.html'
      controller: 'storeCtrl'
    .state 'app.storefront.shop_redirect',  # this state is purely to avoid flicker when visiting /storefront/shop
      url: '/shop'
      template: ''
      controller: 'storeCtrl'
    .state 'app.storefront.shop',
      url: '/shop/:shopCategory'
      templateUrl: 'app/storefront/storefront.shop.html'
      controller: 'storeCtrl'
    .state 'app.storefront.about',
      url: '/about'
      templateUrl: 'app/storefront/storefront.about.html'
      controller: 'storeCtrl'

  $urlRouterProvider.otherwise '/'
  return
