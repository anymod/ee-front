'use strict'

angular.module('builder.storeproducts').controller 'storeproductsCtrl', ($state, eeDefiner, eeStoreProducts, eeCollections) ->

  storeproducts = this

  storeproducts.ee    = eeDefiner.exports
  storeproducts.state = $state.current.name

  if storeproducts.state is 'featured' then eeStoreProducts.fns.featured() else eeStoreProducts.fns.search()

  eeCollections.fns.search()

  storeproducts.update = () -> eeStoreProducts.fns.update()

  return
