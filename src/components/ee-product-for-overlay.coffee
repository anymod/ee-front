module = angular.module 'ee-productForOverlay', []

module.directive "eeProductForOverlay", ($rootScope, $location, eeCatalog) ->
  templateUrl: 'components/ee-product-for-overlay.html'
  restrict: 'E'
  replace: true
  link: (scope, ele, attrs) ->

    resetProduct = () -> scope.product = {}
    resetProduct()

    setProductHighlightId = () ->
      resetProduct()
      $rootScope.productHighlightId = $location.search().p
      eeCatalog.getProduct($rootScope.productHighlightId)
      .then (product) -> scope.product = product

    $rootScope.$on '$locationChangeSuccess', (event, newState, oldState) ->
      console.log $location.search().p
      setProductHighlightId()
