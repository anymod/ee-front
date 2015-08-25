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
        pageTitle:        'Collections in your store | eeosk'
        pageDescription:  'Manage the collections in your store.'
        padTop:           '100px'

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
        pageTitle:        'Collections in your store | eeosk'
        pageDescription:  'Manage the collections in your store.'
        padTop:           '100px'

    .state 'collection',
      url: '/collections/:id'
      views:
        header:
          controller: 'collectionCtrl as collection'
          templateUrl: 'builder/collections/collection.header.html'
        top:
          controller: 'collectionCtrl as collection'
          templateUrl: 'builder/collections/collection.html'
      data:
        pageTitle:        'Collection in your store | eeosk'
        pageDescription:  'Manage your collection.'
        padTop:           '124px'

    .state 'collectionEdit',
      url: '/collections/:id/edit'
      views:
        header:
          controller: 'collectionCtrl as collection'
          templateUrl: 'builder/collections/collection.header.html'
        top:
          controller: 'collectionCtrl as collection'
          templateUrl: 'builder/collections/collection.edit.html'
      data:
        pageTitle:        'Collection in your store | eeosk'
        pageDescription:  'Manage your collection.'
        padTop:           '100px'

    .state 'collectionProducts',
      url: '/collections/:id/products'
      views:
        header:
          controller: 'collectionCtrl as collection'
          templateUrl: 'builder/collections/collection.header.html'
        top:
          controller: 'collectionCtrl as collection'
          templateUrl: 'builder/collections/collection.products.html'
      data:
        pageTitle:        'Products in your collection | eeosk'
        pageDescription:  'Manage your collection.'
        padTop:           '100px'

  return
