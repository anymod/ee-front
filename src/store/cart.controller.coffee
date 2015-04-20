'use strict'

angular.module('eeStore').controller 'cartCtrl', ($rootScope, $location, eeStorefront, eeCart) ->
  this.cart             = eeCart.cart
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
  # $scope.removeProduct = (product) -> eeCart.removeProduct product
  #
  # $scope.$watch 'cart.entries', (newVal, oldVal) ->
  #   eeCart.calculate()
  # , true
  #
  # $scope.$on 'cart:updated', () ->
  #   $scope.cart = eeCart.cart
  #   $scope.product_names = eeCart.getProductNames()
  #   $scope.selection_ids = eeCart.getSelectionIds()

  return
