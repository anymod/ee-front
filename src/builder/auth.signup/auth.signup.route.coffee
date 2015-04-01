'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'signup',
      url: '/create-online-store'
      views:
        main:
          controller: 'signupCtrl'
          templateUrl: 'builder/auth.signup/auth.signup.html'
        offscreen:
          templateUrl: 'components/template.offscreen.default.html'
      data:
        pageTitle: 'Create your store | eeosk'
