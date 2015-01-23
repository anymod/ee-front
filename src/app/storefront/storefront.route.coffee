'use strict'

angular.module('app.storefront').config ($stateProvider) ->

  $stateProvider
    .state 'app.storefront',
      url: '/storefront'
      templateUrl: 'partials/app/store.view.container.html'
      controller: 'app.storefrontCtrl'
      # resolve: eeProductData: (eeBack) -> eeBack.getProducts()
      data:
        pageTitle: 'Build your store | eeosk'
        offscreenCategory: 'Storefront'
        offscreenColor: 'blue'
    .state 'app.storefront.home',
      url: '/home'
      templateUrl: 'partials/app/store.home.html'
    .state 'app.storefront.shop',
      url: '/shop/:shopCategory'
      templateUrl: 'partials/app/store.shop.html'
    .state 'app.storefront.blog',
      url: '/blog'
      templateUrl: 'partials/app/store.blog.html'
    .state 'app.storefront.about',
      url: '/about'
      templateUrl: 'partials/app/store.about.html'
    .state 'app.storefront.audience',
      url: '/audience'
      templateUrl: 'partials/app/store.audience.html'
