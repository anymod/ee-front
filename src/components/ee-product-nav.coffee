'use strict'

angular.module('ee-product').directive "eeProductNav", ($state, eeStorefront) ->
  templateUrl: 'components/ee-product-nav.html'
  restrict: 'E'
  replace: true
  scope:
    products: '='
  link: (scope, ele, attrs) ->
    scope.$state = $state
    scope.categories = eeStorefront.getCategories()
