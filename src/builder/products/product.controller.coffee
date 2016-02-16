'use strict'

angular.module('builder.products').controller 'productCtrl', ($scope, $state, $stateParams, eeProduct, eeProducts, eeCollections, eeCustomization) ->

  product = this
  product.id = parseInt $stateParams.id

  eeProduct.fns.setProduct { id: product.id }

  product.data  = eeProduct.data
  product.fns   = eeProducts.fns
  product.customizationFns = eeCustomization.fns
  if !product.id then $state.go 'daily'

  product.showEdit = true
  product.margin_array = [0.1, 0.25, 0.5]
  product.setPricing = (margin) ->
    $scope.$broadcast 'set:pricing', { product_id: product.id, margin: margin }

  return
