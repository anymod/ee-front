'use strict'

angular.module('builder.auth').controller 'loginCtrl', ($rootScope, $window, $state, eeAuth) ->
  this.alert    = ''
  that          = this
  if $state.params.exists then this.alert = 'Your account is active. Please sign in.'

  setBtnText    = (txt) -> that.btnText = txt
  resetBtnText  = ()    -> setBtnText 'Sign in'
  resetBtnText()

  this.login = () ->
    that.alert = ''
    setBtnText 'Sending...'
    eeAuth.fns.setUserFromCredentials that.email, that.password
    .then () ->
      if $rootScope.initialRequest.redirected and $rootScope.initialRequest.toState and  $rootScope.initialRequest.toParams
        $state.go $rootScope.initialRequest.toState.name, $rootScope.initialRequest.toParams
        .catch () -> $state.go 'daily'
      else
        $state.go 'daily'
    .catch (err) ->
      resetBtnText()
      alert = err.message || err || 'Problem logging in'
      if typeof alert is 'object' or alert.length > 200 then alert = 'Problem logging in'
      that.alert = alert

  return
