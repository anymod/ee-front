'use strict'

angular.module('builder.landing').controller 'landingCtrl', ($scope, $location, $anchorScroll) ->
  $scope.scrollToMore = ->
    # Scroll to more section
    $location.hash 'more'
    $anchorScroll()
    # Remove hash in url
    $location.url $location.path()
  return
