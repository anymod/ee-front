angular.module 'ee-builder-navbar', []

angular.module('ee-builder-navbar').directive "eeBuilderNavbar", ($window, eeDefiner, eeModal) ->
  templateUrl: 'ee-shared/components/ee-builder-navbar.html'
  restrict: 'E'
  scope:
    logo: '@'
    dropdown: '@'
    home: '@'
    save: '@'
    back: '@'
    storefront: '@'
    selection: '@'
    collection: '@'
    transparent: '@'
    fixed: '@'
    signin: '@'
  link: (scope, ele, attrs) ->
    scope.ee          = eeDefiner.exports
    scope.feedback    = () -> eeModal.fns.open 'feedback'
    scope.historyBack = () -> $window?.history?.back()
    scope.catalog     = eeModal.fns.openCatalogModal
    return
