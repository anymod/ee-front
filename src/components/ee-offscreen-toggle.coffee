'use strict'

angular.module 'ee-offscreen-toggle', []

angular.module('ee-offscreen-toggle').directive "eeOffscreenToggle", () ->
  templateUrl: 'components/ee-offscreen-toggle.html'
  restrict: 'E'
  replace: true
  scope:
    color: '='
    side: '='
  link: (scope, ele, attrs) ->
    if scope.side is 'right'
      scope.$on 'set:offscreen:right:toggle', (e, data) -> scope.open = data
      scope.toggleOffscreen = () -> scope.$emit 'offscreen:right:toggle'
    else
      scope.$on 'set:offscreen:left:toggle', (e, data) -> scope.open = data
      scope.toggleOffscreen = () -> scope.$emit 'offscreen:left:toggle'
    return
