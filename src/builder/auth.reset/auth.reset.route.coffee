'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'reset',
      url: '/password-reset'
      views:
        main:
          controller: 'resetCtrl'
          templateUrl: 'builder/auth.reset/auth.reset.html'
        offscreen:
          templateUrl: 'builder/templates/template.offscreen.default.html'
      data:
        pageTitle: 'Reset your password | eeosk'
