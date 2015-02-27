'use strict'

angular.module('eeStore').controller 'storeCtrl', ($scope, $http, storefront) ->
  console.log 'storefront', storefront
  $scope.blogLinkActive = true
  $scope.audienceLinksActive = true
  $scope.user = {}

  $scope.storefront = storefront
  $scope.user.storefront_meta = storefront.storefront_meta

  return
