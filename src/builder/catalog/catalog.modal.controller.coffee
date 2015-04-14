'use strict'

angular.module('builder.catalog').controller 'catalogModalCtrl', (product, margins, eeStorefront) ->

  this.data         = eeStorefront.data
  this.fns          = eeStorefront.fns

  this.product      = product
  this.mainImage    = product.image_meta.main_image
  this.margins      = margins

  this.addProductSelection    = (product) -> eeStorefront.fns.addDummyProduct product
  this.removeProductSelection = (product) -> eeStorefront.fns.removeDummyProduct product

  this.product.calculated =
    margin:         this.margins.startMargin
    selling_price:  margins.calcPrice     this.product.baseline_price, this.margins.startMargin
    earnings:       margins.calcEarnings  this.product.baseline_price, this.margins.startMargin

  this.setMainImage = (img) -> this.mainImage = img

  return
