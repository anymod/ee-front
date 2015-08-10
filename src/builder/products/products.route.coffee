'use strict'

angular.module('builder.products').config ($stateProvider) ->

  $stateProvider

    # .state 'products',
    #   url: '/products'
    #   views:
    #     header:
    #       controller: 'productsCtrl as products'
    #       templateUrl: 'builder/products/products.header.html'
    #     top:
    #       controller: 'productsCtrl as products'
    #       templateUrl: 'builder/products/products.html'
    #   data:
    #     pageTitle:        'Add products | eeosk'
    #     pageDescription:  'Choose products to add to your store.'
    #     padTop:           '50px'

    .state 'productView',
      url: '/products/:id'
      views:
        header:
          controller: 'productViewCtrl as productView'
          templateUrl: 'builder/products/product.view.header.html'
        top:
          controller: 'productViewCtrl as productView'
          templateUrl: 'builder/products/product.view.html'
      data:
        pageTitle:        'Add product | eeosk'
        pageDescription:  'Add to your store'
        padTop:           '50px'

  return
