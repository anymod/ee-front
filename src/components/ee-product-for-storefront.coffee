module = angular.module 'ee-productForStorefront', []

module.directive "eeProductForStorefront", () ->
  templateUrl: 'components/ee-product-for-storefront.html'
  restrict: 'E'
  scope:
    product: '='
