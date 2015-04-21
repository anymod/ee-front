'use strict'

angular.module('builder.landing').config ($stateProvider) ->

  views =
    header:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'builder/storefront/storefront.header.html'
    top:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'app/storefront/storefront.carousel.html'
    middle:
      controller: 'editCtrl as edit'
      templateUrl: 'builder/edit/edit.html'

  data =
    pageTitle:        'Try it out: build your online store | eeosk'
    pageDescription:  'Start building your own online store.'
    padTop:           '85px'

  $stateProvider
    .state 'try-edit',
      url:      '/try/edit'
      views:    views
      data:     data
      # resolve:  user: (eeAuth) -> eeAuth.fns.getOrSetUser()

    .state 'edit',
      url:      '/edit'
      views:    views
      data:     data
      # resolve:  user: (eeAuth) -> eeAuth.fns.getOrSetUser()

  return
