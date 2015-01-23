'use strict'

angular.module('app.landing').controller 'landingCtrl', ($scope, $location, $anchorScroll) ->
  $scope.navbarCollapsed = true
  $scope.scrollToMore = ->
    $location.hash 'more'
    $anchorScroll()
  return
