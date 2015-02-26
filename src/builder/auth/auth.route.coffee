'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'login',
      url: '/login'
      templateUrl: 'builder/auth/auth.login.html'
      controller: 'loginCtrl'
      data: pageTitle: 'Login | eeosk'
    .state 'logout',
      url: '/logout'
      template: ''
      controller: 'logoutCtrl'
      data: pageTitle: 'Logout | eeosk'
