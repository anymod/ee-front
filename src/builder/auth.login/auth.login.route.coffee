'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'login',
      url: '/login'
      views:
        main:
          controller: 'loginCtrl'
          templateUrl: 'builder/auth.login/auth.login.html'
        offscreen:
          templateUrl: 'builder/templates/template.offscreen.default.html'
      data:
        pageTitle: 'Login | eeosk'
