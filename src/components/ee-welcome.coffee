module = angular.module 'ee-welcome', []

angular.module('ee-welcome').directive "eeWelcome", () ->
  templateUrl: 'components/ee-welcome.html'
  restrict: 'E'
