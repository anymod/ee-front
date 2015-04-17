'use strict'

angular.module('builder.catalog').config ($stateProvider) ->

  $stateProvider
    .state 'catalog',
      url: '/catalog'
      # resolve: user: (eeAuth) -> eeAuth.userFromToken()
      views:
        header:
          controller: 'catalogCtrl as catalog'
          templateUrl: 'builder/catalog/catalog.header.html'
        top:
          controller: 'storefrontCtrl as storefront'
          templateUrl: 'app/storefront/storefront.home.products.html'
        middle:
          controller: 'catalogCtrl as catalog'
          templateUrl: 'builder/catalog/catalog.html'
      data:
        pageTitle:     'Add products | eeosk'
        pageDescription:  'Choose products to add to your store.'
        padTop: '85px'
