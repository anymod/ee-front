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
        pageDescription:  'Create an online store in minutes.'

    .state 'welcome',
      url: '/welcome'
      views:
        bottom:
          controller: 'landingCtrl as landing'
          templateUrl: 'builder/landing/landing.html'
        footer:
          controller: 'landingCtrl as landing'
          templateUrl: 'builder/landing/landing.footer.html'
      data:
        pageTitle:        'Welcome to eeosk'
        pageDescription:  'Create an online store in minutes.'

    .state 'welcome_proposition',
      url: '/welcome/:proposition'
      views:
        bottom:
          controller: 'landingCtrl as landing'
          templateUrl: 'builder/landing/landing.html'
        footer:
          controller: 'landingCtrl as landing'
          templateUrl: 'builder/landing/landing.footer.html'
      data:
        pageTitle:        'Welcome to eeosk'
        pageDescription:  'Create an online store in minutes.'

  return
