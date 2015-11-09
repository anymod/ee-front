'use strict'

angular.module('builder.products').controller 'productsCtrl', ($state, eeDefiner, eeUser, eeProducts, eeCollections) ->

  products = this

  products.ee   = eeDefiner.exports
  products.fns  = eeProducts.fns
  products.collectionsFns = eeCollections.fns

  switch $state.current.name
    when 'products'
      eeProducts.fns.runSection 'search'

  eeUser.fns.defineUser()

  return
