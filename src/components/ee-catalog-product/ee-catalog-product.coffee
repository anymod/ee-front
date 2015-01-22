angular.module 'ee.catalogProduct', []

angular.module('ee.catalogProduct').directive "eeCatalogProduct", ($rootScope) ->
  templateUrl: 'components/ee-catalog-product/ee-catalog-product.html'
  restrict: 'E'
  scope:
    product: '='
  link: (scope, ele, attr) ->
    basePrice   = scope.product.baseline_price
    minMargin   = 0.05
    maxMargin   = 0.40
    startMargin = 0.15

    calcCurrentPrice = (baseline, margin) ->
      return baseline / (1 - margin)

    scope.currentMargin = startMargin
    scope.currentPrice  = calcCurrentPrice(basePrice, scope.currentMargin)

    scope.setCurrentPrice = (newMargin) ->
      margin = newMargin
      if newMargin >= maxMargin then margin = maxMargin
      if newMargin <= minMargin then margin = minMargin
      scope.currentMargin = margin
      scope.currentPrice = calcCurrentPrice(basePrice, scope.currentMargin)
      return

    return
