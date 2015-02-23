'use strict'

angular.module('ee-product').directive "eeProductForStorefront", ($rootScope) ->
  templateUrl: 'components/ee-product-for-storefront.html'
  restrict: 'E'
  scope:
    product: '='
  link: (scope, ele, attr) ->
    scope.overlayProduct = () ->
      $rootScope.$broadcast 'overlay:catalog:product', scope.product
