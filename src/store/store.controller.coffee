'use strict'

angular.module('eeStore').controller 'storeCtrl', ($rootScope, $scope, $http, eeAuth, eeStorefront) ->
  $scope.loading = true
  $scope.user = {}
  $scope.storefront = {}
  $scope.storeName = 'Loading'

  eeAuth.getUsername()
  .then (username) ->
    eeStorefront.storefrontFromUsername(username)
  .then (storefront) ->
    $scope.loading = false
    $scope.storefront = storefront
    $scope.user.storefront_meta = storefront.storefront_meta
    $rootScope.storeName = storefront.storefront_meta.home.name
  .catch () ->
    $scope.loading = false
    $rootScope.storeName = 'Not found'
    $scope.user.storefront_meta =
      home: name: 'Not found'

  return
