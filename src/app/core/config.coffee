'use strict'

core = angular.module 'app.core'

core.config ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) ->
  $locationProvider.html5Mode true

  ## Configure CORS
  $httpProvider.defaults.useXDomain = true
  $httpProvider.defaults.withCredentials = true
  delete $httpProvider.defaults.headers.common["X-Requested-With"]
  $httpProvider.defaults.headers.common["Accept"] = "application/json"
  $httpProvider.defaults.headers.common["Content-Type"] = "application/json"

  $stateProvider
    ## don't need data prior to render
    # .state 'landing',
    #   url: '/'
    #   templateUrl: 'partials/pre/landing.html'
    #   controller: 'landingCtrl'
    #   data:
    #     pageTitle: 'Online store builder, ecommerce storefront, dropship product catalog | eeosk'
    #     pageDescription: 'Create an online store from a catalog of products.'
    .state 'signupSell',
      url: '/create-online-store'
      templateUrl: 'partials/pre/info.signup.html'
      controller: 'contactCtrl'
      data:
        pageTitle: 'Create your store | eeosk'
    .state 'login',
      url: '/user/login'
      templateUrl: 'partials/pre/auth.login.html'
      controller: 'loginCtrl'
      data: pageTitle: 'Login | eeosk'
    .state 'loginTemp',
      url: '/login'
      templateUrl: 'partials/pre/auth.loginTemp.html'
      controller: 'loginTempCtrl'
      data: pageTitle: 'Login | eeosk'
    .state 'logout',
      url: '/user/logout'
      template: ''
      controller: 'logoutCtrl'
      data: pageTitle: 'Logout | eeosk'

    ## need data prior to render
    # .state 'about',
    #   url: '/about'
    #   templateUrl: 'partials/pre/info.about.html'
    #   controller: 'aboutCtrl'
    #   resolve: eeProductData: (eeFirebaseSvc) -> eeFirebaseSvc.getProducts()
    #   data: pageTitle: 'About | eeosk'
    # .state 'beta',
    #   url: '/beta'
    #   templateUrl: 'partials/catalog.html'
    #   controller: 'catalogCtrl'
    #   resolve: eeProductData: (eeFirebaseSvc) -> eeFirebaseSvc.getProducts()
    #   data:
    #     pageTitle: 'Sell for suppliers | eeosk'
    #     offscreenContent: 'menu'
    # .state 'generate',
    #   url: '/generate/:id'
    #   templateUrl: 'partials/generate.html'
    #   controller: 'generateCtrl'
    #   resolve: eeProductData: (eeFirebaseSvc) -> eeFirebaseSvc.getProducts()
    #   data: pageTitle: ''
    ## TODO: rename to /admin
    # .state 'products',
    #   url: '/products/:id'
    #   templateUrl: 'partials/products/products.html'
    #   controller: 'productsCtrl'
    #   resolve: eeProductData: (eeFirebaseSvc) -> eeFirebaseSvc.getProducts('admin')
    #   data: pageTitle: 'Products | eeosk'

    ## App ##
    .state 'app',
      url: '/app'
      template: '<div ui-view class="white-background"></div>'
      data:
        narrowToggle: true

    ## Storefront ##
    .state 'app.storefront',
      url: '/storefront'
      templateUrl: 'partials/app/store.view.container.html'
      controller: 'app.storefrontCtrl'
      resolve: eeProductData: (eeBack) -> eeBack.getProducts()
      data:
        pageTitle: 'Build your store | eeosk'
        offscreenCategory: 'Storefront'
        offscreenColor: 'blue'
    .state 'app.storefront.home',
      url: '/home'
      templateUrl: 'partials/app/store.home.html'
    .state 'app.storefront.shop',
      url: '/shop/:shopCategory'
      templateUrl: 'partials/app/store.shop.html'
    .state 'app.storefront.blog',
      url: '/blog'
      templateUrl: 'partials/app/storefront/blog.html'
    .state 'app.storefront.about',
      url: '/about'
      templateUrl: 'partials/app/store.about.html'
    .state 'app.storefront.audience',
      url: '/audience'
      templateUrl: 'partials/app/store.audience.html'

    ## Orders ##
    .state 'app.orders',
      url: '/orders'
      templateUrl: 'partials/app/orders.html'
      controller: 'app.ordersCtrl'
      resolve: eeOrderData: (eeFirebaseSvc) -> eeFirebaseSvc.getOrders()
      data:
        pageTitle: 'My orders | eeosk'
        offscreenCategory: 'Orders'
        offscreenColor: 'green'

    ## Account ##
    .state 'app.account',
      url: '/account'
      templateUrl: 'partials/app/account.html'
      controller: 'app.catalogCtrl'
      resolve: eeProductData: (eeFirebaseSvc) -> eeFirebaseSvc.getProducts('admin')
      data:
        pageTitle: 'Account | eeosk'
        offscreenCategory: 'Account'
        offscreenColor: 'dark'

  $urlRouterProvider.otherwise '/'
  return
