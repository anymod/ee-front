'use strict'

angular.module('builder.account').config ($stateProvider) ->

  $stateProvider
    .state 'app.account',
      url: '/account'
      templateUrl: 'builder/account/account.html'
      controller: 'builder.catalogCtrl'
      data:
        pageTitle: 'Account | eeosk'
        offscreenCategory: 'Account'
        offscreenColor: 'dark'
