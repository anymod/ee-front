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

  resolve =
    user: (eeAuth) -> eeAuth.fns.getOrSetUser()

  $stateProvider
    .state 'try-catalog',
      url:      '/try/products'
      views:    views
      data:     data
      resolve:  resolve

    .state 'catalog',
      url:      '/products'
      views:    views
      data:     data
      resolve:  resolve
