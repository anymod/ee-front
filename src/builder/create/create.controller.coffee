'use strict'

angular.module('builder.create').controller 'createCtrl', ($state, eeDefiner, eeCatalog, eeLanding) ->

  that = this
  this.ee           = eeDefiner.exports
  this.data         = eeCatalog.data
  this.landingData  = eeLanding.data

  this.section = 1
  this.setSection = (n) -> that.section = n

  ## Section 1
  that.products = []
  this.addProduct = (product) -> that.products.push product.id
  this.removeProduct = (product) ->
    index = that.products.indexOf(product.id)
    that.products.splice(index, 1) if index > -1

  ## Section 2
  that.theme = {}
  this.setTheme = (theme) -> that.theme = theme
  this.clearTheme = () -> that.theme = {}

  this.btnText = 'Finished'

  eeCatalog.fns.setCategory 'Home Decor'

  return
