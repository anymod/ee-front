angular.module 'ee-navbar-main', []

angular.module('ee-navbar-main').directive "eeNavbarMain", ($state, eeAuth) ->
  templateUrl: 'components/ee-navbar-main.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attrs) ->
    scope.state       = $state.current.name
    scope.save        = eeAuth.fns.saveOrSignup
    scope.isSignedIn  = eeAuth.fns.isSignedIn()
    return
