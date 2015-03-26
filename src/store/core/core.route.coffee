'use strict'

angular.module('store.core').config ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) ->

  $stateProvider
    .state 'storefront',
      templateUrl: 'app/storefront/storefront.view.container.html'
      controller: 'storeCtrl'
    .state 'storefront.home',
      url: '/'
      views:
        main: templateUrl: 'app/storefront/storefront.home.html'
    .state 'storefront.shop_redirect',  # this state is purely to avoid flicker when visiting /storefront/shop
      url: '/shop'
    .state 'storefront.shop',
      url: '/shop/:shopCategory'
      views:
        main: templateUrl: 'app/storefront/storefront.shop.html'
    .state 'storefront.about',
      url: '/about'
      views:
        main: templateUrl: 'app/storefront/storefront.about.html'
    .state 'storefront.cart',
      url: '/cart'
      views:
        main: templateUrl: 'store/cart/cart.html'
    .state 'storefront.success',
      url: '/cart/success'
      views:
        main: templateUrl: 'store/cart/success.html'

  $urlRouterProvider.otherwise '/'
  return
