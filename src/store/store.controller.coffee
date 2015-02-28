'use strict'

angular.module('eeStore').controller 'storeCtrl', ($rootScope, $scope, $http, eeAuth, eeStorefront) ->
  $scope.loading = true
  $scope.user = {}
  $scope.storeName = 'Loading'

  eeAuth.getUsername()
  .then (username) ->
    eeStorefront.storefrontFromUsername(username)
  .then (storefront) ->
    $scope.loading = false
    $scope.user.storefront_meta = storefront.storefront_meta
    $rootScope.storeName = storefront.storefront_meta.home.name
  .catch () ->
    $scope.loading = false
    $rootScope.storeName = 'Not found'
    $scope.user.storefront_meta =
      home: name: 'Not found'



  # $scope.storefront = storefront


  return
