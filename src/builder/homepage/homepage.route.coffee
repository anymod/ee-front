'use strict'

angular.module('builder.homepage').config ($stateProvider) ->

  $stateProvider

    # .state 'collectionsAdd',
    #   url: '/collections/add'
    #   views:
    #     header:
    #       controller: 'dailyCtrl as daily'
    #       templateUrl: 'builder/collections/collections.header.html'
    #     top:
    #       controller: 'collectionsCtrl as collections'
    #       templateUrl: 'builder/collections/collections.add.html'
    #   data:
    #     pageTitle:        'Add collections | eeosk'
    #     pageDescription:  'Add collections to your store.'
    #     padTop:           '110px'

    .state 'homepage',
      url: '/store/homepage'
      views:
        header:
          controller: 'dailyCtrl as daily'
          templateUrl: 'builder/homepage/homepage.header.html'
        top:
          controller: 'homepageCtrl as homepage'
          templateUrl: 'builder/homepage/homepage.html'
      data:
        pageTitle: 'Your store | eeosk'
        padTop:    '110px'

  return
