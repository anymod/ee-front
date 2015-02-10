module = angular.module 'ee-productNav', []

module.directive "eeProductNav", ($stateParams) ->
  templateUrl: 'components/ee-product-nav.html'
  restrict: 'E'
  replace: true
  scope:
    products: '='
  link: (scope, ele, attrs) ->
    scope.activeCategory = $stateParams.shopCategory
    scope.categories = []
    addCategory = (prod) -> if prod?.category? and scope.categories.indexOf(prod.category) < 0 then scope.categories.push prod.category
    if !!scope.products then addCategory(product) for product in scope.products
