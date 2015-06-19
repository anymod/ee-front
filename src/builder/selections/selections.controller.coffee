'use strict'

angular.module('builder.selections').controller 'selectionsCtrl', ($state, $stateParams, eeProduct, eeDefiner, eeCatalog) ->

  this.ee = eeDefiner.exports

  this.data       = eeCatalog.data
  this.fns        = eeCatalog.fns
  this.productFns = eeProduct.fns

  eeCatalog.fns.search()

  return
