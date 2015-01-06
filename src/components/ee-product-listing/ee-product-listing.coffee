module = angular.module 'ee.productListing', []

module.directive "eeProductListing", (eFullScreenSvc, $rootScope) ->
  templateUrl: 'components/ee-product-listing/ee-product-listing.html'
  restrict: 'E'
  scope:
    link: '='
    product: '='
  link: (scope, ele, attr) ->
    scope.route = attr.route

    scope.setFullScreenProduct = (product) ->
      $rootScope.$broadcast 'setProduct', product
      eFullScreenSvc.set true
      return

    return
