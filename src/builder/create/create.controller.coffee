'use strict'

angular.module('builder.create').controller 'createCtrl', ($state, eeAuth, eeDefiner, eeCollections, eeLanding, eeModal) ->

  create = this

  create.ee           = eeDefiner.exports
  create.landingData  = eeLanding.data
  create.themes       = eeLanding.themes
  create.meta         = eeLanding.data.meta
  create.modalFns     = eeModal.fns

  create.alert  = ''
  setBtnText    = (txt) -> create.btnText = txt
  resetBtnText  = ()    -> setBtnText 'Finished'
  resetBtnText()

  ## Section 2
  create.setTheme = (theme, set) ->
    create.meta.themeSet = set
    create.landingData.theme.primary    = theme.primary
    create.landingData.theme.secondary  = theme.secondary
    create.landingData.theme.tertiary   = theme.tertiary
    create.meta.brand.color.primary     = create.landingData.theme.primary
    create.meta.brand.color.secondary   = create.landingData.theme.secondary
    create.meta.brand.color.tertiary    = create.landingData.theme.tertiary

  create.setTheme create.landingData.theme

  create.btnText = 'Finished'
  create.complete = () ->
    create.alert = ''
    setBtnText 'Sending...'
    data =
      theme:    create.landingData.theme
      username: create.username
      password: create.password
    eeAuth.fns.completeNewUser data, $state.params.token
    .then (data) -> $state.go 'dashboard'
    .catch (err) ->
      alert = err.message || err || 'Problem logging in'
      if typeof alert is 'object' then alert = 'Problem logging in'
      create.alert = alert
    .finally () -> resetBtnText()

  # new

  create.update = () -> eeCollections.fns.update({ signup: true })

  ## TODO Confirm or redirect

  eeAuth.fns.setUserFromCreateToken()
  .then () ->
    if !create.ee.Collections.collections or create.ee.Collections.collections.length < 1
      eeCollections.fns.searchPublic({ signup: true })
  .catch (err) -> $state.go 'login'

  return
