'use strict'

angular.module 'ee-builder-track-nav', []

angular.module('ee-builder-track-nav').directive "eeBuilderTrackNav", ($stateParams, eeDefiner, eeTracks) ->
  templateUrl: 'ee-shared/components/ee-builder-track-nav.html'
  restrict: 'E'
  scope: {}
  link: (scope, element, attrs) ->
    scope.id = parseInt $stateParams.id
    scope.ee = eeDefiner.exports

    eeTracks.fns.runSection()

    return
