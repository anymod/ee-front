module = angular.module 'ee-productNav', []

module.directive "eeProductNav", ($stateParams, eeStorefront) ->
  templateUrl: 'components/ee-product-nav.html'
  restrict: 'E'
  replace: true
  scope:
    products: '='
  link: (scope, ele, attrs) ->
    scope.activeCategory = $stateParams.shopCategory
    scope.categories = eeStorefront.getCategories()
