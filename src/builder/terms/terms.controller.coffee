'use strict'

angular.module('builder.terms').controller 'termsCtrl', ($scope, $location, $anchorScroll) ->
  $scope.scrollToTop = () ->
    $location.hash 'navbar-top'
    $anchorScroll()
    # Remove hash in url
    $location.url $location.path()
  return
