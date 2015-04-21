'use strict'

angular.module('builder.catalog').controller 'catalogCtrl', (eeDefiner, eeLanding, eeProduct, eeStorefront, eeCatalog) ->

  this.ee = eeDefiner.exports

  this.data       = eeCatalog.data
  this.fns        = eeCatalog.fns
  this.productFns = eeProduct.fns
  this.storeFns   = eeStorefront.fns

  eeLanding.fns.startCatalog()
  eeCatalog.fns.search()

  return
