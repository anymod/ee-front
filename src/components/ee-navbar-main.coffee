angular.module 'ee-navbar-main', []

angular.module('ee-navbar-main').directive "eeNavbarMain", ($state, $window, eeDefiner, eeModal) ->
  templateUrl: 'components/ee-navbar-main.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attrs) ->
    scope.ee          = eeDefiner.exports
    scope.state       = $state.current.name
    scope.login       = eeModal.fns.openLoginModal
    scope.feedback    = () -> eeModal.fns.open 'feedback'
    scope.live        = () ->
      if scope.ee.user.username
        console.log 'username is ', scope.ee.user.username
        $window.open('https://' + scope.ee.user.username + '.eeosk.com')
      else
        $state.go 'account'
    return
