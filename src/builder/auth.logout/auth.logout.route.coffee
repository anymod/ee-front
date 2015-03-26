'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'logout',
      url: '/logout'
      views:
        main:
          templateUrl: 'builder/auth.logout/auth.logout.html'
          controller: 'logoutCtrl'
        offscreen:
          templateUrl: 'components/ee-offscreen.html'
          controller: 'landingCtrl'
      data: pageTitle: 'Logged out | eeosk'
