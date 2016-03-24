angular.module 'ee-builder-navbar', []

angular.module('ee-builder-navbar').directive "eeBuilderNavbar", ($window, $state, eeDefiner, eeProducts) ->
  templateUrl: 'components/ee-builder-navbar.html'
  restrict: 'E'
  scope:
    showDropdown: '@'
    search: '@'
    live: '@'
    signin: '@'
    transparent: '@'
    fixed: '@'
    mainNav: '@'
    playbookNav: '@'
    storeNav: '@'
    editNav: '@'
    orderNav: '@'
    accountNav: '@'
    noShadow: '@'
  link: (scope, ele, attrs) ->
    scope.ee = eeDefiner.exports
    scope.state = $state.current?.name
    scope.productsFns = eeProducts.fns

    switch $state.current?.name
      when 'daily', 'date', 'tracks', 'track', 'brand', 'store', 'start' then scope.btn1Active = true
      when 'homepage', 'settings', 'editabout', 'editseo' then scope.btn2Active = true
      when 'orders' then scope.btn3Active = true
      when 'account' then scope.btn4Active = true

    scope.runSearch = () ->
      $state.go 'products'
      eeProducts.fns.search scope.ee.Products?.search?.inputs?.search

    return
