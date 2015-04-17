'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'reset',
      url: '/reset-password'
      views:
        top:
          controller: 'resetCtrl'
          templateUrl: 'builder/auth.reset/auth.reset.html'
        footer:
          templateUrl: 'builder/landing/landing.footer.html'
      data:
        pageTitle: 'Reset your password | eeosk'
