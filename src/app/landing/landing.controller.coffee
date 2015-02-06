'use strict'

angular.module('app.landing').controller 'landingCtrl', ($scope, $rootScope, $location, $anchorScroll) ->
  $rootScope.toggle = false
  $scope.scrollToMore = ->
    $location.hash 'more'
    $anchorScroll()
  return
