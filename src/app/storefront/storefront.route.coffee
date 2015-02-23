'use strict'

angular.module('app.storefront').config ($stateProvider) ->

  $stateProvider
    .state 'app.storefront',
      url: '/storefront'
      templateUrl: 'app/storefront/storefront.view.container.html'
      controller: 'app.storefrontRootCtrl'
      resolve: user: (eeAuth) -> eeAuth.userFromToken()
      data:
        pageTitle: 'Build your store | eeosk'
        offscreenCategory: 'Storefront'
        offscreenColor: 'blue'
    .state 'app.storefront.home',
      url: '/home'
      templateUrl: 'app/storefront/storefront.home.html'
      controller: 'app.storefrontChildCtrl'
    .state 'app.storefront.shop_redirect',  # this state is purely to avoid flicker when visiting /storefront/shop
      url: '/shop'
      template: ''
      controller: 'app.storefrontChildCtrl'
    .state 'app.storefront.shop',
      url: '/shop/:shopCategory'
      templateUrl: 'app/storefront/storefront.shop.html'
      controller: 'app.storefrontChildCtrl'
    .state 'app.storefront.blog',
      url: '/blog'
      template: ''
      controller: 'app.storefrontChildCtrl'
    .state 'app.storefront.about',
      url: '/about'
      templateUrl: 'app/storefront/storefront.about.html'
      controller: 'app.storefrontChildCtrl'
    .state 'app.storefront.audience',
      url: '/audience'
      template: ''
      controller: 'app.storefrontChildCtrl'
