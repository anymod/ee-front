'use strict'

angular.module('builder.live').config ($stateProvider) ->

  $stateProvider
    .state 'live',
      url: '/live'
      views:
        top:
          controller: 'liveCtrl as live'
          templateUrl: 'builder/live/live.html'
      data:
        pageTitle: 'View your store | eeosk'

  return
