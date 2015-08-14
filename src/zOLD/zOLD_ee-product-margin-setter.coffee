'use strict'

angular.module('ee-product').directive "eeProductMarginSetter", (eeProducts) ->
  templateUrl: 'components/ee-product-margin-setter.html'
  restrict: 'E'
  require: "^eeProductForCatalog"
  scope:
    product: '='
    disabled: '='
  link: (scope, ele, attr, eeProductForCatalogCtrl) ->
    basePrice = scope.product.baseline_price
    scope.margin_array = eeProducts.margin_array
    eeProducts.setCurrents scope, basePrice, eeProducts.start_margin

    scope.update = (newMargin) ->
      eeProductForCatalogCtrl.setCurrentMargin newMargin
      eeProducts.setCurrents scope, basePrice, newMargin

    return
