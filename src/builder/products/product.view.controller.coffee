'use strict'

angular.module('builder.products').controller 'productViewCtrl', ($state, $stateParams, eeProduct) ->

  productView = this

  product_id = $stateParams.id
  if !product_id then $state.go 'products'

  productView.data = eeProduct.data
  # this.selectionData  = eeSelection.data

  eeProduct.fns.setProduct product_id

  # product.create = () ->
    # eeSelection.fns.createSelection eeSelection.data.selection
    # .then () -> $state.go 'selections'

  return
