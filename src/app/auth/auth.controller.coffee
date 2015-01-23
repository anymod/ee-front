'use strict'

angular.module('app.auth').controller 'loginCtrl', ($scope, $location, $state, $cookies, eeFirebaseSvc) ->
  # $scope.authWithPassword = ->
  #   eeFirebaseSvc.authWithPassword($scope.email, $scope.password).then ->
  #     if eeFirebaseSvc.getAuth()?.token then $location.path '/products/all'
  #   return
  # $location.path '/app/storefront/home' if $cookies.superSecret = "ABCD"
  $state.go 'app.storefront.home' if $cookies.superSecret == "ABCD"
  $scope.authWithPassword = ->
    if $scope.email == "demo@eeosk.com" && $scope.password == 'secret'
      $cookies.superSecret = "ABCD"
      $state.go 'app.storefront.home'
    return
  return

angular.module('app.auth').controller 'loginTempCtrl', ($scope, $location, $state, $cookies, $http, eeBack) ->
  $scope.res = ''
  if !!$cookies.loginToken
    eeBack.loginWithToken($cookies.loginToken).then (res) -> console.log 'auto result:', res

  $scope.authWithPassword = () ->
    eeBack.authWithPassword($scope.email, $scope.password)
    .then (data) ->
      $scope.res = data.message
      $cookies.loginToken = data.token
    return

  return

angular.module('app.auth').controller 'logoutCtrl', ($location, eeFirebaseSvc) ->
  eeFirebaseSvc.unauth()
  $location.path '/'
  return
