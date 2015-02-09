'use strict'

angular.module('app.catalog').config ($stateProvider) ->

  $stateProvider.state 'app.catalog',
    url: '/catalog'
    templateUrl: 'app/catalog/catalog.html'
    controller: 'app.catalogCtrl'
    resolve:
      user: (eeAuth) -> eeAuth.userFromToken()
      # products: (eeAuth) -> eeAuth.getProducts()
    data:
      pageTitle: 'Add products | eeosk'
      offscreenCategory: 'Catalog'
      offscreenColor: 'gold'
