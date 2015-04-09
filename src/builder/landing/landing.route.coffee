'use strict'

angular.module('builder.landing').config ($stateProvider, $locationProvider) ->

  $stateProvider.state 'landing',
    url: '/'
    resolve: user: () -> {} # eeAuth.userFromToken()
    views:
      top:
        controller: 'landingCtrl'
        templateUrl: 'builder/landing/landing.html'
      bottom:
        controller: 'exampleCtrl'
        templateUrl: 'builder/example/example.html'
      footer:
        # controller: 'footerCtrl'
        templateUrl: 'builder/landing/landing.footer.html'
    data:
      pageTitle:        'Online store builder, ecommerce storefront, dropship product catalog | eeosk'
      pageDescription:  'Create an online store from a catalog of products.'

  return
