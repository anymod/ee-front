angular.module 'ee-navbar', []

angular.module('ee-navbar').directive "eeNavbar", () ->
  templateUrl: 'components/ee-navbar.html'
  restrict: 'E'
  scope:
    logo: '@'
    shadow: '@'
    transparent: '@'
    hideSignin: '@'
    fixed: '@'
