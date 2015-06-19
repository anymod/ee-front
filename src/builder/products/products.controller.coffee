'use strict'

angular.module('builder.products').controller 'productsCtrl', ($state, $stateParams, eeDefiner, eeLanding, eeProduct, eeStorefront, eeCatalog) ->

  this.ee = eeDefiner.exports

  this.data       = eeCatalog.data
  this.fns        = eeCatalog.fns
  this.productFns = eeProduct.fns
  this.storeFns   = eeStorefront.fns

  if !this.data.products or this.data.products.length < 1 then eeCatalog.fns.search()

  return
