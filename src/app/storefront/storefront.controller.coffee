'use strict'

angular.module('app.storefront').controller 'app.storefrontRootCtrl', ($scope, $rootScope, user, eeStorefront) ->
  $rootScope.toggle = true
  $scope.user = user

  eeStorefront.storefrontFromUser().then () -> $scope.products = eeStorefront.getProducts()

  return

angular.module('app.storefront').controller 'app.storefrontChildCtrl', ($scope, eeAuth) ->
  return
