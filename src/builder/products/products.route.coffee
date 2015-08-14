'use strict'

angular.module('builder.products').config ($stateProvider) ->

  $stateProvider

    .state 'product',
      url: '/collections/:id/products/:productId'
      views:
        header:
          controller: 'productCtrl as product'
          templateUrl: 'builder/products/product.header.html'
        top:
          controller: 'productCtrl as product'
          templateUrl: 'builder/products/product.html'
      data:
        pageTitle:        'Add product | eeosk'
        pageDescription:  'Add to your store'
        padTop:           '50px'

  return
