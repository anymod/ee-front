'use strict'

angular.module('app.auth').config ($stateProvider) ->

  $stateProvider
    .state 'login',
      url: '/user/login'
      templateUrl: 'app/auth/auth.login.html'
      controller: 'loginCtrl'
      data: pageTitle: 'Login | eeosk'
    .state 'loginTemp',
      url: '/login'
      templateUrl: 'app/auth/auth.loginTemp.html'
      controller: 'loginTempCtrl'
      data: pageTitle: 'Login | eeosk'
    .state 'logout',
      url: '/user/logout'
      template: ''
      controller: 'logoutCtrl'
      data: pageTitle: 'Logout | eeosk'
