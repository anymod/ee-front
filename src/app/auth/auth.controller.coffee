'use strict'

angular.module('app.auth').controller 'loginCtrl', ($scope, $rootScope, $state, eeAuth) ->
  $rootScope.toggle = false
  $scope.alert = ''

  eeAuth.userFromToken()
  .then () -> $state.go 'app.storefront.home'

  $scope.login = () ->
    $scope.alert = ''
    eeAuth.setUserFromCredentials($scope.email, $scope.password)
    .then () -> $state.go 'app.storefront.home'
    .catch (err) -> $scope.alert = err.message || err || 'Problem logging in'

  return

angular.module('app.auth').controller 'logoutCtrl', ($state, eeAuth) ->
  eeAuth.resetUser()
  $state.go 'landing'
  return
