'use strict'

angular.module('builder.contact').controller 'contactCtrl', ($scope, $state, $filter, eeBack, eeAuth) ->
  $scope.signup = {}

  $scope.signup = () ->
    if $scope.email isnt $scope.email_check then $scope.alert = "Emails don't match"; return
    $scope.alert = undefined
    $scope.buttonDisabled = true

    eeAuth.createUserFromSignup($scope.email, $scope.password, $scope.username)
    .then (data) -> $state.go 'app.storefront.home'
    .catch (err) ->
      $scope.buttonDisabled = false
      $scope.alert = err?.message || 'Problem creating account'
    return

  $scope.$watch 'username', (newVal, oldVal) ->
    if !!newVal then $scope.username = $filter('urlText')(newVal)
    
  return
