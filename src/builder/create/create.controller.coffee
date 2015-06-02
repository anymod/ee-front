'use strict'

angular.module('builder.create').controller 'createCtrl', ($state, eeBack, eeDefiner, eeCatalog, eeLanding) ->

  that = this
  this.ee           = eeDefiner.exports
  this.data         = eeCatalog.data
  this.landingData  = eeLanding.data

  this.section = 1
  this.setSection = (n) ->
    that.section = n
    that.highlightNext = false
  that.highlightNext = false

  ## Section 1
  that.products = []
  this.addProduct = (product) ->
    that.products.push product.id
    if that.products.length > 4 then that.highlightNext = true
  this.removeProduct = (product) ->
    index = that.products.indexOf(product.id)
    that.products.splice(index, 1) if index > -1

  ## Section 2
  that.theme = {}
  this.setTheme = (theme) ->
    that.theme = theme
    that.highlightNext = true
  this.clearTheme = () ->
    that.theme = {}
    that.highlightNext = false

  ## Section 3
  this.btnText = 'Finished'
  this.complete = () ->
    eeBack.g()

  eeCatalog.fns.setCategory 'Home Decor'

  return
