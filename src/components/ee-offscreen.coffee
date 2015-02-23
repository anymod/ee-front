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

    scope.$on 'auth:user:updated', (e, data) -> scope.user = data

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
angular.module('ee-offscreen').directive "eeOffscreenStorefront", ($state) ->
  templateUrl: 'app/storefront/storefront.offscreen.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->
    scope.$state = $state
    scope.$on 'storefront:updated', (e, data) -> scope.storefront = data
    return

# Home
angular.module('ee-offscreen').directive "eeOffscreenStorefrontHome", (eeStorefront) ->
  templateUrl: 'app/storefront/storefront.offscreen.home.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->
    eeStorefront.setScopeCategories(scope)
    return

# Shop
angular.module('ee-offscreen').directive "eeOffscreenStorefrontShop", () ->
  templateUrl: 'app/storefront/storefront.offscreen.shop.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->
    scope.$on 'storefront:categories:updated', (data) -> scope.categories = data
    return

# Blog
angular.module('ee-offscreen').directive "eeOffscreenStorefrontBlog", () ->
  templateUrl: 'app/storefront/storefront.offscreen.blog.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->
    return

# About
angular.module('ee-offscreen').directive "eeOffscreenStorefrontAbout", () ->
  templateUrl: 'app/storefront/storefront.offscreen.about.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->
    $('.upload_form').append($.cloudinary.unsigned_upload_tag("storefront_about", { cloud_name: 'eeosk' }))
    return

# Audience
angular.module('ee-offscreen').directive "eeOffscreenStorefrontAudience", () ->
  templateUrl: 'app/storefront/storefront.offscreen.audience.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->
    return

## Catalog
# Parent
angular.module('ee-offscreen').directive "eeOffscreenCatalog", ($location, eeCatalog) ->
  templateUrl: 'app/catalog/catalog.offscreen.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attrs) ->
    scope.currentCategory = ''
    scope.currentRange = ''
    scope.categories = [
      'Home Decor',
      'Kitchen',
      'Apparel',
      'Accessories',
      'Health & Beauty',
      'Electronics',
      'General Merchandise'
    ]
    scope.ranges = [
      '0_25',
      '25_50',
      '50_100',
      '100_200',
      '200_null',
    ]

    scope.query = eeCatalog.getQuery()
    scope.$on 'catalog:query:updated', () -> scope.query = eeCatalog.getQuery()

    scope.setCurrentCategory = (category) ->
      if category is scope.currentCategory
        scope.currentCategory = ''
      else
        scope.currentCategory = category
      eeCatalog.addQuery('categories', scope.currentCategory)
      eeCatalog.logQuery()
      eeCatalog.search()

    setMinMax = (min, max) ->
      eeCatalog.addQuery('min', min)
      eeCatalog.addQuery('max', max)
      eeCatalog.addQuery('page', 1)
      eeCatalog.logQuery()
      eeCatalog.search()

    scope.setCurrentRange = (range) ->
      if range is scope.currentRange
        scope.currentRange = ''
        setMinMax 0, null
      else
        scope.currentRange = range
        [min, max] = Array.prototype.map.call(range.split('_'), (x) -> 100 * parseInt(x) || 0)
        setMinMax min, max

    # setRanges = () ->
    #   if scope.price.range_0_25 and scope.price.range_200_10000
    #     scope.price.range_25_50 = true
    #     scope.price.range_50_100 = true
    #     scope.price.range_100_200 = true
    #
    # scope.setPrices = (min, max) ->
    #   setRanges()
    #   min = 20000
    #   max = 0
    #   if scope.price.range_0_25
    #     min = 0
    #     max = 2500
    #   if scope.price.range_25_50
    #     if min >= 20000 then min = 2500
    #     max = 5000
    #   if scope.price.range_50_100
    #     if min >= 20000 then min = 5000
    #     max = 10000
    #   if scope.price.range_100_200
    #     if min >= 20000 then min = 10000
    #     max = 20000
    #   if scope.price.range_200_10000
    #     max = null
    #   if min is 20000 and max is 0 then min = 0; max = null
    #   # TODO implement min and max for catalog
    #   setMinMax(min, max)
    #
    # scope.setPrices()
    # scope.$watch 'price', () ->
    #   scope.setPrices()
    # , true

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
