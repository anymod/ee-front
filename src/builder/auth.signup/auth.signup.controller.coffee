'use strict'

angular.module('builder.auth').controller 'signupCtrl', ($state, eeAuth, eeModal) ->
  # this.signup = {}
  this.alert = undefined
  that = this

  setBtnText    = (txt) -> that.btnText = txt
  resetBtnText  = ()    -> setBtnText 'Create your store'
  resetBtnText()

  this.signup = () ->
    if that.email isnt that.email_check then that.alert = "Emails don't match"; return
    that.alert = undefined
    setBtnText 'Sending...'

    eeAuth.fns.createUserFromSignup that.email, that.password
    .then (data) -> $state.go 'storefront'
    .catch (err) ->
      console.error err
      resetBtnText()
      that.alert = err?.message || 'Problem creating account'
    return

  this.openTerms = () -> eeModal.fns.openSellerTermsModal()

  return
