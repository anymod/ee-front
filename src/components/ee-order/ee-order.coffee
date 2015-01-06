module = angular.module 'ee.order', []

module.directive "eeOrder", () ->
  templateUrl: 'components/ee-order/ee-order.html'
  restrict: 'E'
  scope:
    order: '='
  link: (scope, ele, attrs) ->
    # scope.order.salePrice = order.baselinePrice / (1 - order.sellerMargin)
    return
