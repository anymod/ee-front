'use strict'

angular.module('builder.catalog').controller 'catalogModalCtrl', (data, margins, catalog) ->

  this.product      = data
  this.mainImage    = data.image_meta.main_image
  this.margins      = margins
  this.catalog      = catalog

  console.log catalog

  this.addProductSelection = (p_s) ->
    console.log 'p_s', p_s
    catalog.product_selection[p_s.id] = p_s

  this.product.calculated =
    margin:         this.margins.startMargin
    selling_price:  margins.calcPrice     this.product.baseline_price, this.margins.startMargin
    earnings:       margins.calcEarnings  this.product.baseline_price, this.margins.startMargin

  this.setMainImage = (img) -> this.mainImage = img

  return
