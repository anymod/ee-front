'use strict'

angular.module 'ee-offscreen-header', []

angular.module('ee-offscreen-header').directive "eeOffscreenHeader", ($rootScope) ->
  templateUrl: 'components/ee-offscreen-header.html'
  restrict: 'E'
  replace: true
  link: (scope, ele, attrs) ->
    # scope.toggle = $rootScope.toggle
    # $rootScope.$watch 'toggle', () -> scope.toggle = $rootScope.toggle
    return
