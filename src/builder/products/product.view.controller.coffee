'use strict'

angular.module('builder.products').controller 'productViewCtrl', ($state, $stateParams, eeProduct, eeSelection) ->

  product_id = $stateParams.id
  if !product_id then $state.go 'products'

  this.productFns     = eeProduct.fns
  this.productData    = eeProduct.data
  this.selectionData  = eeSelection.data

  eeProduct.fns.setProduct product_id
  # .then (product) -> eeSelection.fns.setSelectionFromProduct product

  this.create = () ->
    eeSelection.fns.createSelection eeSelection.data.selection
    .then () -> $state.go 'selections'

  return
