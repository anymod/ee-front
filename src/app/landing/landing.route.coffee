angular.module('app.landing').config ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) ->
  $locationProvider.html5Mode true

  ## Configure CORS
  $httpProvider.defaults.useXDomain = true
  $httpProvider.defaults.withCredentials = true
  delete $httpProvider.defaults.headers.common["X-Requested-With"]
  $httpProvider.defaults.headers.common["Accept"] = "application/json"
  $httpProvider.defaults.headers.common["Content-Type"] = "application/json"

  $stateProvider
    ## don't need data prior to render
    .state 'landing',
      url: '/'
      templateUrl: 'partials/pre/landing.html'
      controller: 'landingCtrl'
      data:
        pageTitle: 'Online store builder, ecommerce storefront, dropship product catalog | eeosk'
        pageDescription: 'Create an online store from a catalog of products.'
        
  return
