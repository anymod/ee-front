'use strict'

angular.module('builder.products').controller 'productsCtrl', (eeAuth, eeDefiner, eeProducts) ->

  products = this

  products.ee   = eeDefiner.exports
  products.data = eeProducts.data
  products.fns  = eeProducts.fns

  eeProducts.fns.search()

  return
