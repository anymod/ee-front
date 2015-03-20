'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'reset',
      url: '/password-reset'
      templateUrl: 'builder/auth.reset/auth.reset.html'
      controller: 'resetCtrl'
      data: pageTitle: 'Reset your password | eeosk'
