'use strict'

angular.module('builder.date').config ($stateProvider) ->

  $stateProvider

    .state 'date',
      url: '/date/:year/:month/:day'
      views:
        header:
          controller: 'storefrontCtrl as storefront'
          templateUrl: 'builder/daily/daily.header.html'
        # top:
        #   controller: 'dailyCtrl as daily'
        #   templateUrl: 'builder/daily/daily.html'
        middle:
          controller: 'dateCtrl as date'
          templateUrl: 'builder/date/date.html'
      data:
        pageTitle:        'Views & Visits | eeosk'
        padTop:           '110px'

  return
