'use strict'

angular.module('builder.auth').config ($stateProvider) ->

  $stateProvider
    .state 'logout',
      url: '/logout'
      views:
        main:
          controller: 'logoutCtrl'
          templateUrl: 'builder/auth.logout/auth.logout.html'
        offscreen:
          templateUrl: 'builder/templates/template.offscreen.default.html'
      data:
        pageTitle: 'Logged out | eeosk'

  return
