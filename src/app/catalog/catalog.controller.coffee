'use strict'

angular.module('app.catalog').controller 'app.catalogCtrl', ($scope, $rootScope, eeCatalog) ->
  $rootScope.toggle = true

  eeCatalog.productsFromToken()
  .then () -> $scope.products = eeCatalog.getProducts()

  return
