'use strict'

angular.module('builder.daily').config ($stateProvider) ->

  $stateProvider

    .state 'daily',
      url: '/daily'
      views:
        header:
          controller: 'storefrontCtrl as storefront'
          templateUrl: 'builder/daily/daily.header.html'
        top:
          controller: 'dailyCtrl as daily'
          templateUrl: 'builder/daily/daily.html'
        middle:
          controller: 'dateCtrl as date'
          templateUrl: 'builder/date/date.html'
      data:
        pageTitle:        'Daily Action | eeosk'
        padTop:           '110px'

  return
