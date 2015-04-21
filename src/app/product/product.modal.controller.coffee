'use strict'

angular.module('app.core').controller 'productModalCtrl', ($rootScope, product, margins, eeStorefront, eeCart) ->

  that = this

  this.data         = eeStorefront.data
  this.fns          = eeStorefront.fns

  this.product      = product
  this.mainImage    = product.image_meta.main_image
  this.margins      = margins

  console.log 'product', product
  console.log 'margins', margins

  this.addProductSelection    = (product) -> eeStorefront.fns.addDummyProduct product
  this.removeProductSelection = (product) -> eeStorefront.fns.removeDummyProduct product

  this.addProductToCart = (product) ->
    if $rootScope.isBuilder then that.showAddPopover = true
    if $rootScope.isStore   then eeCart.addProduct product

  this.product.calculated =
    margin:         this.margins.startMargin
    selling_price:  margins.calcPrice     this.product.baseline_price, this.margins.startMargin
    earnings:       margins.calcEarnings  this.product.baseline_price, this.margins.startMargin

  this.setMainImage = (img) -> that.mainImage = img

  return
