'use strict'

angular.module('builder.brand').config ($stateProvider) ->

  $stateProvider
    .state 'brand',
      url: '/brand?activity'
      views:
        header:
          controller: 'storefrontCtrl as storefront'
          templateUrl: 'builder/daily/daily.header.html'
        top:
          controller: 'brandCtrl as brand'
          templateUrl: 'builder/brand/brand.html'
      data:
        pageTitle: 'Build your brand | eeosk'
        padTop:    '110px'
      params:
        activity: null
