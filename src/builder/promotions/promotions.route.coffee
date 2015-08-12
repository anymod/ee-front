'use strict'

angular.module('builder.promotions').config ($stateProvider) ->

  views =
    header:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'builder/promotions/promotions.header.html'
    top:
      controller: 'promotionsCtrl as promotions'
      templateUrl: 'builder/promotions/promotions.html'
    # middle:
    #   controller: 'storefrontCtrl as storefront'
    #   templateUrl: 'builder/promotions/promotions.preview.html'

  data =
    pageTitle:        'Promote your store | eeosk'
    pageDescription:  'Promote your online store.'
    padTop:           '50px'

  $stateProvider
    .state 'promotions',
      url:    '/promotions'
      views:  views
      data:   data
    .state 'promotions.social',
      url:    '/social'
      views:  views
    .state 'promotions.body',
      url:    '/body'
      views:  views
    .state 'promotions.about',
      url:    '/about'
      views:  views
    .state 'promotions.blog',
      url:    '/blog'
      views:  views
    .state 'promotions.seo',
      url:    '/seo'
      views:  views

  return
