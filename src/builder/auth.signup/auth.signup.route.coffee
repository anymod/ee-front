'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'signup',
      url: '/create-online-store'
      views:
        top:
          controller: 'signupCtrl'
          templateUrl: 'builder/auth.signup/auth.signup.html'
        footer:
          templateUrl: 'builder/landing/landing.footer.html'
      data:
        pageTitle: 'Create your store | eeosk'
