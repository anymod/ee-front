'use strict'

angular.module('builder.storeproducts').controller 'storeproductCtrl', ($state, $stateParams, eeStoreProduct) ->

  storeproduct = this

  storeproduct.id   = $stateParams.id
  storeproduct.data = eeStoreProduct.data
  if !storeproduct.id then $state.go 'storeproducts'

  eeStoreProduct.fns.setStoreProduct storeproduct.id

  return
