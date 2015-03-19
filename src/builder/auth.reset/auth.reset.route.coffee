'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'reset',
      url: '/reset'
      template: 'Reset'
      controller: 'resetCtrl'
      data: pageTitle: 'Reset your password | eeosk'
