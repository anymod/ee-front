'use strict'

angular.module('builder.playbook').config ($stateProvider) ->

  $stateProvider

    .state 'playbook-daily',
      url: '/playbook/daily'
      views:
        header:
          controller: 'playbookCtrl as playbook'
          templateUrl: 'builder/playbook/playbook.header.html'
        top:
          # controller: 'dashboardCtrl as dashboard'
          templateUrl: 'builder/playbook/playbook.daily.html'
        middle:
          controller: 'dateCtrl as date'
          templateUrl: 'builder/date/date.html'
      data:
        pageTitle:        'Views & Visits | eeosk'
        padTop:           '110px'

    .state 'playbook-tracks',
      url: '/playbook/tracks'
      views:
        header:
          controller: 'playbookCtrl as playbook'
          templateUrl: 'builder/playbook/playbook.header.html'
        top:
          # controller: 'dashboardCtrl as dashboard'
          templateUrl: 'builder/playbook/playbook.tracks.html'
        # middle:
        #   controller: 'dateCtrl as date'
        #   templateUrl: 'builder/date/date.html'
      data:
        pageTitle:        'Views & Visits | eeosk'
        padTop:           '110px'

  return
