'use strict'

angular.module 'ee-builder-activity', []

angular.module('ee-builder-activity').directive "eeBuilderActivity", ($filter, $location) ->
  templateUrl: 'components/ee-builder-activity.html'
  restrict: 'E'
  scope:
    activity: '='
  link: (scope, ele, attrs) ->
    scope.query = $location.search()
    scope.startActivityOpen = false
    scope.openSteps = false
    if parseInt(scope.query?.activity) is scope.activity?.id
      scope.startActivityOpen = true
      scope.openSteps = scope.query?.steps

    scope.steps = $filter('filter')(scope.activity?.steps, { show: true })

    scope.toggleStep = (step) ->
      return if scope.openSteps
      step.uncollapse = !step.uncollapse
    return
