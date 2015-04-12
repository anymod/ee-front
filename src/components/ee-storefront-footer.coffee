'use strict'

module = angular.module 'ee-storefront-footer', []

module.directive "eeStorefrontFooter", ($state) ->
  templateUrl: 'components/ee-storefront-footer.html'
  scope:
    user: '='
  link: (scope, ele, attrs) ->
    state = $state.current.name
    return
