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
          controller: 'landingCtrl as landing'
          templateUrl: 'builder/landing/landing.footer.html'
      data:
        pageTitle:        'Online store builder, ecommerce storefront, dropship product catalog | eeosk'
        pageDescription:  'Create an online store from a catalog of products.'
      # resolve: user: (eeAuth) -> eeAuth.fns.getOrSetUser()

    .state 'try-theme',
      url: '/try/choose-theme'
      views:
        top:
          controller: 'landingCtrl as landing'
          templateUrl: 'builder/landing/landing.html'
        bottom:
          controller: 'landingCtrl as landing'
          templateUrl: 'builder/landing/landing.theme.html'
      data:
        pageTitle:        'Choose a theme for your store | eeosk'
        pageDescription:  'Start building your store by choosing a theme (you can edit it next).'
      # resolve: user: (eeAuth) -> eeAuth.fns.getOrSetUser()

  return
