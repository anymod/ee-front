'use strict'

angular.module('builder.tracks').config ($stateProvider) ->

  $stateProvider

    .state 'tracks',
      url: '/tracks'
      views:
        header:
          controller: 'storefrontCtrl as storefront'
          templateUrl: 'builder/daily/daily.header.html'
        top:
          controller: 'tracksCtrl as tracks'
          templateUrl: 'builder/tracks/tracks.html'
      data:
        pageTitle:        'Marketing Tracks | eeosk'
        padTop:           '110px'

  return
