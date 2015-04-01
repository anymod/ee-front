'use strict'

angular.module('builder.catalog').config ($stateProvider) ->

  $stateProvider
    .state 'catalog',
      url: '/catalog'
      resolve: user: (eeAuth) -> eeAuth.userFromToken()
      views:
        main:
          controller: 'builder.catalog.onscreenCtrl'
          templateUrl: 'builder/catalog/catalog.html'
        offscreen:
          controller: 'builder.catalog.offscreenCtrl'
          templateUrl: 'builder/catalog/catalog.offscreen.html'
      data:
        pageTitle:          'Add products | eeosk'
        offscreenCategory:  'Catalog'
        offscreenColor:     'gold'
