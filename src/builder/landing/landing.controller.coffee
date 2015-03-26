'use strict'

angular.module('builder.landing').controller 'landingCtrl', ($scope, $rootScope, $location, $anchorScroll) ->
  console.log 'loaded'
  $scope.toggle = $rootScope.toggle

  $scope.toggleOffscreen = () ->
    console.log 'TOGGLING', $rootScope.toggle
    $rootScope.toggle = !$rootScope.toggle
    $scope.toggle = $rootScope.toggle

  $scope.scrollToMore = () ->
    # Scroll to more section
    $location.hash 'more'
    $anchorScroll()
    # Remove hash in url
    $location.url $location.path()
  return
