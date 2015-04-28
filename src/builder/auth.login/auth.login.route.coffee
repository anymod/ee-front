'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'login',
      url: '/login'
      views:
        top:
          controller: 'loginCtrl as login'
          templateUrl: 'builder/auth.login/auth.login.html'
        footer:
          controller: 'landingCtrl as landing'
          templateUrl: 'builder/landing/landing.footer.html'
      data:
        pageTitle: 'Login | eeosk'

  return
