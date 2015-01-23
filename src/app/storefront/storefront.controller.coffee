'use strict'

angular.module('app.storefront')
  .controller 'app.storefrontCtrl', ($scope, $rootScope, eeBack) ->
    $rootScope.toggle = true
    # $scope.products = eeProductData
    eeBack.getProducts().then (products) -> $scope.products = products
    return
