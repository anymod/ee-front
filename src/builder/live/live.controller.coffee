'use strict'

angular.module('builder.live').controller 'liveCtrl', ($window, $scope, eeDefiner) ->

  live = this
  live.ee = eeDefiner.exports

  redirect = () ->
    return unless live.ee.User?.user?.store_url?
    $window.location.assign live.ee.User.user.store_url + '?s=t'

  if !live.ee.User?.user?
    $scope.$watch 'live.ee.User.user.store_url', (newVal, oldVal) ->
      if newVal then redirect()
  else
    redirect()

  return
