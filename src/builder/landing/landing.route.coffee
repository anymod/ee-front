'use strict'

angular.module('builder.landing').config ($stateProvider, $locationProvider) ->

  $stateProvider
    .state 'landing',
      url: '/'
      views:
        bottom:
          controller: 'landingCtrl as landing'
          templateUrl: 'builder/landing/landing.html'
        footer:
          templateUrl: 'builder/landing/landing.footer.html'
      data:
        pageTitle:        'Online store builder, ecommerce storefront, dropship product catalog | eeosk'
        pageDescription:  'Create an online store from a catalog of products.'

    .state 'try',
      url: '/try'
      views:
        top:
          controller: 'exampleCtrl as example'
          templateUrl: 'builder/example/example.html'
        bottom:
          controller: 'landingCtrl as landing'
          templateUrl: 'builder/landing/landing.html'
      data:
        pageTitle:        'Try it out: build your online store | eeosk'
        pageDescription:  'Start building your own online store.'

  return
