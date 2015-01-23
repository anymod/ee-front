module = angular.module 'ee.productListing', []

module.directive "eeProductListing", (eeFullScreenSvc, $rootScope) ->
  templateUrl: 'components/ee-product-listing.html'
  restrict: 'E'
  scope:
    link: '='
    product: '='
  link: (scope, ele, attr) ->
    scope.route = attr.route

    scope.setFullScreenProduct = (product) ->
      $rootScope.$broadcast 'setProduct', product
      eeFullScreenSvc.set true
      return

    return
