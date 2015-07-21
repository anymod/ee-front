'use strict'

angular.module('builder.create').controller 'createCtrl', ($state, eeAuth, eeCollections, eeLanding, eeModal) ->

  create = this
  create.data         = eeCollections.data
  create.landingData  = eeLanding.data
  create.themes       = eeLanding.themes
  create.meta         = eeLanding.data.meta
  create.modalFns     = eeModal.fns

  ## TODO Confirm or redirect

  create.alert          = ''
  create.highlightNext  = false
  setBtnText    = (txt) -> create.btnText = txt
  resetBtnText  = ()    -> setBtnText 'Finished'
  resetBtnText()

  ## Section 2
  create.setTheme = (theme, set) ->
    create.meta.themeSet = set
    create.landingData.theme.topBarBackgroundColor = theme.topBarBackgroundColor
    create.landingData.theme.topBarColor           = theme.topBarColor
    create.meta.home.topBarBackgroundColor  = create.landingData.theme.topBarBackgroundColor
    create.meta.home.topBarColor            = create.landingData.theme.topBarColor

  create.setTheme create.landingData.theme

  create.btnText = 'Finished'
  create.complete = () ->
    create.alert = ''
    setBtnText 'Sending...'
    data =
      products: create.products
      theme: create.landingData.theme
      username: create.username
      password: create.password
    eeAuth.fns.completeNewUser data, $state.params.token
    .then (data) ->
      $state.go 'storefront'
    .catch (err) ->
      alert = err.message || err || 'Problem logging in'
      if typeof alert is 'object' then alert = 'Problem logging in'
      create.alert = alert
    .finally () -> resetBtnText()

  # new

  create.collections = create.data.dummies

  return
