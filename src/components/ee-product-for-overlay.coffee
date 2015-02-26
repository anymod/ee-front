'use strict'

angular.module('ee-product').directive "eeProductForOverlay", ($location, eeCatalog, eeSelection, eeStorefront) ->
  templateUrl: 'components/ee-product-for-overlay.html'
  restrict: 'E'
  replace: true
  link: (scope, ele, attrs) ->
    scope.close = () -> scope.product = null
    scope.setFocusImg = (url) -> scope.focusImg = url

    scope.removeProductFromStore = () ->
      eeSelection.deleteSelection(scope.product.selection_id)
      .finally () ->
        scope.close()
        eeStorefront.storefrontFromUsername(true)

    scope.$on 'overlay:catalog:product', (e, product) ->
      console.log 'overlaying', product
      scope.focusImg = product.image_meta.main_image
      scope.product = product
