angular.module 'ee.offscreen', []

angular.module('ee.offscreen').directive "eeOffscreen", ($rootScope) ->
  templateUrl: 'components/ee-offscreen/ee-offscreen.html'
  restrict: 'E'
  scope:
    toggle: '='
    narrowToggle: '='
    offscreenCategory: '='
    offscreenColor: '='
  link: (scope, ele, attrs) ->
    scope.categoryToggle = false

    scope.toggleOffscreen = () ->
      $rootScope.toggle = !$rootScope.toggle

    scope.setCategory = (category) ->
      scope.offscreenCategory = category
      scope.categoryToggle = false

    return

## Default offscreen
angular.module('ee.offscreen').directive "eeOffscreenDefault", () ->
  templateUrl: 'components/ee-offscreen/ee-offscreen-default.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attrs) -> return

## Storefront offscreens

#  Parent
angular.module('ee.offscreen').directive "eeOffscreenStorefront", ($state, $rootScope) ->
  templateUrl: 'components/ee-offscreen/ee-offscreen-storefront.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attrs) ->
    scope.$state = $state
    scope.eeUser = $rootScope.eeUser
    return

# Home
angular.module('ee.offscreen').directive "eeOffscreenStorefrontHome", () ->
  templateUrl: 'partials/app/storefront/home-offscreen.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->
    return

# Shop
angular.module('ee.offscreen').directive "eeOffscreenStorefrontShop", () ->
  templateUrl: 'partials/app/storefront/shop-offscreen.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->
    return

# Blog
angular.module('ee.offscreen').directive "eeOffscreenStorefrontBlog", () ->
  templateUrl: 'partials/app/storefront/blog-offscreen.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->
    return

# About
angular.module('ee.offscreen').directive "eeOffscreenStorefrontAbout", () ->
  templateUrl: 'partials/app/storefront/about-offscreen.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->
    return

# Audience
angular.module('ee.offscreen').directive "eeOffscreenStorefrontAudience", () ->
  templateUrl: 'partials/app/storefront/audience-offscreen.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->
    return

## Catalog
# Parent
angular.module('ee.offscreen').directive "eeOffscreenCatalog", () ->
  templateUrl: 'components/ee-offscreen/ee-offscreen-catalog.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attrs) -> return

## Orders
# Parent
angular.module('ee.offscreen').directive "eeOffscreenOrders", () ->
  templateUrl: 'components/ee-offscreen/ee-offscreen-orders.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attrs) -> return

## Account
# Parent
angular.module('ee.offscreen').directive "eeOffscreenAccount", () ->
  templateUrl: 'components/ee-offscreen/ee-offscreen-account.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attrs) -> return
