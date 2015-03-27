'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'reset',
      url: '/password-reset'
      views:
        main:
          templateUrl: 'builder/auth.reset/auth.reset.html'
          controller: 'resetCtrl'
        offscreen:
          templateUrl: 'components/template.offscreen.default.html'
          controller: 'landingCtrl'
      data: pageTitle: 'Reset your password | eeosk'
