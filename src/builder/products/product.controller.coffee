'use strict'

angular.module('builder.products').controller 'productCtrl', ($state, $stateParams, eeProduct, eeCollection) ->

  product = this

  product.id    = $stateParams.productId
  product.data  = eeProduct.data
  if !product.id then $state.go 'collections'

  eeProduct.fns.setProduct product.id

  product.addProduct = () ->
    product.adding = true
    eeCollection.data.collection.id = $stateParams.id
    eeCollection.fns.addProduct eeProduct.data.product
    .then () -> $state.go 'collectionAdd', { id: $stateParams.id }
    .finally () -> product.adding = false

  return
