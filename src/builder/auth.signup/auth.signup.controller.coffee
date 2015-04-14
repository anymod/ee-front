'use strict'

angular.module('builder.auth').controller 'signupCtrl', ($scope, $state, $filter, eeAuth) ->
  $scope.signup = {}

  setBtnText    = (txt) -> $scope.btnText = txt
  resetBtnText  = ()    -> setBtnText 'Create your store'
  resetBtnText()

  # $scope.alert = 'eeosk is currently in private beta and will open to the public soon'
  # setBtnText 'Coming soon...'

  $scope.signup = () ->
    $scope.alert = undefined
    setBtnText 'Sending...'

    eeAuth.fns.createUserFromSignup($scope.email, $scope.password, $scope.username)
    .then (data) -> $state.go 'storefront.home'
    .catch (err) ->
      resetBtnText()
      $scope.alert = err?.message || 'Problem creating account'
    return

  $scope.$watch 'username', (newVal, oldVal) ->
    if !!newVal then $scope.username = $filter('urlText')(newVal)

  return
