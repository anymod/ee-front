'use strict'

angular.module('builder.products').controller 'productsCtrl', (eeDefiner, eeProduct, eeCatalog) ->

  products = this

  this.ee = eeDefiner.exports

  this.data           = eeCatalog.data
  this.fns            = eeCatalog.fns
  this.productFns     = eeProduct.fns
  # this.selectionsFns  = eeSelections.fns

  if !this.data.products or this.data.products.length < 1 then eeCatalog.fns.search()

  this.inStorefront = (id) -> products.ee.product_ids.indexOf(id) > -1

  return
