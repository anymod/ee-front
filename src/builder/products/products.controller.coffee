'use strict'

angular.module('builder.products').controller 'productsCtrl', ($state, eeDefiner, eeProducts, eeCollections) ->

  products = this

  products.ee   = eeDefiner.exports
  products.fns  = eeProducts.fns
  products.collectionsFns = eeCollections.fns

  switch $state.current.name
    when 'products'
      eeProducts.fns.runSection 'search'

  return
