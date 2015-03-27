'use strict'

angular.module 'ee-offscreen-toggle', []

angular.module('ee-offscreen-toggle').directive "eeOffscreenToggle", ($rootScope) ->
  templateUrl: 'components/ee-offscreen-toggle.html'
  restrict: 'E'
  replace: true
  scope:
    color: '='
  link: (scope, ele, attrs) ->
    # scope.toggle = $rootScope.toggle
    scope.toggleOffscreen = () ->
      $rootScope.toggleLeft = !$rootScope.toggleLeft
      # scope.toggle = $rootScope.toggle

    return
