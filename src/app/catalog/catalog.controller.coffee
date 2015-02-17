'use strict'

angular.module('app.catalog').controller 'app.catalogCtrl', ($scope, $rootScope, $anchorScroll, $location, eeCatalog) ->
  $rootScope.toggle = true

  eeCatalog.productsFromToken()
  .then () -> $scope.products = eeCatalog.getProducts()

  $scope.scrollToTop = () ->
    $location.hash 'top'
    $anchorScroll()

  return
