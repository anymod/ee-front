'use strict'

angular.module('builder.account').controller 'builder.accountCtrl', ($scope, eeAuth) ->
  ## Formerly directive
  $scope.narrowToggle = true
  $scope.offscreenCategory = 'Account'
  $scope.offscreenColor = 'dark'
  ##

  eeAuth.userFromToken()
  .then (user) -> $scope.user = user
  .catch (err) -> console.error err
  return
