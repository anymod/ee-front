'use strict'

angular.module('app.storefront').config ($stateProvider) ->

  $stateProvider
    .state 'app.storefront',
      url: '/storefront'
      templateUrl: 'app/storefront/storefront.view.container.html'
      controller: 'app.storefrontCtrl'
      # resolve: eeProductData: (eeBack) -> eeBack.getProducts()
      data:
        pageTitle: 'Build your store | eeosk'
        offscreenCategory: 'Storefront'
        offscreenColor: 'blue'
    .state 'app.storefront.home',
      url: '/home'
      templateUrl: 'app/storefront/storefront.home.html'
    .state 'app.storefront.shop',
      url: '/shop/:shopCategory'
      templateUrl: 'app/storefront/storefront.shop.html'
    .state 'app.storefront.blog',
      url: '/blog'
      templateUrl: 'app/storefront/storefront.blog.html'
    .state 'app.storefront.about',
      url: '/about'
      templateUrl: 'app/storefront/storefront.about.html'
    .state 'app.storefront.audience',
      url: '/audience'
      templateUrl: 'app/storefront/storefront.audience.html'
