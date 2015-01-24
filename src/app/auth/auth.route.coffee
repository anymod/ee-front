'use strict'

angular.module('app.auth').config ($stateProvider) ->

  $stateProvider
    .state 'login',
      url: '/login'
      templateUrl: 'app/auth/auth.login.html'
      controller: 'loginCtrl'
      data: pageTitle: 'Login | eeosk'
    .state 'logout',
      url: '/logout'
      template: ''
      controller: 'logoutCtrl'
      data: pageTitle: 'Logout | eeosk'
