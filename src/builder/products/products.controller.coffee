'use strict'

angular.module('builder.products').controller 'productsCtrl', (eeDefiner, eeProducts, eeCollection) ->

  products = this

  products.ee = eeDefiner.exports

  products.data           = eeProducts.data
  products.fns            = eeProducts.fns
  products.collectionData = eeCollection.data
  products.collectionFns  = eeCollection.fns

  if !products.data.products or products.data.products.length < 1 then eeProducts.fns.search()

  return
