'use strict'

angular.module('builder.promote').config ($stateProvider) ->

  views =
    header:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'builder/promote/promote.header.html'
    top:
      controller: 'promoteCtrl as promote'
      templateUrl: 'builder/promote/promote.html'
    # middle:
    #   controller: 'storefrontCtrl as storefront'
    #   templateUrl: 'builder/promote/promote.preview.html'

  data =
    pageTitle:        'Promote your store | eeosk'
    pageDescription:  'Promote your online store.'
    padTop:           '50px'

  $stateProvider
    .state 'promote',
      url:    '/promote'
      views:  views
      data:   data
    .state 'promote.social',
      url:    '/social'
      views:  views
    .state 'promote.body',
      url:    '/body'
      views:  views
    .state 'promote.about',
      url:    '/about'
      views:  views
    .state 'promote.blog',
      url:    '/blog'
      views:  views
    .state 'promote.seo',
      url:    '/seo'
      views:  views

  return
