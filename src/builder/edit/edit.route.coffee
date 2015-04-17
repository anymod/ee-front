'use strict'

angular.module('builder.landing').config ($stateProvider, $locationProvider) ->

  $stateProvider
    .state 'edit',
      url: '/edit'
      views:
        header:
          controller: 'storefrontCtrl as storefront'
          templateUrl: 'builder/storefront/storefront.header.html'
        top:
          controller: 'storefrontCtrl as storefront'
          templateUrl: 'app/storefront/storefront.home.carousel.html'
        middle:
          controller: 'editCtrl as edit'
          templateUrl: 'builder/edit/edit.html'
      data:
        pageTitle:        'Try it out: build your online store | eeosk'
        pageDescription:  'Start building your own online store.'
        padTop: '85px'

  return
