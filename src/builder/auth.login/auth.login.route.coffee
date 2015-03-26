'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'login',
      url: '/login'
      views:
        main:
          templateUrl: 'builder/auth.login/auth.login.html'
          controller: 'loginCtrl'
        offscreen:
          templateUrl: 'components/ee-offscreen.html'
          controller: 'landingCtrl'
      data: pageTitle: 'Login | eeosk'
