'use strict'

angular.module('builder.edit').config ($stateProvider) ->

  views =
    header:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'builder/edit/edit.header.html'
    top:
      controller: 'editCtrl as edit'
      templateUrl: 'builder/edit/edit.html'
    middle:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'builder/edit/edit.preview.html'

  data =
    pageTitle:        'Edit your store | eeosk'
    pageDescription:  'Edit the look and feel of your online store.'
    padTop:           '100px'

  $stateProvider
    .state 'edit',
      url:    '/edit'
      views:  views
      data:   data
    .state 'edit.topbar',
      url:    '/topbar'
      views:  views
    .state 'edit.social',
      url:    '/social'
      views:  views
    .state 'edit.about',
      url:    '/about'
      views:  views
    .state 'edit.blog',
      url:    '/blog'
      views:  views
    .state 'edit.seo',
      url:    '/seo'
      views:  views

  return
