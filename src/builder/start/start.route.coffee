'use strict'

angular.module('builder.start').config ($stateProvider) ->

  $stateProvider
    .state 'start',
      url: '/start?lane'
      views:
        header:
          controller: 'storefrontCtrl as storefront'
          templateUrl: 'builder/daily/daily.header.html'
        top:
          controller: 'startCtrl as start'
          templateUrl: 'builder/start/start.html'
      data:
        pageTitle: 'Getting started | eeosk'
        padTop:    '110px'
      params:
        lane: null
