'use strict'

angular.module('ee-product').directive "eeProductDetail", ($location, $anchorScroll, eeStorefront, eeAuth) ->
  templateUrl: 'components/ee-product-detail.html'
  restrict: 'E'
  scope:
    product: '='
  link: (scope, ele, attr) ->
    scope.isBuilder = eeStorefront.isBuilder()
    scope.isStore   = eeStorefront.isStore()
    scope.focusImg  = scope.product.image_meta.main_image
    scope.setFocusImg = (img) -> scope.focusImg = img

    scope.testBtn = () ->
      $location.hash('navtop')
      $anchorScroll()
      # Remove hash in url
      $location.url $location.path()
