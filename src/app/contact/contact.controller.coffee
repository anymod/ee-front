'use strict'

angular.module('app.contact').controller 'contactCtrl', ($scope, $location, eeFirebaseSvc) ->
  $scope.signup = {}
  $scope.signup.location = $location.path()
  $scope.submitForm = ->
    $scope.buttonDisabled = true
    eeFirebaseSvc.createSignup $scope.signup
    .then () -> $scope.signupCreated = true; return
    .catch (err) -> alert "Failed to process signup"; $scope.buttonDisabled = false; return
    return
  return
