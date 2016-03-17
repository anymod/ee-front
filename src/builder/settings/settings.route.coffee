'use strict'

angular.module('builder.settings').config ($stateProvider) ->

  $stateProvider

    .state 'settings',
      url: '/store/settings'
      views:
        # header:
        #   controller: 'dailyCtrl as daily'
        #   templateUrl: 'builder/homepage/homepage.header.html'
        top:
          controller: 'settingsCtrl as settings'
          templateUrl: 'builder/settings/settings.html'
      data:
        pageTitle: 'Store settings | eeosk'
        padTop:    '110px'

  return
