'use strict'

angular.module('builder.storeproducts').config ($stateProvider) ->

  $stateProvider

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
        padTop:           '100px'

    .state 'storeproductEdit',
      url: '/products/:id/edit'
      views:
        header:
          controller: 'storeproductCtrl as storeproduct'
          templateUrl: 'builder/storeproducts/storeproduct.header.html'
        top:
          controller: 'storeproductCtrl as storeproduct'
          templateUrl: 'builder/storeproducts/storeproduct.edit.html'
      data:
        pageTitle:        'Your product | eeosk'
        padTop:           '100px'

    .state 'storeproduct',
      url: '/products/:id/:title'
      views:
        header:
          controller: 'storefrontCtrl as storefront'
          templateUrl: 'builder/storefront/storefront.header.html'
        top:
          controller: 'storeproductCtrl as storeproduct'
          templateUrl: 'ee-shared/storefront/storefront.product.html'
      data:
        pageTitle:        'Your product | eeosk'
        padTop:           '124px'

    .state 'featured',
      url: '/featured'
      views:
        header:
          controller: 'storeproductsCtrl as storeproducts'
          templateUrl: 'builder/storeproducts/storeproducts.header.html'
        top:
          controller: 'storeproductsCtrl as storeproducts'
          templateUrl: 'builder/storeproducts/storeproducts.featured.html'
      data:
        pageTitle:        'Featured products in your store | eeosk'
        pageDescription:  'Manage your featured products.'
        padTop:           '100px'

  return
