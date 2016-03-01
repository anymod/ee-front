angular.module 'ee-guide-button', []

angular.module('ee-guide-button').directive "eeGuideButton", (eeModal) ->
  templateUrl: 'components/ee-guide-button.html'
  restrict: 'E'
  scope:
    track: '='
    activity: '='
  link: (scope, ele, attrs) ->
    scope.open = () -> eeModal.fns.open 'activity', { track: scope.track, activity: scope.activity }
    return
