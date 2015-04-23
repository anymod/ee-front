'use strict'

angular.module('app.core').controller 'productModalCtrl', ($rootScope, product, margins, eeDefiner, eeStorefront, eeCart) ->

  # console.log 'product', product
  # console.log 'margins', margins

  that = this

  this.ee           = eeDefiner.exports
  this.data         = eeStorefront.data
  this.fns          = eeStorefront.fns

  this.product      = product
  this.mainImage    = product.image_meta.main_image
  this.margins      = margins

  this.addProduct   = (product) ->
    if that.ee.logged_in then eeStorefront.fns.addProduct(product) else eeStorefront.fns.addDummyProduct(product)

  this.removeProductSelection = (product) ->
    index = that.data.product_ids.indexOf product.id
    if index > -1
      p_s = that.ee.product_selection[index]
      if that.ee.logged_in then eeStorefront.fns.removeProductSelection(p_s) else eeStorefront.fns.removeDummyProductSelection(p_s)

  this.addProductToCart = (product) ->
    if $rootScope.isBuilder then that.showAddPopover = true
    if $rootScope.isStore   then eeCart.addProduct product

  this.product.calculated =
    margin:         this.margins.startMargin
    selling_price:  margins.calcPrice     this.product.baseline_price, this.margins.startMargin
    earnings:       margins.calcEarnings  this.product.baseline_price, this.margins.startMargin

  this.setMainImage = (img) -> that.mainImage = img

  return
