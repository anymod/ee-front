'use strict'

angular.module('builder.storeproducts').controller 'storeproductsCtrl', ($state, eeDefiner, eeStoreProducts, eeCollections) ->

  storeproducts = this

  storeproducts.ee    = eeDefiner.exports
  storeproducts.state = $state.current.name

  if storeproducts.state is 'featured'
    storeproducts.featureToggle = true
    eeStoreProducts.fns.featured()
  else
    storeproducts.featureToggle = false
    eeStoreProducts.fns.search()

  eeCollections.fns.defineOwnCollections()

  storeproducts.update = () -> eeStoreProducts.fns.update()

  return
