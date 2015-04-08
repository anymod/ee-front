'use strict'

angular.module('builder.container').config ($stateProvider, $locationProvider) ->

  $stateProvider.state 'landing',
    url: '/'
    resolve: user: () -> {} # eeAuth.userFromToken()
    views:
      main:
        controller: 'containerCtrl'
        templateUrl: 'builder/container/container.html'
    data:
      pageTitle:        'Online store builder, ecommerce storefront, dropship product catalog | eeosk'
      pageDescription:  'Create an online store from a catalog of products.'

  return
