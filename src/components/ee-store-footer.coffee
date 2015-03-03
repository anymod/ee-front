'use strict'

angular.module('ee-product').directive "eeStoreFooter", ($rootScope, $location, $anchorScroll) ->
  templateUrl: 'components/ee-store-footer.html'
  restrict: 'E'
  scope:
    product: '='
  link: (scope, ele, attr) ->
    scope.overlay = false

    scope.toggleOverlay = () ->
      scope.overlay = !scope.overlay
      $location.hash('navtop')
      $anchorScroll()
      # Remove hash in url
      $location.url $location.path()
