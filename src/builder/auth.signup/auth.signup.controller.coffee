'use strict'

angular.module('builder.auth').controller 'signupCtrl', ($scope, $state, $filter, $location, $anchorScroll, eeBack, eeAuth) ->
  $scope.signup = {}

  setBtnText    = (txt) -> $scope.btnText = txt
  resetBtnText  = ()    -> setBtnText 'Create your store'
  resetBtnText()

  # $scope.alert = 'eeosk is currently in private beta and will open to the public soon'
  # setBtnText 'Coming soon...'

  $scope.signup = () ->
    if $scope.email isnt $scope.email_check then $scope.alert = "Emails don't match"; return
    $scope.alert = undefined
    setBtnText 'Sending...'

    eeAuth.createUserFromSignup($scope.email, $scope.password, $scope.username)
    .then (data) -> $state.go 'app.storefront.home'
    .catch (err) ->
      resetBtnText()
      $scope.alert = err?.message || 'Problem creating account'
    return

  $scope.$watch 'username', (newVal, oldVal) ->
    if !!newVal then $scope.username = $filter('urlText')(newVal)

  $scope.scrollToTop = () ->
    $location.hash 'navbar-top'
    $anchorScroll()
    # Remove hash in url
    $location.url $location.path()

  return
