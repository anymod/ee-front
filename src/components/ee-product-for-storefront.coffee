'use strict'

angular.module('ee-product').directive "eeProductForStorefront", (eeProduct) ->
  templateUrl: 'components/ee-product-for-storefront.html'
  restrict: 'E'
  scope:
    product: '='
  link: (scope, ele, attr) ->
    scope.openModal = (id) -> eeProduct.fns.openProductModal id
    return
