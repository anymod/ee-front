'use strict'

angular.module('builder.create').controller 'createCtrl', ($state, eeBack, eeDefiner, eeCatalog, eeLanding) ->

  that = this
  that.ee           = eeDefiner.exports
  that.data         = eeCatalog.data
  that.landingData  = eeLanding.data

  ## TODO Confirm or redirect

  that.alert          = ''
  that.section        = 1
  that.highlightNext  = false
  that.setSection = (n) ->
    that.section = n
    that.highlightNext = false
  setBtnText    = (txt) -> that.btnText = txt
  resetBtnText  = ()    -> setBtnText 'Finished'
  resetBtnText()

  ## Section 1
  that.products = []
  that.addProduct = (product) ->
    that.products.push product.id
    if that.products.length > 4 then that.highlightNext = true
  that.removeProduct = (product) ->
    index = that.products.indexOf(product.id)
    that.products.splice(index, 1) if index > -1

  ## Section 2
  that.theme = {}
  that.setTheme = (theme) ->
    that.theme = theme
    that.highlightNext = true
  that.clearTheme = () ->
    that.theme = {}
    that.highlightNext = false

  ## Section 3
  that.btnText = 'Finished'
  that.complete = () ->
    that.alert = ''
    setBtnText 'Sending...'
    data =
      products: that.products
      theme: that.theme
      username: that.username
      password: that.password
    # console.log 'data', data
    eeBack.usersCompletePUT data, $state.params.token
    .then (data) -> console.log data
    .catch (err) ->
      alert = err.message || err || 'Problem logging in'
      if typeof alert is 'object' then alert = 'Problem logging in'
      that.alert = alert
    .finally () -> resetBtnText()


  eeCatalog.fns.setCategory 'Home Decor'

  return
