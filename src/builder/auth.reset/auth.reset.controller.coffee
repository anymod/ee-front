'use strict'

angular.module('builder.auth').controller 'resetCtrl', ($scope, eeAuth) ->
  setBtnText    = (txt) -> $scope.btnText = txt
  resetBtnText  = ()    -> setBtnText 'Submit'
  resetBtnText()

  $scope.sendPasswordResetEmail = () ->
    setBtnText 'Sending...'

    eeAuth.sendPasswordResetEmail $scope.email
    .then (data) ->
      $scope.alert = 'Please check your email for a link to reset your password.'
      $scope.resetSent = true
    .catch (err) ->
      resetBtnText()
      $scope.alert = err?.message || 'Problem sending'
    return
  return
