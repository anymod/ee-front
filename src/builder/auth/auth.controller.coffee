'use strict'

angular.module('builder.auth').controller 'loginCtrl', ($scope, $state, eeAuth) ->
  $scope.alert = ''

  eeAuth.userFromToken()
  .then () -> $state.go 'app.storefront.home'

  $scope.login = () ->
    $scope.alert = ''
    eeAuth.setUserFromCredentials($scope.email, $scope.password)
    .then () -> $state.go 'app.storefront.home'
    .catch (err) ->
      alert = err.message || err || 'Problem logging in'
      if typeof aler is 'object' then alert = 'Problem logging in'
      $scope.alert = alert

  return

angular.module('builder.auth').controller 'logoutCtrl', ($state, eeAuth, eeStorefront, eeCatalog, eeSelection, eeOrders) ->
  eeAuth.reset()
  eeStorefront.reset()
  eeCatalog.reset()
  eeSelection.reset()
  eeOrders.reset()
  $state.go 'landing'
  return
