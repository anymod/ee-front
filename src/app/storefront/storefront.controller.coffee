'use strict'

angular.module('app.storefront').controller 'app.storefrontRootCtrl', ($scope, $rootScope, user, eeStorefront) ->
  $rootScope.toggle = true
  $scope.user = user

  eeStorefront.getStorefront()
  .then (res) -> console.log 'storefront', res
  .catch (err) -> console.log 'store err', err

  return

angular.module('app.storefront').controller 'app.storefrontChildCtrl', ($scope, eeAuth) ->
  # eeBack.productsGET().then (products) -> $scope.products = products
  return
