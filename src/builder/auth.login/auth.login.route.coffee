'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'login',
      url: '/login'
      views:
        top:
          controller: 'loginCtrl as login'
          templateUrl: 'builder/auth.login/auth.login.html'
      data:
        pageTitle: 'Sign in | eeosk'
        padTop: '60px'
      params: exists: false

  return
