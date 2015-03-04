'use strict'

angular.module('builder.storefront').controller 'builder.storefrontRootCtrl', ($scope, user, eeStorefront, eeAuth) ->
  $scope.user = user
  
  $scope.$on 'storefront:updated', (e, storefront) ->
    $scope.storefront = storefront

  eeAuth.getUsername()
  .then (username) -> eeStorefront.storefrontFromUsername(username)
  .then (storefront) -> $scope.storefront = storefront

  return

angular.module('builder.storefront').controller 'builder.storefrontChildCtrl', ($scope, $state, eeAuth) ->
  if $state.current.name is 'app.storefront.welcome' then $scope.welcome = true
  if $state.current.name is 'app.storefront.shop_redirect' then $state.go 'app.storefront.shop', shopCategory: 'All'
  return
