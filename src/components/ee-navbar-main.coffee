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
    scope.edit        = () ->
      if scope.state.indexOf('edit') > -1 then $state.go 'storefront' else $state.go 'edit'
      #   console.log 'username is ', scope.ee.user.username
      #   $window.open('https://' + scope.ee.user.username + '.eeosk.com')
      # else
      #   $state.go 'account'
    return
