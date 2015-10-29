'use strict'

angular.module('builder.products').config ($stateProvider) ->

  $stateProvider

    .state 'categories',
      url: '/categories'
      views:
        header:
          templateUrl: 'builder/products/products.header.html'
        top:
          controller: 'categorizationsCtrl as categorizations'
          templateUrl: 'builder/categorizations/categorizations.html'
      data:
        pageTitle:        'Your categories | eeosk'
        padTop:           '100px'

  return
