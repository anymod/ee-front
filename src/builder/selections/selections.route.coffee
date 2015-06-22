'use strict'

angular.module('builder.selections').config ($stateProvider) ->

  $stateProvider

    .state 'selections',
      url: '/selections'
      views:
        header:
          controller: 'selectionsCtrl as selections'
          templateUrl: 'builder/products/products.header.html'
        top:
          controller: 'selectionsCtrl as selections'
          templateUrl: 'builder/selections/selections.html'
      data:
        pageTitle:        'Products in my store | eeosk'
        pageDescription:  'Manage the products in your store.'
        padTop:           '50px'

    .state 'selectionView',
      url: '/selections/:id'
      views:
        header:
          controller: 'selectionViewCtrl as selections'
          templateUrl: 'builder/selections/selection.view.header.html'
        top:
          controller: 'selectionViewCtrl as selections'
          templateUrl: 'builder/selections/selection.view.html'
      data:
        pageTitle:        'Product in my store | eeosk'
        pageDescription:  'Manage the product in your store.'
        padTop:           '50px'

  return
