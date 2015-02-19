'use strict'

angular.module('ee-product').directive "eeProductMarginSetter", ($rootScope, $location, eeSelection, eeCatalog) ->
  templateUrl: 'components/ee-product-margin-setter.html'
  restrict: 'E'
  scope:
    product: '='
    currentMargin: '='
  link: (scope, ele, attr) ->
    basePrice = scope.product.baseline_price
    scope.marginArray = eeCatalog.marginArray
    eeCatalog.setCurrentPriceAndCurrentMargin scope, basePrice, eeCatalog.startMargin

    scope.update = (newMargin) ->
      eeCatalog.setCurrentPriceAndCurrentMargin scope, basePrice, newMargin

    return
