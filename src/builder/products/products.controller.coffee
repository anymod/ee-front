'use strict'

angular.module('builder.products').controller 'productsCtrl', (eeAuth, eeDefiner, eeProducts, eeCollections) ->

  products = this

  products.ee   = eeDefiner.exports
  products.data = eeProducts.data
  products.fns  = eeProducts.fns
  products.collectionsFns = eeCollections.fns

  if !products.data.products or products.data.products.length < 1 then eeProducts.fns.search()

  eeCollections.fns.search()

  return
