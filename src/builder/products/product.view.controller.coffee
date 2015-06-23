'use strict'

angular.module('builder.products').controller 'productViewCtrl', ($state, $stateParams, eeProduct) ->

  product_id = $stateParams.id
  if !product_id then $state.go 'products'

  this.data = eeProduct.data

  eeProduct.fns.setProduct product_id

  return
