'use strict'

angular.module('builder.products').config ($stateProvider) ->

  $stateProvider

    .state 'product',
      url: '/products/add/:id'
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
        padTop:           '100px'

    .state 'products',
      url: '/products/add'
      views:
        header:
          controller: 'productsCtrl as products'
          templateUrl: 'builder/products/products.header.html'
        top:
          controller: 'productsCtrl as products'
          templateUrl: 'builder/products/products.html'
      data:
        pageTitle:        'Collection in your store | eeosk'
        pageDescription:  'Add products to your collections.'
        padTop:           '100px'

  return
