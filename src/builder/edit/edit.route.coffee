'use strict'

angular.module('builder.landing').config ($stateProvider) ->

  views =
    header:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'builder/storefront/storefront.header.html'
    top:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'ee-shared/storefront/storefront.carousel.html'
    middle:
      controller: 'editCtrl as edit'
      templateUrl: 'builder/edit/edit.html'

  data =
    pageTitle:        'Edit your store | eeosk'
    pageDescription:  'Edit the look and feel of your online store.'
    padTop:           '100px'

  $stateProvider
    .state 'edit',
      url:      '/edit'
      views:    views
      data:     data

  return
