'use strict'

angular.module('ee-product').directive "eeProductForOverlay", ($rootScope, $location, eeCatalog) ->
  templateUrl: 'components/ee-product-for-overlay.html'
  restrict: 'E'
  replace: true
  link: (scope, ele, attrs) ->
    scope.focusImg = ''

    resetProduct = () -> scope.product = {}
    resetProduct()

    setProductHighlightId = () ->
      resetProduct()
      $rootScope.productHighlightId = $location.search().p
      eeCatalog.getProduct($rootScope.productHighlightId)
      .then (product) ->
        scope.product = product
        scope.focusImg = product.image_meta.main_image

    scope.setFocusImg = (url) -> scope.focusImg = url

    $rootScope.$on '$locationChangeSuccess', (event, newState, oldState) ->
      setProductHighlightId()
