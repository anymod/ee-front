'use strict'

angular.module('builder.storeproducts').controller 'storeproductsCtrl', (eeDefiner, eeStoreProducts) ->

  storeproducts = this

  storeproducts.ee    = eeDefiner.exports
  storeproducts.data  = eeStoreProducts.data

  if !storeproducts.data.storeproducts or storeproducts.data.storeproducts.length < 1 then eeStoreProducts.fns.search()

  storeproducts.update = () -> eeStoreProducts.fns.update()

  return
