'use strict'

angular.module('builder.collections').config ($stateProvider) ->

  $stateProvider

    .state 'collectionsAdd',
      url: '/collections/add'
      views:
        header:
          controller: 'collectionsCtrl as collections'
          templateUrl: 'builder/collections/collections.header.html'
        top:
          controller: 'collectionsCtrl as collections'
          templateUrl: 'builder/collections/collections.add.html'
      data:
        pageTitle:        'Add collections | eeosk'
        pageDescription:  'Add collections to your store.'
        padTop:           '110px'

    .state 'collections',
      url: '/collections'
      views:
        header:
          controller: 'collectionsCtrl as collections'
          templateUrl: 'builder/collections/collections.header.html'
        top:
          controller: 'collectionsCtrl as collections'
          templateUrl: 'builder/collections/collections.html'
      data:
        pageTitle:        'Your collections | eeosk'
        pageDescription:  'Manage the collections in your store.'
        padTop:           '110px'

    .state 'collection',
      url: '/collections/:id'
      views:
        header:
          controller: 'collectionCtrl as collection'
          templateUrl: 'builder/collections/collection.header.html'
        top:
          controller: 'collectionCtrl as collection'
          templateUrl: 'builder/collections/collection.html'
        middle:
          controller: 'collectionCtrl as collection'
          templateUrl: 'builder/collections/collection.products.html'
      data:
        pageTitle:        'Collection in your store | eeosk'
        pageDescription:  'Manage your collection.'
        padTop:           '110px'

    # .state 'collectionTemplates',
    #   url: '/collections/:id/products'
    #   views:
    #     header:
    #       controller: 'collectionCtrl as collection'
    #       templateUrl: 'builder/collections/collection.header.html'
    #     top:
    #       controller: 'collectionCtrl as collection'
    #       templateUrl: 'builder/collections/collection.products.html'
    #   data:
    #     pageTitle:        'Products in your collection | eeosk'
    #     pageDescription:  'Manage your collection.'
    #     padTop:           '110px'

    # .state 'collection',
    #   url: '/collections/:id/:title'
    #   views:
    #     header:
    #       controller: 'storefrontCtrl as storefront'
    #       templateUrl: 'builder/storefront/storefront.header.html'
    #     top:
    #       controller: 'collectionCtrl as collection'
    #       templateUrl: 'ee-shared/storefront/storefront.collection.html'
    #   data:
    #     pageTitle:        'Collection in your store | eeosk'
    #     pageDescription:  'Manage your collection.'
    #     padTop:           '124px'

  return
