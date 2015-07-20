'use strict'

angular.module('builder.collections').config ($stateProvider) ->

  $stateProvider

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
        padTop:           '50px'

    .state 'collectionView',
      url: '/collections/:id'
      views:
        header:
          controller: 'collectionViewCtrl as collectionView'
          templateUrl: 'builder/collections/collection.view.header.html'
        top:
          controller: 'collectionViewCtrl as collectionView'
          templateUrl: 'builder/collections/collection.view.html'
      data:
        pageTitle:        'Collection in your store | eeosk'
        pageDescription:  'Manage your collection.'
        padTop:           '50px'

  return
