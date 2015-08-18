'use strict'

angular.module('builder.storeproducts').controller 'storeproductsCtrl', (eeDefiner, eeStoreProducts, eeCollections) ->

  storeproducts = this

  storeproducts.ee    = eeDefiner.exports
  storeproducts.data  = eeStoreProducts.data

  if !storeproducts.data.storeproducts or storeproducts.data.storeproducts.length < 1 then eeStoreProducts.fns.search()
  eeCollections.fns.defineOwnCollections()

  storeproducts.update = () -> eeStoreProducts.fns.update()

  return
