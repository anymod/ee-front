'use strict'

angular.module('ee-product').directive "eeProductForStorefront", () ->
  templateUrl: 'components/ee-product-for-storefront.html'
  restrict: 'E'
  scope:
    product: '='
