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
      scope.$on 'set:toggle:offscreen:right', (e, data) -> scope.open = data
      scope.toggleOffscreen = () -> scope.$emit 'toggle:offscreen:right'
    else
      scope.$on 'set:toggle:offscreen:left', (e, data) -> scope.open = data
      scope.toggleOffscreen = () -> scope.$emit 'toggle:offscreen:left'
    return
