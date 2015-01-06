module = angular.module 'ee.storefrontProduct', []

module.directive "eeStorefrontProduct", () ->
  templateUrl: 'components/ee-storefront-product/ee-storefront-product.html'
  restrict: 'E'
  scope:
    product: '='
