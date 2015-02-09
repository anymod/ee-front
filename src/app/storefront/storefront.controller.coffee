'use strict'

angular.module('app.storefront').controller 'app.storefrontRootCtrl', ($scope, $rootScope, user) ->
  $rootScope.toggle = true
  $scope.user = user
  return

angular.module('app.storefront').controller 'app.storefrontChildCtrl', ($scope, eeAuth) ->
  # eeBack.productsGET().then (products) -> $scope.products = products
  return
