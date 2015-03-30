'use strict'

angular.module('builder.storefront').controller 'builder.storefrontRootCtrl', ($scope, $rootScope, $state, user, eeStorefront, eeAuth) ->
  if $state.current.name is 'storefront.shop_redirect' then $state.go 'storefront.shop', shopCategory: 'All'

  ## Setup
  $scope.user = user
  $scope.offscreenCategory = 'Storefront'
  $scope.offscreenColor = 'blue'
  $scope.$state = $state

  ## Define storefront & categories
  eeStorefront.storefrontFromUsername(user.username, true)
  .then (storefront) ->
    $scope.storefront = storefront
    eeStorefront.setScopeCategories(storefront, $scope)
  return
