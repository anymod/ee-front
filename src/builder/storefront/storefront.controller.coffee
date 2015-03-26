'use strict'

angular.module('builder.storefront').controller 'builder.storefrontRootCtrl', ($scope, $rootScope, $state, user, eeStorefront, eeAuth) ->
  $scope.user = user

  ## Formerly directive
  $scope.narrowToggle = true
  $scope.offscreenCategory = 'Storefront'
  $scope.offscreenColor = 'blue'
  $scope.$state = $state
  $scope.$on 'storefront:updated', (e, data) ->
    $scope.storefront = data

  $scope.$on '$stateChangeSuccess', (event, toState) ->
    $scope.toggle = $rootScope.toggle

  $scope.$on 'auth:user:updated', (e, data) ->
    $scope.user = data

  $scope.toggleOffscreen = () ->
    $rootScope.toggle = !$rootScope.toggle
    $scope.toggle = $rootScope.toggle
  ##

  console.log 'user', user

  eeAuth.getUsername()
  .then (username) -> eeStorefront.storefrontFromUsername(username)
  .then (storefront) -> eeStorefront.setScopeCategories(storefront, $scope)

  $scope.$on 'storefront:updated', (e, storefront) ->
    $scope.storefront = storefront

  # eeAuth.getUsername()
  # .then (username) -> eeStorefront.storefrontFromUsername(username)
  # .then (storefront) -> $scope.storefront = storefront
  if $state.current.name is 'storefront.shop_redirect' then $state.go 'storefront.shop', shopCategory: 'All'

  return

angular.module('builder.storefront').controller 'builder.storefrontChildCtrl', ($scope, $state, eeAuth) ->
  if $state.current.name is 'storefront.shop_redirect' then $state.go 'storefront.shop', shopCategory: 'All'
  return
