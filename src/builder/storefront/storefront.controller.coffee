'use strict'

angular.module('builder.storefront').controller 'builder.storefront.onscreenCtrl', ($scope, $rootScope, $state, user, eeStorefront) ->
  if $state.current.name is 'storefront.shop_redirect' then $state.go 'storefront.shop', shopCategory: 'All'

  ## Setup
  $scope.user = user

  ## Define storefront & categories
  eeStorefront.getStorefront(true)
  .then (storefront) ->
    $scope.storefront = storefront
    eeStorefront.setScopeCategories(storefront, $scope)
  return






angular.module('builder.storefront').controller 'builder.storefront.offscreenCtrl', ($scope, $rootScope, $state, user, eeStorefront) ->
  ## Setup
  $scope.user = user

  ## Define storefront & categories
  eeStorefront.getStorefront(true)
  .then (storefront) ->
    $scope.storefront = storefront
    eeStorefront.setScopeCategories(storefront, $scope)
  return
