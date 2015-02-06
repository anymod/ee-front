'use strict'

angular.module('app.auth').controller 'loginCtrl', ($scope, $rootScope, $state, $cookies, $cookieStore, eeBack) ->
  $rootScope.toggle = false

  $scope.alert = ''
  if !!$cookies.loginToken
    eeBack.loginWithToken($cookies.loginToken)
    .then (data) -> if !!data.username then $state.go 'app.storefront.home'
    .catch (data) -> $cookieStore.remove 'loginToken'

  $scope.authWithPassword = () ->
    $scope.alert = ''
    eeBack.authWithPassword($scope.email, $scope.password)
    .then (data) ->
      $cookies.loginToken = data.token
      if !!data.token then $state.go 'app.storefront.home' else $scope.alert = data.message
    .catch (err) ->
      $scope.alert = err.message || err || 'Problem logging in'

  return

angular.module('app.auth').controller 'logoutCtrl', ($location, $cookieStore) ->
  $cookieStore.remove 'loginToken'
  $location.path '/'
  return
