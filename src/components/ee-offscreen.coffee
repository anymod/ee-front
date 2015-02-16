'use strict'

angular.module 'ee-offscreen', []

angular.module('ee-offscreen').directive "eeOffscreen", ($rootScope) ->
  templateUrl: 'components/ee-offscreen.html'
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
angular.module('ee-offscreen').directive "eeOffscreenDefault", () ->
  templateUrl: 'components/ee-offscreen-default.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attrs) ->
    return

## Storefront offscreens

#  Parent
angular.module('ee-offscreen').directive "eeOffscreenStorefront", ($state, eeAuth, eeStorefront) ->
  templateUrl: 'app/storefront/storefront.offscreen.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attrs) ->
    scope.$state = $state
    scope.user = eeAuth.getUser()
    eeStorefront.storefrontFromUser()
    .then (res) ->
      scope.products = res.product_selection
      scope.categories = eeStorefront.getCategories()
    .catch (err) -> console.error err
    return

# Home
angular.module('ee-offscreen').directive "eeOffscreenStorefrontHome", () ->
  templateUrl: 'app/storefront/storefront.home.offscreen.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->
    # scope.user = eeAuth.getUser()
    return

# Shop
angular.module('ee-offscreen').directive "eeOffscreenStorefrontShop", () ->
  templateUrl: 'app/storefront/storefront.shop.offscreen.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->
    return

# Blog
angular.module('ee-offscreen').directive "eeOffscreenStorefrontBlog", () ->
  templateUrl: 'app/storefront/storefront.blog.offscreen.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->
    return

# About
angular.module('ee-offscreen').directive "eeOffscreenStorefrontAbout", () ->
  templateUrl: 'app/storefront/storefront.about.offscreen.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->
    $('.upload_form').append($.cloudinary.unsigned_upload_tag("storefront_about", { cloud_name: 'eeosk' }))
    return

# Audience
angular.module('ee-offscreen').directive "eeOffscreenStorefrontAudience", () ->
  templateUrl: 'app/storefront/storefront.audience.offscreen.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->
    return

## Catalog
# Parent
angular.module('ee-offscreen').directive "eeOffscreenCatalog", () ->
  templateUrl: 'app/catalog/catalog.offscreen.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attrs) ->
    scope.price =
      range_0_25:       false
      range_25_50:      true
      range_50_100:     true
      range_100_200:    true
      range_200_10000:  false

    setBools = (min, max) ->
      scope.minPrice = min
      scope.maxPrice = max

    setRanges = () ->
      if scope.price.range_0_25 and scope.price.range_200_10000
        scope.price.range_25_50 = true
        scope.price.range_50_100 = true
        scope.price.range_100_200 = true

    scope.setPrices = (min, max) ->
      setRanges()
      min = 200
      max = 0
      if scope.price.range_0_25
        min = 0
        max = 25
      if scope.price.range_25_50
        if min >= 200 then min = 25
        max = 50
      if scope.price.range_50_100
        if min >= 200 then min = 50
        max = 100
      if scope.price.range_100_200
        if min >= 200 then min = 100
        max = 200
      if scope.price.range_200_10000
        max = null
      if min is 200 and max is 0 then min = 0; max = null
      console.log 'min,max', min, max
      # TODO implement min and max for catalog
      setBools(min, max)

    scope.setPrices()
    scope.$watch 'price', () ->
      scope.setPrices()
    , true

    return

## Orders
# Parent
angular.module('ee-offscreen').directive "eeOffscreenOrders", () ->
  templateUrl: 'app/orders/orders.offscreen.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attrs) -> return

## Account
# Parent
angular.module('ee-offscreen').directive "eeOffscreenAccount", () ->
  templateUrl: 'app/account/account.offscreen.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attrs) -> return
