angular.module 'ee-navbar-main', []

angular.module('ee-navbar-main').directive "eeNavbarMain", ($state, eeDefiner, eeModal) ->
  templateUrl: 'components/ee-navbar-main.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attrs) ->
    scope.ee          = eeDefiner.exports
    scope.state       = $state.current.name
    scope.login       = eeModal.fns.openLoginModal
    scope.feedback    = () -> eeModal.fns.open 'feedback'
    return
