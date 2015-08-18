'use strict'

angular.module('builder.storeproducts').config ($stateProvider) ->

  $stateProvider

    .state 'storeproduct',
      url: '/products/:id'
      views:
        header:
          controller: 'storeproductCtrl as storeproduct'
          templateUrl: 'builder/storeproducts/storeproduct.header.html'
        top:
          controller: 'storeproductCtrl as storeproduct'
          templateUrl: 'builder/storeproducts/storeproduct.html'
      data:
        pageTitle:        'Your product | eeosk'
        padTop:           '50px'

    .state 'storeproducts',
      url: '/products'
      views:
        header:
          controller: 'storeproductsCtrl as storeproducts'
          templateUrl: 'builder/storeproducts/storeproducts.header.html'
        top:
          controller: 'storeproductsCtrl as storeproducts'
          templateUrl: 'builder/storeproducts/storeproducts.html'
      data:
        pageTitle:        'Product in your store | eeosk'
        padTop:           '50px'

  return
