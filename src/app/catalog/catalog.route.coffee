'use strict'

angular.module('app.catalog').config ($stateProvider) ->

  $stateProvider.state 'app.catalog',
    url: '/catalog'
    templateUrl: 'app/catalog/catalog.html'
    controller: 'app.catalogCtrl'
    # resolve: eeProductData: (eeBack) -> eeBack.getProducts()
    data:
      pageTitle: 'Add products | eeosk'
      offscreenCategory: 'Catalog'
      offscreenColor: 'gold'
