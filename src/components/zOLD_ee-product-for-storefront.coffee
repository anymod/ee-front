'use strict'

angular.module('ee-product').directive "eeProductForStorefront", ($rootScope, $location, $anchorScroll) ->
  templateUrl: 'components/ee-product-for-storefront.html'
  restrict: 'E'
  scope:
    product: '='
  link: (scope, ele, attr) ->
    return
