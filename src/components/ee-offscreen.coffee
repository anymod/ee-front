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
angular.module('ee-offscreen').directive "eeOffscreenStorefront", ($state, eeAuth) ->
  templateUrl: 'app/storefront/storefront.offscreen.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attrs) ->
    scope.$state = $state
    scope.user = eeAuth.getUser()
    return

# Home
angular.module('ee-offscreen').directive "eeOffscreenStorefrontHome", (eeAuth) ->
  templateUrl: 'app/storefront/storefront.home.offscreen.html'
  restrict: 'E'
  link: (scope, ele, attrs) ->

    scope.user = eeAuth.getUser()

    $('.upload_form')
      .append($.cloudinary.unsigned_upload_tag("storefront_home", { cloud_name: 'eeosk' }))
      .bind 'cloudinarydone', (e, data) ->
        console.log 'done', data.result
        scope.user.storefront_meta.home.carousel[0].imgUrl = data.result.secure_url
        scope.$apply()
        # $('.carousel img').append($.cloudinary.image(data.result.public_id,
        #   {
        #     format: 'jpg',
        #     width: 150,
        #     height: 100,
        #     crop: 'thumb',
        #     gravity: 'face',
        #     effect: 'saturation:50'
        #   }
        # ))
      .bind 'cloudinaryprogress', (e, data) ->
        console.log 'progressing', Math.round((data.loaded * 100.0) / data.total)
        # $('.progress_bar').css('width', Math.round((data.loaded * 100.0) / data.total) + '%');
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
  link: (scope, ele, attrs) -> return

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
