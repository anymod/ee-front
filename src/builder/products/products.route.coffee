'use strict'

angular.module('builder.products').config ($stateProvider) ->

  $stateProvider

    # Multiple products

    .state 'products',
      url: '/products/featured'
      views:
        header:
          templateUrl: 'builder/products/products.header.html'
        top:
          controller: 'productsCtrl as products'
          templateUrl: 'builder/products/products.featured.html'
      data:
        pageTitle: 'Featured products | eeosk'
        padTop:    '110px'

    # Single product

    .state 'productAdd',
      url: '/products/add/:id'
      views:
        header:
          controller: 'productCtrl as product'
          templateUrl: 'builder/products/product.header.html'
        top:
          controller: 'productCtrl as product'
          templateUrl: 'builder/products/product.add.html'
      data:
        pageTitle:        'Add product | eeosk'
        pageDescription:  'Add to your store'
        padTop:           '60px'

    .state 'product',
      url: '/products/:id/:title'
      views:
        top:
          controller: 'storefrontCtrl as storefront'
          templateUrl: 'builder/storefront/storefront.header.html'
        header:
          controller: 'productCtrl as product'
          templateUrl: 'ee-shared/storefront/storefront.product.html'
      data:
        pageTitle:        'Your product | eeosk'
        padTop:           '0'

  return
