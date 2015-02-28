'use strict'

angular.module('builder.account').controller 'builder.accountCtrl', ($scope, eeAuth) ->
  eeAuth.userFromToken()
  .then (user) -> $scope.user = user
  .catch (err) -> console.error err
  return
