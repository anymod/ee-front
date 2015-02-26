'use strict'

angular.module('ee-product').directive "eeShopNav", ($state, eeStorefront, eeAuth) ->
  templateUrl: 'components/ee-shop-nav.html'
  restrict: 'E'
  replace: true
  scope:
    storefront: '='
  link: (scope, ele, attrs) ->
    scope.$state = $state

    eeAuth.getUsername()
    .then (username) -> eeStorefront.storefrontFromUsername(username)
    .then (storefront) -> eeStorefront.setScopeCategories(storefront, scope)
