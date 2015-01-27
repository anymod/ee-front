'use strict'

angular.module('app.auth').controller 'loginCtrl', ($scope, $state, $cookies, $cookieStore, eeBack, $rootScope) ->
  $scope.res = ''
  if !!$cookies.loginToken
    eeBack.loginWithToken($cookies.loginToken)
    .then (data) -> if !!data.username then $state.go 'app.storefront.home'
    .catch (data) -> $cookieStore.remove 'loginToken'

  $scope.authWithPassword = () ->
    eeBack.authWithPassword($scope.email, $scope.password)
    .then (data) ->
      $cookies.loginToken = data.token
      if !!data.token then $state.go 'app.storefront.home' else $scope.res = data.message
    .catch (err) ->
      $scope.res = 'problem logging in'

  return

angular.module('app.auth').controller 'logoutCtrl', ($location, $cookieStore) ->
  $cookieStore.remove 'loginToken'
  $location.path '/'
  return
