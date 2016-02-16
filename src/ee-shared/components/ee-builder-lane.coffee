'use strict'

angular.module 'ee-builder-lane', []

angular.module('ee-builder-lane').directive "eeBuilderLane", ($filter, $location) ->
  templateUrl: 'ee-shared/components/ee-builder-lane.html'
  restrict: 'E'
  scope:
    lane: '='
  link: (scope, ele, attrs) ->
    scope.query = $location.search()
    scope.startLaneOpen = false
    scope.openActivities = false
    if parseInt(scope.query?.lane) is scope.lane?.id
      scope.startLaneOpen = true
      scope.openActivities = scope.query?.activities

    scope.activities = $filter('filter')(scope.lane?.activities, { show: true })

    scope.toggleActivity = (activity) ->
      return if scope.openActivities
      activity.uncollapse = !activity.uncollapse
    return
