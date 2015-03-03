'use strict'

angular.module('builder.catalog').controller 'builder.catalogCtrl', ($scope, $anchorScroll, $location, eeCatalog) ->
  $scope.page = 1

  $scope.$on 'catalog:products:updated',  () -> $scope.products = eeCatalog.getProducts()
  $scope.$on 'catalog:search:started',    () -> $scope.searching = true
  $scope.$on 'catalog:search:ended',      () ->
    $scope.searching = false
    $scope.page = eeCatalog.getQuery().page || 1

  eeCatalog.search()

  $scope.scrollToTop = () ->
    $location.hash 'top'
    $anchorScroll()
    # Remove hash in url
    $location.url $location.path()

  changePageBy = (n) ->
    $scope.page += n
    if $scope.page <= 1 then $scope.page = 1
    eeCatalog.addQuery('page', $scope.page)
    eeCatalog.search()

  $scope.incrementPage = () -> changePageBy(1)
  $scope.decrementPage = () -> changePageBy(-1)

  return
