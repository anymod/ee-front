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
          controller: 'builder.catalogOffscreenCtrl'
          offscreenCategory: 'Catalog'
          offscreenColor: 'gold'
        # 'offscreen-right':
        #   templateUrl: 'builder/catalog/catalog.offscreen.right.html'
        #   controller: 'builder.catalogOffscreenRightCtrl'
      resolve:
        user: (eeAuth) -> eeAuth.userFromToken()
      data:
        pageTitle: 'Add products | eeosk'
