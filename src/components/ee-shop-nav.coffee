'use strict'

angular.module('ee-product').directive "eeShopNav", ($state, eeStorefront) ->
  templateUrl: 'components/ee-shop-nav.html'
  restrict: 'E'
  replace: true
  scope:
    storefront: '='
  link: (scope, ele, attrs) ->
    scope.$state = $state

    eeStorefront.getStorefront()
    .then (storefront) -> eeStorefront.setScopeCategories(storefront, scope)

    return
