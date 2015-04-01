'use strict'

angular.module('builder.catalog').controller 'builder.catalog.onscreenCtrl', ($scope, $rootScope, user, eeCatalog) ->
  ## Setup definitions
  $scope.user = user

  ## Respond to searches
  $scope.$on 'catalog:search:started', () -> $scope.searching  = true
  $scope.$on 'catalog:updated', (e, data) ->
    $scope.searching = false
    # onscreen scope needs everything but product_selections
    $scope.products = data.products
    $scope.page     = data.page
    $scope.search   = data.search
    $scope.min      = data.min
    $scope.max      = data.max
    $scope.category = data.category
    $scope.storefront_product_ids = data.storefront_product_ids

  ## Focus product
  $scope.focusProduct = (id) ->
    $rootScope.toggleLeft = true
    $rootScope.$broadcast 'product:focus', id

  ## Initialize with search()
  eeCatalog.search()

  ## Other functions
  $scope.productInStorefront = (id) -> $scope.storefront_product_ids.indexOf(id) > -1
  $scope.incrementPage = () -> eeCatalog.incrementPage()
  $scope.decrementPage = () -> eeCatalog.decrementPage()

  return
