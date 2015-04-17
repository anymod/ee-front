'use strict'

angular.module('builder.catalog').config ($stateProvider) ->

  views =
    header:
      controller: 'catalogCtrl as catalog'
      templateUrl: 'builder/catalog/catalog.header.html'
    top:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'builder/catalog/catalog.popover.html'
    middle:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'app/storefront/storefront.home.products.html'
    bottom:
      controller: 'catalogCtrl as catalog'
      templateUrl: 'builder/catalog/catalog.html'

  data =
    pageTitle:        'Add products | eeosk'
    pageDescription:  'Choose products to add to your store.'
    padTop:           '85px'

  $stateProvider
    .state 'try-catalog',
      url: '/try/products'
      # resolve: user: (eeAuth) -> eeAuth.userFromToken()
      views: views
      data: data

    .state 'catalog',
      url: '/products'
      # resolve: user: (eeAuth) -> eeAuth.userFromToken()
      views: views
      data: data
