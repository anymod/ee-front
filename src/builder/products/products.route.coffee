'use strict'

angular.module('builder.products').config ($stateProvider) ->

  $stateProvider

    # Multiple products

    .state 'featured',
      url: '/featured'
      views:
        header:
          templateUrl: 'builder/products/products.header.html'
        top:
          controller: 'productsCtrl as products'
          templateUrl: 'builder/products/products.featured.html'
      data:
        pageTitle:        'Your featured products | eeosk'
        pageDescription:  'Manage your featured products.'
        padTop:           '100px'

    .state 'categories',
      url: '/categories'
      views:
        header:
          templateUrl: 'builder/products/products.header.html'
        top:
          controller: 'productsCtrl as products'
          templateUrl: 'builder/products/products.categories.html'
      data:
        pageTitle:        'Your categories | eeosk'
        padTop:           '100px'

    .state 'productsAdd',
      url: '/products/add'
      views:
        header:
          templateUrl: 'builder/products/products.header.html'
        top:
          controller: 'productsCtrl as products'
          templateUrl: 'builder/products/products.add.html'
      data:
        pageTitle:        'Add products | eeosk'
        pageDescription:  'Add products to your store.'
        padTop:           '100px'


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
        padTop:           '100px'

    .state 'product',
      url: '/products/:id/:title'
      views:
        header:
          controller: 'storefrontCtrl as storefront'
          templateUrl: 'builder/storefront/storefront.header.html'
        top:
          controller: 'productCtrl as product'
          templateUrl: 'ee-shared/storefront/storefront.product.html'
      data:
        pageTitle:        'Your product | eeosk'
        padTop:           '124px'

  return
