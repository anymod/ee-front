'use strict'

angular.module('builder.catalog').config ($stateProvider) ->

  $stateProvider.state 'app.catalog',
    url: '/catalog'
    templateUrl: 'builder/catalog/catalog.html'
    controller: 'builder.catalogCtrl'
    resolve:
      user: (eeAuth) -> eeAuth.userFromToken()
      # products: (eeAuth) -> eeAuth.getProducts()
    data:
      pageTitle: 'Add products | eeosk'
      offscreenCategory: 'Catalog'
      offscreenColor: 'gold'
