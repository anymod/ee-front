'use strict'

angular.module('app.catalog').controller 'app.catalogCtrl', ($scope, $rootScope, $anchorScroll, $location, eeCatalog) ->
  $rootScope.toggle = true
  $scope.page = 1

  eeCatalog.search()
  $scope.$on 'catalog:products:updated',  () -> $scope.products = eeCatalog.getProducts()
  $scope.$on 'catalog:search:started',    () -> $scope.searching = true
  $scope.$on 'catalog:search:ended',      () ->
    $scope.searching = false
    $scope.page = eeCatalog.getQuery().page || 1

  $scope.scrollToTop = () ->
    $location.hash 'top'
    $anchorScroll()

  changePageBy = (n) ->
    $scope.page += n
    if $scope.page <= 1 then $scope.page = 1
    eeCatalog.addQuery('page', $scope.page)
    eeCatalog.search()

  $scope.incrementPage = () -> changePageBy(1)
  $scope.decrementPage = () -> changePageBy(-1)

  return
