'use strict'

angular.module('builder.products').config ($stateProvider) ->

  $stateProvider

    # Multiple products

    .state 'products',
      url: '/products'
      views:
        header:
          templateUrl: 'builder/products/products.header.html'
        top:
          controller: 'productsCtrl as products'
          templateUrl: 'builder/products/products.html'
      data:
        pageTitle: 'Featured products | eeosk'
        padTop:    '110px'

    # Single product

    .state 'productAdd',
      url: '/products/:id/:title'
      views:
        header:
          controller: 'productCtrl as product'
          templateUrl: 'builder/products/product.header.html'
        top:
          controller: 'productCtrl as product'
          templateUrl: 'builder/products/product.html'
        # middle:
        #   controller: 'productCtrl as product'
        #   templateUrl: 'builder/products/product.add.html'
      data:
        pageTitle: 'Product | eeosk'
        padTop:    '60px'

    # .state 'product',
    #   url: '/products/:id/:title'
    #   views:
    #     header:
    #       controller: 'productCtrl as product'
    #       templateUrl: 'builder/products/product.header.html'
    #     top:
    #       controller: 'productCtrl as product'
    #       templateUrl: 'builder/products/product.add.html'
    #   data:
    #     pageTitle: 'Product | eeosk'
    #     padTop:    '60px'

  return
