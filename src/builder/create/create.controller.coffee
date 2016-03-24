'use strict'

angular.module('builder.create').controller 'createCtrl', ($state, eeAuth, eeDefiner, eeCollections, eeLanding) ->

  create = this

  create.ee       = eeDefiner.exports
  create.data     = eeLanding.data

  create.alert  = ''
  setBtnText    = (txt) -> create.btnText = txt
  resetBtnText  = ()    -> setBtnText 'Finished'
  resetBtnText()

  create.btnText = 'Finished'
  create.complete = () ->
    if create.password isnt create.password_confirm then return create.alert = 'Password confirmation does not match'
    create.alert = ''
    setBtnText 'Sending...'
    data =
      theme:
        primary:    create.data.user.storefront_meta?.brand?.color?.primary
        secondary:  create.data.user.storefront_meta?.brand?.color?.secondary
        tertiary:   create.data.user.storefront_meta?.brand?.color?.tertiary
      username: create.username
      password: create.password
    eeAuth.fns.completeNewUser data, $state.params.token
    .then (data) -> $state.go 'start', { activity: 9 }
    .catch (err) ->
      alert = err.message || err || 'Problem logging in'
      if typeof alert is 'object' then alert = 'Problem logging in'
      create.alert = alert
    .finally () -> resetBtnText()

  # new

  create.update = () -> eeCollections.fns.update({ signup: true })

  eeAuth.fns.setUserFromCreateToken()
  .then () ->
    if !create.ee.Collections.collections or create.ee.Collections.collections.length < 1
      eeCollections.fns.searchPublic({ signup: true })
      .then () -> eeCollections.fns.shuffleCollections()
  .catch (err) -> $state.go 'login'

  return
