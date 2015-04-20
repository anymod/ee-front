'use strict'

angular.module('builder.auth').controller 'signupCtrl', ($scope, $state, $filter, eeAuth, eeModal) ->
  $scope.signup = {}

  setBtnText    = (txt) -> $scope.btnText = txt
  resetBtnText  = ()    -> setBtnText 'Create your store'
  resetBtnText()

  $scope.signup = () ->
    if $scope.email isnt $scope.email_check then $scope.alert = "Emails don't match"; return
    $scope.alert = undefined
    setBtnText 'Sending...'

    eeAuth.fns.createUserFromSignup $scope.email, $scope.password
    .then (data) -> $state.go 'storefront'
    .catch (err) ->
      resetBtnText()
      $scope.alert = err?.message || 'Problem creating account'
    return

  $scope.$watch 'username', (newVal, oldVal) ->
    if !!newVal then $scope.username = $filter('urlText')(newVal)

  $scope.openTerms = () -> eeModal.fns.openSellerTermsModal()

  return
