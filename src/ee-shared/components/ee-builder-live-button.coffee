angular.module 'ee-builder-live-button', []

angular.module('ee-builder-live-button').directive "eeBuilderLiveButton", ($state) ->
  templateUrl: 'ee-shared/components/ee-builder-live-button.html'
  restrict: 'E'
  scope:
    user: '='
    message: '@'
  link: (scope, ele, attrs) ->
    scope.root = ''
    scope.path = '/'
    switch $state.current.name
      when 'foobar' then scope.root = ''
      else scope.root = 'https://' + scope.user.username + '.eeosk.com'

    console.log 'root', scope.root
    scope.target = scope.root + scope.path
    return
