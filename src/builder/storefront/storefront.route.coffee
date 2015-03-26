'use strict'

angular.module('builder.storefront').config ($stateProvider) ->

  $stateProvider
    .state 'storefront',
      url: '/storefront'
      resolve: user: (eeAuth) -> eeAuth.userFromToken()
      views:
        main:
          templateUrl: 'app/storefront/storefront.view.container.html'
          controller: 'builder.storefrontRootCtrl'
        offscreen:
          templateUrl: 'components/ee-offscreen.html'
          controller: 'builder.storefrontRootCtrl'
          offscreenCategory: 'Storefront'
          offscreenColor: 'blue'
      data:
        pageTitle: 'Build your store | eeosk'
    .state 'storefront.home',
      url: '/home'
      views:
        main:       templateUrl: 'app/storefront/storefront.home.html'
        offscreen:  templateUrl: 'builder/storefront/storefront.offscreen.home.html'
    .state 'storefront.shop_redirect',  # this state is purely to avoid flicker when visiting /storefront/shop
      url: '/shop'
    .state 'storefront.shop',
      url: '/shop/:shopCategory'
      views:
        main:       templateUrl: 'app/storefront/storefront.shop.html'
        offscreen:  templateUrl: 'builder/storefront/storefront.offscreen.shop.html'
    .state 'storefront.blog',
      url: '/blog'
      views:
        main:       templateUrl: 'app/storefront/storefront.home.html'
        offscreen:  templateUrl: 'builder/storefront/storefront.offscreen.blog.html'
      data:
        storeOpacity: true
    .state 'storefront.about',
      url: '/about'
      views:
        main:       templateUrl: 'app/storefront/storefront.about.html'
        offscreen:  templateUrl: 'builder/storefront/storefront.offscreen.about.html'
          # controller: () -> $('.upload_form').append($.cloudinary.unsigned_upload_tag("storefront_about", { cloud_name: 'eeosk' }))
    .state 'storefront.audience',
      url: '/audience'
      views:
        main:       templateUrl: 'app/storefront/storefront.home.html'
        offscreen:  templateUrl: 'builder/storefront/storefront.offscreen.audience.html'
      data:
        storeOpacity: true
