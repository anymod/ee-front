angular.module 'ee.navbar', []

angular.module('ee.navbar').directive "eeNavbar", () ->
  templateUrl: 'components/ee-navbar/ee-navbar.html'
  restrict: 'E'
  scope: {} # isolate scope otherwise has same scope as the ui-router state it's in
  link: (scope, element, attrs) ->
    return
