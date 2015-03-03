'use strict'

angular.module('builder.storefront').config ($stateProvider) ->

  $stateProvider
    .state 'app.storefront',
      url: '/storefront'
      templateUrl: 'app/storefront/storefront.view.container.html'
      controller: 'builder.storefrontRootCtrl'
      resolve: user: (eeAuth) -> eeAuth.userFromToken()
      data:
        pageTitle: 'Build your store | eeosk'
        offscreenCategory: 'Storefront'
        offscreenColor: 'blue'
    .state 'app.storefront.welcome',
      url: '/welcome'
      templateUrl: 'app/storefront/storefront.home.html'
      controller: 'builder.storefrontChildCtrl'
      data:
        welcome: true
    .state 'app.storefront.home',
      url: '/home'
      templateUrl: 'app/storefront/storefront.home.html'
      controller: 'builder.storefrontChildCtrl'
    .state 'app.storefront.shop_redirect',  # this state is purely to avoid flicker when visiting /storefront/shop
      url: '/shop'
      template: ''
      controller: 'builder.storefrontChildCtrl'
    .state 'app.storefront.shop',
      url: '/shop/:shopCategory'
      templateUrl: 'app/storefront/storefront.shop.html'
      controller: 'builder.storefrontChildCtrl'
    .state 'app.storefront.blog',
      url: '/blog'
      templateUrl: 'app/storefront/storefront.home.html'
      controller: 'builder.storefrontChildCtrl'
      data:
        storeOpacity: true
    .state 'app.storefront.about',
      url: '/about'
      templateUrl: 'app/storefront/storefront.about.html'
      controller: 'builder.storefrontChildCtrl'
    .state 'app.storefront.audience',
      url: '/audience'
      templateUrl: 'app/storefront/storefront.home.html'
      controller: 'builder.storefrontChildCtrl'
      data:
        storeOpacity: true
