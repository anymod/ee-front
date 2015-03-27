'use strict'

angular.module('builder.account').config ($stateProvider) ->

  $stateProvider.state 'account',
    url: '/account'
    views:
      main:
        templateUrl: 'builder/account/account.html'
        controller: 'builder.accountCtrl'
      offscreen:
        templateUrl: 'builder/account/account.offscreen.html'
        controller: 'builder.accountCtrl'
    data:
      pageTitle: 'Account | eeosk'
