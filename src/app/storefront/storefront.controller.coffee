'use strict'

angular.module('app.storefront').controller 'app.storefrontRootCtrl', ($scope, $rootScope, user, eeStorefront) ->
  $rootScope.toggle = true
  $scope.user = user

  eeStorefront.getStorefront()
  .then (res) ->
    $scope.products = res.product_selection
  .catch (err) -> console.log 'store err', err

  return

angular.module('app.storefront').controller 'app.storefrontChildCtrl', ($scope, eeAuth) ->
  return
