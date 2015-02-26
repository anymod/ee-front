'use strict'

angular.module('ee-product').directive "eeProductDetail", ($location, $anchorScroll, eeStorefront, eeAuth) -> # eeSelection
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
      # Remove hash in url
      $location.url $location.path()

    # scope.removeProductFromStore = () ->
    #   eeSelection.deleteSelection(scope.product.selection_id)
    #   .finally () -> eeAuth.getUsername()
    #   .then (username) -> eeStorefront.storefrontFromUsername(username, true)
