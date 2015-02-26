'use strict'

angular.module('builder.landing').config ($stateProvider, $locationProvider) ->
  $locationProvider.html5Mode true
  #
  # ## Configure CORS
  # $httpProvider.defaults.useXDomain = true
  # $httpProvider.defaults.withCredentials = true
  # delete $httpProvider.defaults.headers.common["X-Requested-With"]
  # $httpProvider.defaults.headers.common["Accept"] = "application/json"
  # $httpProvider.defaults.headers.common["Content-Type"] = "application/json"

  $stateProvider.state 'landing',
    url: '/'
    templateUrl: 'builder/landing/landing.html'
    controller: 'landingCtrl'
    data:
      pageTitle: 'Online store builder, ecommerce storefront, dropship product catalog | eeosk'
      pageDescription: 'Create an online store from a catalog of products.'

  return
