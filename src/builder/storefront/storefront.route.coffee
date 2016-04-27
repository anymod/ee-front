'use strict'

angular.module('builder.storefront').config ($stateProvider) ->

  views =
    top:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'builder/storefront/storefront.header.html'
    middle:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'ee-shared/storefront/storefront.carousel.html'
    # bottom:
    #   controller: 'storefrontCtrl as storefront'
    #   templateUrl: 'ee-shared/storefront/storefront.featured.html'
    footer:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'ee-shared/storefront/storefront.footer.html'

  aboutViews =
    header: views.header
    top:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'ee-shared/storefront/storefront.about.html'
    footer: views.footer

  data =
    pageTitle:        'Your store | eeosk'
    pageDescription:  'Preview and navigate your eeosk.'
    padTop:           '0'

  $stateProvider

    .state 'storefront',
      url:      '/storefront'
      views:    views
      data:     data

    # .state 'storefront-about',
    #   url:      '/storefront/about'
    #   views:    aboutViews
    #   data:     data

  return
