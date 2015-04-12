'use strict'

angular.module('builder.catalog').config ($stateProvider) ->

  $stateProvider
    .state 'catalog',
      url: '/catalog'
      # resolve: user: (eeAuth) -> eeAuth.userFromToken()
      views:
        top:
          controller: 'landingCtrl as landing'
          templateUrl: 'builder/landing/landing.html'
        bottom:
          controller: 'catalogCtrl as catalog'
          templateUrl: 'builder/catalog/catalog.html'
      data:
        pageTitle:     'Add products | eeosk'
