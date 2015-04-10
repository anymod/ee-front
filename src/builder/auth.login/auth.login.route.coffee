'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'login',
      url: '/login'
      views:
        top:
          controller: 'loginCtrl'
          templateUrl: 'builder/auth.login/auth.login.html'
        footer:
          templateUrl: 'builder/landing/landing.footer.html'
      data:
        pageTitle: 'Login | eeosk'
