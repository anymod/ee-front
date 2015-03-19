'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'login',
      url: '/login'
      templateUrl: 'builder/auth.login/auth.login.html'
      controller: 'loginCtrl'
      data: pageTitle: 'Login | eeosk'
