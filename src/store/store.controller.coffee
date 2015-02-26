'use strict'

angular.module('eeStore').controller 'storeCtrl', ($scope, $http, eeStorefront) ->
  $scope.user = {}

  req =
    method: 'GET',
    url: 'http://localhost:5000/v0/store/ee_demo/all',
    headers: authorization: {}

  # eeStorefront.setScopeStorefront($scope)
  # $scope.$on 'storefront:updated', (e, storefront) ->
  #   console.log 'update', storefront
  #   $scope.storefront = storefront

  $http(req)
    .success (data, status) ->
      $scope.user.storefront_meta = data.storefront_meta
      $scope.product_selection = data.product_selection
      $scope.products = data.product_selection

      $scope.storefront = data
      console.log 'storefront', $scope.storefront
    .error (data, status) ->
      console.log 'error'

  return
