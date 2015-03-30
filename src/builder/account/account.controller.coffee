'use strict'

angular.module('builder.account').controller 'builder.accountCtrl', ($scope, eeAuth) ->
  ## Formerly directive
  $scope.offscreenCategory = 'Account'
  $scope.offscreenColor = 'dark'
  ##

  eeAuth.userFromToken()
  .then (user) -> $scope.user = user
  .catch (err) -> console.error err
  return
