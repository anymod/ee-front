'use strict'

angular.module('builder.collections').config ($stateProvider) ->

  $stateProvider

    .state 'collectionsAdd',
      url: '/collections/add'
      views:
        header:
          controller: 'dailyCtrl as daily'
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
          controller: 'dailyCtrl as daily'
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
          controller: 'dailyCtrl as daily'
          templateUrl: 'builder/collections/collection.header.html'
        top:
          controller: 'collectionCtrl as collection'
          templateUrl: 'builder/collections/collection.html'
      data:
        pageTitle:        'Collection in your store | eeosk'
        padTop:           '60px'

  return
