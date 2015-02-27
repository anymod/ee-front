'use strict'

angular.module('ee-product').directive "eeProductMarginSetter", (eeCatalog) ->
  templateUrl: 'components/ee-product-margin-setter.html'
  restrict: 'E'
  require: "^eeProductForCatalog"
  scope:
    product: '='
    disabled: '='
  link: (scope, ele, attr, eeProductForCatalogCtrl) ->
    basePrice = scope.product.baseline_price
    scope.marginArray = eeCatalog.marginArray
    eeCatalog.setCurrentPriceAndCurrentMargin scope, basePrice, eeCatalog.startMargin

    scope.update = (newMargin) ->
      eeProductForCatalogCtrl.setCurrentMargin newMargin
      eeCatalog.setCurrentPriceAndCurrentMargin scope, basePrice, newMargin

    return
