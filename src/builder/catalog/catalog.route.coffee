'use strict'

angular.module('builder.catalog').config ($stateProvider) ->

  $stateProvider
    .state 'catalog',
      url: '/catalog'
      views:
        main:
          templateUrl: 'builder/catalog/catalog.html'
          controller: 'builder.catalogCtrl'
        offscreen:
          templateUrl: 'builder/catalog/catalog.offscreen.html'
          controller: 'builder.catalogCtrl'
          offscreenCategory: 'Catalog'
          offscreenColor: 'gold'
      resolve:
        user: (eeAuth) -> eeAuth.userFromToken()
      data:
        pageTitle: 'Add products | eeosk'
