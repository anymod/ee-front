'use strict'

angular.module('builder.storefront').controller 'builder.storefrontRootCtrl', ($scope, user, eeStorefront) ->
  $scope.user = user

  eeStorefront.setScopeStorefront($scope)
  $scope.$on 'storefront:updated', (e, storefront) ->
    $scope.storefront = storefront

  return

angular.module('builder.storefront').controller 'builder.storefrontChildCtrl', ($scope, $state, eeAuth) ->
  if $state.current.name is 'app.storefront.shop_redirect' then $state.go 'app.storefront.shop', shopCategory: 'All'
  return
