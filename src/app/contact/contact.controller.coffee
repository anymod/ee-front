'use strict'

angular.module('app.contact').controller 'contactCtrl', ($scope, $state, $filter, eeBack) ->
  $scope.signup = {}
  $scope.signup = ->
    if $scope.email isnt $scope.email_check then $scope.alert = "Emails don't match"; return
    $scope.alert = undefined
    $scope.buttonDisabled = true

    eeBack.createUser($scope.email, $scope.password, $scope.username)
    .then (data) ->
      console.log 'data', data
      if !!data.token then $state.go 'app.storefront.home' else $scope.alert = data.message
    .catch (err) ->
      $scope.buttonDisabled = false
      $scope.alert = err?.message || 'Problem creating account'
    return

  $scope.$watch 'username', (newVal, oldVal) ->
    if !!newVal then $scope.username = $filter('urlText')(newVal)
  return
