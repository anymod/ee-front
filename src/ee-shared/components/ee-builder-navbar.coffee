angular.module 'ee-builder-navbar', []

angular.module('ee-builder-navbar').directive "eeBuilderNavbar", (eeDefiner, eeModal) ->
  templateUrl: 'ee-shared/components/ee-builder-navbar.html'
  restrict: 'E'
  scope:
    transparent: '@'
    fixed: '@'
    signin: '@'
    storefront: '@'
    product: '@'
    selection: '@'
    collection: '@'
    save: '@'
    dropdown: '@'
    back: '@'
  link: (scope, ele, attrs) ->
    scope.ee        = eeDefiner.exports
    scope.feedback  = () -> eeModal.fns.open 'feedback'
    scope.catalog   = eeModal.fns.openCatalogModal
    return
