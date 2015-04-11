'use strict'

module = angular.module 'ee-overlay', []

module.directive "eeOverlay", ($rootScope) ->
  templateUrl: 'components/ee-overlay.html'
  replace: true
  link: (scope, ele, attrs) ->
    scope.hide = () -> $rootScope.overlay = false
    return
