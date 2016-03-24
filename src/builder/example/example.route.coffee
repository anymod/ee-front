'use strict'

angular.module('builder.example').config ($stateProvider, $locationProvider) ->

  $stateProvider
    .state 'example',
      url: '/example'
      views:
        top:
          controller: 'exampleCtrl as storefront'
          templateUrl: 'builder/example/example.html'
      data:
        pageTitle:        'Example Store | eeosk'
        pageDescription:  'An example of what\'s possible on eeosk.'

  return
