'use strict'

angular.module('builder.collections').config ($stateProvider) ->

  $stateProvider

    .state 'collectionsAdd',
      url: '/collections/add'
      views:
        # header:
        #   controller: 'dailyCtrl as daily'
        #   templateUrl: 'builder/collections/collections.header.html'
        top:
          controller: 'collectionsCtrl as collections'
          templateUrl: 'builder/collections/collections.add.html'
      data:
        pageTitle:        'Add collections | eeosk'
        padTop:           '0px'

    .state 'collectionsNew',
      url: '/collections/new'
      views:
        top:
          controller: 'collectionsCtrl as collections'
          templateUrl: 'builder/collections/collections.new.html'
      data:
        pageTitle: 'New collection | eeosk'
        padTop: '0px'

    # .state 'collections',
    #   url: '/collections'
    #   views:
    #     header:
    #       controller: 'dailyCtrl as daily'
    #       templateUrl: 'builder/collections/collections.header.html'
    #     top:
    #       controller: 'collectionsCtrl as collections'
    #       templateUrl: 'builder/collections/collections.html'
    #   data:
    #     pageTitle:        'Your collections | eeosk'
    #     padTop:           '110px'

    .state 'collectionimage',
      url: '/collections/:id/image'
      views:
        top:
          controller: 'collectionCtrl as collection'
          templateUrl: 'builder/collections/collection.image.html'
      data:
        pageTitle: 'Edit collection image | eeosk'
        padTop: '0px'

    .state 'collectionproducts',
      url: '/collections/:id/products'
      views:
        top:
          controller: 'collectionCtrl as collection'
          templateUrl: 'builder/collections/collection.products.html'
      data:
        pageTitle: 'Products in your collection | eeosk'
        padTop: '0px'

    .state 'collectionpreview',
      url: '/collections/:id/preview'
      views:
        top:
          controller: 'collectionCtrl as collection'
          templateUrl: 'builder/collections/collection.preview.html'
      data:
        pageTitle: 'Preview collection | eeosk'
        padTop: '0px'

    .state 'collectionadd',
      url: '/collections/:id/add'
      views:
        top:
          controller: 'collectionCtrl as collection'
          templateUrl: 'builder/collections/collection.add.html'
      data:
        pageTitle: 'Add products | eeosk'
        padTop: '0px'

  return
