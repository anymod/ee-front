'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'signup',
      url: '/create-online-store'
      templateUrl: 'builder/auth.signup/auth.signup.html'
      controller: 'signupCtrl'
      data:
        pageTitle: 'Create your store | eeosk'
