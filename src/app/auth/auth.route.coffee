'use strict'

angular.module('app.auth').config ($stateProvider) ->

  $stateProvider
    .state 'login',
      url: '/user/login'
      templateUrl: 'partials/pre/auth.login.html'
      controller: 'loginCtrl'
      data: pageTitle: 'Login | eeosk'
    .state 'loginTemp',
      url: '/login'
      templateUrl: 'partials/pre/auth.loginTemp.html'
      controller: 'loginTempCtrl'
      data: pageTitle: 'Login | eeosk'
    .state 'logout',
      url: '/user/logout'
      template: ''
      controller: 'logoutCtrl'
      data: pageTitle: 'Logout | eeosk'
