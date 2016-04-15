'use strict'

angular.module('builder.live').controller 'liveCtrl', ($window, $scope, $state, eeDefiner) ->

  live = this
  live.ee = eeDefiner.exports

  redirect = () ->
    return unless live.ee.User?.user?.store_url?
    $window.open(live.ee.User.user.store_url + '?s=t', '_blank')
    $state.go 'daily'

  if !live.ee.User?.user?
    $scope.$watch 'live.ee.User.user.store_url', (newVal, oldVal) ->
      if newVal then redirect()
  else
    redirect()

  return
