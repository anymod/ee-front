'use strict'

angular.module('eeStore').controller 'storeCtrl', ($rootScope, $scope, $location, eeStorefront, eeCart) ->
  $scope.loading = true
  $scope.user = {}
  $scope.storefront = {}
  $scope.storeName = 'Loading'
  $scope.cart = eeCart.cart()

  $scope.cart_url = $location.absUrl()

  eeStorefront.getStorefront()
  .then (storefront) ->
    $scope.loading = false
    $scope.storefront = storefront
    $scope.user.storefront_meta = storefront.storefront_meta
    $rootScope.storeName = storefront.storefront_meta.home.name
    # cart = eeCart.cart()
    # if cart.entries.length is 0
    #   eeCart.addProduct $scope.storefront.product_selection[1]
    #   eeCart.addProduct $scope.storefront.product_selection[2]
  .catch () ->
    $scope.loading = false
    $rootScope.storeName = 'Not found'
    $scope.user.storefront_meta =
      home: name: 'Not found'

  $scope.addProduct = (product) -> eeCart.addProduct product
  $scope.removeProduct = (product) -> eeCart.removeProduct product

  $scope.$watch 'cart.entries', (newVal, oldVal) ->
    eeCart.calculate()
  , true

  $scope.$on 'cart:updated', () ->
    $scope.cart = eeCart.cart()
    $scope.product_names = eeCart.getProductNames()
    $scope.selection_ids = eeCart.getSelectionIds()

  return
