'use strict'

angular.module 'ee-builder-activity', []

angular.module('ee-builder-activity').directive "eeBuilderActivity", ($filter, $location, $rootScope) ->
  templateUrl: 'components/ee-builder-activity.html'
  restrict: 'E'
  scope:
    track: '='
    activity: '='
    completedSteps: '='
    startOpen: '@'
  link: (scope, ele, attrs) ->
    scope.query = $location.search()
    scope.completedSteps ||= []
    scope.startActivityOpen = if scope.startOpen then scope.startOpen else false
    scope.openSteps = false
    if parseInt(scope.query?.activity) is scope.activity?.id
      scope.startActivityOpen = true
      scope.openSteps = scope.query?.steps

    scope.steps = $filter('filter')(scope.activity?.steps, { show: true })

    scope.toggleStep = (step) ->
      return if scope.openSteps
      step.uncollapse = !step.uncollapse

    scope.toggleStepCompletion = (step) ->
      $rootScope.$broadcast 'completed:steps:toggle', {
        track: scope.track,
        activity: scope.activity,
        step: step
      }

    return
