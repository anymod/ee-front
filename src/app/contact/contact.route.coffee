'use strict'

angular.module('app.contact').config ($stateProvider) ->

  $stateProvider
    .state 'signupSell',
      url: '/create-online-store'
      templateUrl: 'partials/pre/info.signup.html'
      controller: 'contactCtrl'
      data:
        pageTitle: 'Create your store | eeosk'
