'use strict'

angular.module('builder.account').config ($stateProvider) ->

  $stateProvider
    .state 'account',
      url: '/account'
      templateUrl: 'builder/account/account.html'
      controller: 'builder.accountCtrl'
      data:
        pageTitle: 'Account | eeosk'
        offscreenCategory: 'Account'
        offscreenColor: 'dark'
