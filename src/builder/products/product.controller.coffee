'use strict'

angular.module('builder.products').controller 'productCtrl', ($state, $stateParams, eeProduct, eeProducts) ->

  product = this

  product.id    = $stateParams.id
  product.data  = eeProduct.data
  product.fns   = eeProducts.fns
  if !product.id then $state.go 'products'

  eeProduct.fns.setProduct product.id

  return
