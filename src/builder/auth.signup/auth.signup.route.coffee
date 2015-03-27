'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'signup',
      url: '/create-online-store'
      views:
        main:
          templateUrl: 'builder/auth.signup/auth.signup.html'
          controller: 'signupCtrl'
        offscreen:
          templateUrl: 'components/template.offscreen.default.html'
          controller: 'landingCtrl'
      data:
        pageTitle: 'Create your store | eeosk'
