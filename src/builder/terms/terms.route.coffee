'use strict'

angular.module('builder.terms').config ($stateProvider) ->

  $stateProvider
    .state 'terms',
      url: '/terms'
      views:
        main:
          templateUrl: 'builder/terms/terms.html'
          controller: 'termsCtrl'
        offscreen:
          templateUrl: 'components/template.offscreen.default.html'
      data:
        pageTitle: 'Terms & Conditions | eeosk'
    .state 'privacy',
      url: '/privacy'
      views:
        main:
          templateUrl: 'builder/terms/privacy.html'
          controller: 'termsCtrl'
        offscreen:
          templateUrl: 'components/template.offscreen.default.html'
      data:
        pageTitle: 'Privacy Policy | eeosk'
