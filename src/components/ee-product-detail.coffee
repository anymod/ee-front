'use strict'

angular.module('ee-product').directive "eeProductDetail", ($location, $anchorScroll, eeSelection, eeStorefront) ->
  templateUrl: 'components/ee-product-detail.html'
  restrict: 'E'
  scope:
    product: '='
    options: '='
  link: (scope, ele, attr) ->
    scope.focusImg = scope.product.image_meta.main_image
    scope.setFocusImg = (img) -> scope.focusImg = img

    scope.testBtn = () ->
      $location.hash('navtop')
      $anchorScroll()

    scope.removeProductFromStore = () ->
      eeSelection.deleteSelection(scope.product.selection_id)
      .finally () -> eeStorefront.storefrontFromUser(true)
