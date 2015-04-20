'use strict'

angular.module('builder.auth').controller 'loginCtrl', ($scope, $rootScope, $state, eeAuth) ->
  $scope.alert    = ''

  setBtnText    = (txt) -> $scope.btnText = txt
  resetBtnText  = ()    -> setBtnText 'Sign in'
  resetBtnText()

  # eeAuth.fns.userFromToken()
  # .then () -> $state.go 'storefront'

  $scope.login = () ->
    $scope.alert = ''
    setBtnText 'Sending...'
    eeAuth.fns.setUserFromCredentials($scope.email, $scope.password)
    .then () ->
      $state.go 'storefront'
    .catch (err) ->
      resetBtnText()
      alert = err.message || err || 'Problem logging in'
      if typeof alert is 'object' then alert = 'Problem logging in'
      $scope.alert = alert

  $scope.signup = () -> eeAuth.fns.openSignupModal()

  return
