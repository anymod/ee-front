'use strict'

angular.module('builder.storefront').config ($stateProvider) ->

  views =
    header:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'builder/storefront/storefront.header.html'
    top:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'app/storefront/storefront.home.carousel.html'
    middle:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'app/storefront/storefront.home.products.html'
    bottom:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'builder/storefront/storefront.add.html'
    footer:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'app/storefront/storefront.footer.html'

  data =
    pageTitle:        'Add products | eeosk'
    pageDescription:  'Choose products to add to your store.'
    padTop:           '85px'

  resolve =
    user: (eeAuth) -> eeAuth.fns.getOrSetUser()

  $stateProvider
    .state 'try-storefront',
      url:      '/try/storefront'
      views:    views
      data:     data
      resolve:  resolve

    .state 'storefront',
      url:      '/storefront'
      views:    views
      data:     data
      resolve:  resolve




    # .state 'storefront',
    #   url: '/storefront'
    #   resolve: user: (eeAuth) -> eeAuth.userFromToken()
    #   views:
    #     main:
    #       controller: 'builder.storefront.onscreenCtrl'
    #       templateUrl: 'app/storefront/storefront.view.container.html'
    #     offscreen:
    #       controller: 'builder.storefront.offscreenCtrl'
    #       templateUrl: 'builder/storefront/storefront.offscreen.view.container.html'
    #   data:
    #     pageTitle: 'Build your store | eeosk'
    #     offscreenCategory:  'Storefront'
    #     offscreenColor:     'blue'
    # .state 'storefront.home',
    #   url: '/home'
    #   views:
    #     main:       templateUrl: 'app/storefront/storefront.home.html'
    #     offscreen:  templateUrl: 'builder/storefront/storefront.offscreen.home.html'
    # .state 'storefront.shop_redirect',  # this state is purely to avoid flicker when visiting /storefront/shop
    #   url: '/shop'
    # .state 'storefront.shop',
    #   url: '/shop/:shopCategory'
    #   views:
    #     main:       templateUrl: 'app/storefront/storefront.shop.html'
    #     offscreen:  templateUrl: 'builder/storefront/storefront.offscreen.shop.html'
    # .state 'storefront.blog',
    #   url: '/blog'
    #   views:
    #     main:       templateUrl: 'app/storefront/storefront.home.html'
    #     offscreen:  templateUrl: 'builder/storefront/storefront.offscreen.blog.html'
    #   data:
    #     storeOpacity: true
    # .state 'storefront.about',
    #   url: '/about'
    #   views:
    #     main:       templateUrl: 'app/storefront/storefront.about.html'
    #     offscreen:  templateUrl: 'builder/storefront/storefront.offscreen.about.html'
    # .state 'storefront.audience',
    #   url: '/audience'
    #   views:
    #     main:       templateUrl: 'app/storefront/storefront.home.html'
    #     offscreen:  templateUrl: 'builder/storefront/storefront.offscreen.audience.html'
    #   data:
    #     storeOpacity: true

  return
