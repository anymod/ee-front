'use strict'

angular.module('app.storefront').controller 'app.storefrontRootCtrl', ($scope, $rootScope, eeAuth) ->
  $rootScope.toggle = true
  $scope.user = eeAuth.getUser()
  return

angular.module('app.storefront').controller 'app.storefrontChildCtrl', ($scope, eeAuth) ->
  # eeBack.productsGET().then (products) -> $scope.products = products
  return
