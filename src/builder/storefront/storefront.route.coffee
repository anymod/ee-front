'use strict'

angular.module('builder.storefront').config ($stateProvider) ->

  views =
    header:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'builder/storefront/storefront.header.html'
    top:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'ee-shared/storefront/storefront.carousel.html'
    middle:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'ee-shared/storefront/storefront.products.html'
    bottom:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'builder/storefront/storefront.add.html'
    footer:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'ee-shared/storefront/storefront.footer.html'

  shopViews =
    header: views.header
    top:    views.middle
    middle: views.bottom
    footer: views.footer

  aboutViews =
    header: views.header
    top:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'ee-shared/storefront/storefront.about.html'
    footer: views.footer

  data =
    pageTitle:        'Your store | eeosk'
    pageDescription:  'Preview and navigate your eeosk.'
    padTop:           '124px'

  $stateProvider

    .state 'storefront',
      url:      '/storefront'
      views:    views
      data:     data

    .state 'collection',
      url:      '/storefront/shop/:title'
      views:    shopViews
      data:     data

    .state 'storefront-about',
      url:      '/storefront/about'
      views:    aboutViews
      data:     data

  return
