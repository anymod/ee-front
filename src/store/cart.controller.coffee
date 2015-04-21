'use strict'

angular.module('eeStore').controller 'cartCtrl', ($rootScope, $scope, $location, eeStorefront, eeCart) ->
  this.data             = eeCart.data
  this.cart_url         = $location.absUrl()

  that                  = this

  eeStorefront.fns.getStorefront()
  .then (storefront) ->

    # if eeCart.cart.entries.length is 0
    #   eeCart.addProduct that.product_selection[1]
    #   eeCart.addProduct that.product_selection[2]
    return

  .catch () -> return

  # $scope.addProduct = (product) -> eeCart.addProduct product
  this.removeProduct = (product) -> eeCart.removeProduct product

  $scope.$watch 'cart.data.entries', (newVal, oldVal) ->
    eeCart.calculate()
  , true
  #
  # $scope.$on 'cart:updated', () ->
  #   $scope.cart = eeCart.cart
  #   $scope.product_names = eeCart.getProductNames()
  #   $scope.selection_ids = eeCart.getSelectionIds()

  return
