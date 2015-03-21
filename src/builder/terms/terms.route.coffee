'use strict'

angular.module('builder.terms').config ($stateProvider) ->

  $stateProvider
    .state 'terms',
      url: '/terms'
      templateUrl: 'builder/terms/terms.html'
      controller: 'termsCtrl'
      data:
        pageTitle: 'Terms & Conditions | eeosk'
    .state 'privacy',
      url: '/privacy'
      templateUrl: 'builder/terms/privacy.html'
      controller: 'termsCtrl'
      data:
        pageTitle: 'Privacy Policy | eeosk'
