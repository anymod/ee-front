'use strict'

module = angular.module 'ee-storefront-header', []

module.directive "eeStorefrontHeader", ($rootScope, $state) ->
  templateUrl: 'components/ee-storefront-header.html'
  scope:
    user: '='
    blocked: '@'
  link: (scope, ele, attrs) ->
    scope.isStore   = $rootScope.isStore
    scope.isBuilder = $rootScope.isBuilder
    state = $state.current.name
    return
