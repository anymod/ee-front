'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'logout',
      url: '/logout'
      templateUrl: 'builder/auth.logout/auth.logout.html'
      controller: 'logoutCtrl'
      data: pageTitle: 'Logged out | eeosk'
