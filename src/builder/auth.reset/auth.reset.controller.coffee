'use strict'

angular.module('builder.auth').controller 'resetCtrl', ($scope, $location, eeAuth) ->
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

  if $location.search().token
    $scope.passwordInputs = true
    $scope.resetPassword = () ->
      setBtnText 'Sending...'
      if $scope.password isnt $scope.password_confirmation
        $scope.alert = 'Passwords must match'
        resetBtnText()
        return
      eeAuth.resetPassword $scope.password, $location.search().token
      .then (data) ->
        $scope.alert = 'Password reset successfully. Log in to continue.'
        $scope.loginButton = true
      .catch (err) ->
        resetBtnText()
        if !!err.message and err.message.indexOf('JSON') >= 0
          $scope.alert = 'Link is invalid or expired.  Please generate another link below.'
          $scope.passwordInputs = false
        else
          $scope.alert = err?.message || 'Problem sending'

  return
