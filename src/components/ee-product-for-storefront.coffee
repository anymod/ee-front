'use strict'

angular.module('ee-product').directive "eeProductForStorefront", ($location, $anchorScroll) ->
  templateUrl: 'components/ee-product-for-storefront.html'
  restrict: 'E'
  scope:
    product: '='
  link: (scope, ele, attr) ->
    scope.overlay = false

    scope.options =
      removeBtn: true

    scope.toggleOverlay = () ->
      scope.overlay = !scope.overlay
      $location.hash('navtop')
      $anchorScroll()
      # Remove hash in url
      $location.url $location.path()
