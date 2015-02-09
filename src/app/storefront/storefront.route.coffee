'use strict'

angular.module('app.storefront').config ($stateProvider) ->

  $stateProvider
    .state 'app.storefront',
      url: '/storefront'
      templateUrl: 'app/storefront/storefront.view.container.html'
      controller: 'app.storefrontRootCtrl'
      resolve:
        user: (eeAuth) -> eeAuth.userFromToken()
      data:
        pageTitle: 'Build your store | eeosk'
        offscreenCategory: 'Storefront'
        offscreenColor: 'blue'
    .state 'app.storefront.home',
      url: '/home'
      templateUrl: 'app/storefront/storefront.home.html'
      controller: 'app.storefrontChildCtrl'
    .state 'app.storefront.shop',
      url: '/shop/:shopCategory'
      templateUrl: 'app/storefront/storefront.shop.html'
      controller: 'app.storefrontChildCtrl'
    .state 'app.storefront.blog',
      url: '/blog'
      templateUrl: 'app/storefront/storefront.blog.html'
      controller: 'app.storefrontChildCtrl'
    .state 'app.storefront.about',
      url: '/about'
      templateUrl: 'app/storefront/storefront.about.html'
      controller: 'app.storefrontChildCtrl'
    .state 'app.storefront.audience',
      url: '/audience'
      templateUrl: 'app/storefront/storefront.audience.html'
      controller: 'app.storefrontChildCtrl'
