'use strict'

angular.module('app.account').config ($stateProvider) ->

  $stateProvider
    .state 'app.account',
      url: '/account'
      templateUrl: 'app/account/account.html'
      controller: 'app.catalogCtrl'
      data:
        pageTitle: 'Account | eeosk'
        offscreenCategory: 'Account'
        offscreenColor: 'dark'
