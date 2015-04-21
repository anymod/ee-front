angular.module 'ee-navbar-main', []

angular.module('ee-navbar-main').directive "eeNavbarMain", ($state, eeAuth, eeModal) ->
  templateUrl: 'components/ee-navbar-main.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attrs) ->
    scope.state       = $state.current.name
    scope.save        = eeAuth.fns.saveOrSignup
    scope.authStatus  = eeAuth.status
    scope.login       = eeModal.fns.openLoginModal
    scope.feedback    = () -> eeModal.fns.open 'feedback'
    return
