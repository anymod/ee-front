angular.module 'eeApp', [
  # vendor
  'ui.router'
  'ui.bootstrap'
  'ngCookies'
  'angulartics'
  'angulartics.google.analytics'
  'colorpicker.module'

  # custom
  # 'EE.Products'
  # 'EE.Previewer'
  # 'EE.ProductEditor'
  # 'EE.SupplierSignup'
  'ee.navbar'
  'ee.offscreen'
  'ee.catalogProduct'
  'ee.storefrontProduct'
  'ee.order'
  # 'EE.Templates' # commented out during build step for inline templates
]

angular.module('eeApp').config ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) ->
  $locationProvider.html5Mode true

  ## Configure CORS
  $httpProvider.defaults.useXDomain = true
  $httpProvider.defaults.withCredentials = true
  delete $httpProvider.defaults.headers.common["X-Requested-With"]
  $httpProvider.defaults.headers.common["Accept"] = "application/json"
  $httpProvider.defaults.headers.common["Content-Type"] = "application/json"

  $stateProvider
    ## don't need data prior to render
    .state 'landing',
      url: '/'
      templateUrl: 'partials/landing.html'
      controller: 'landingCtrl'
      data:
        pageTitle: 'Online store builder, ecommerce storefront, dropship product catalog | eeosk'
        pageDescription: 'Create an online store from a catalog of products.'
    .state 'signupSell',
      url: '/create-online-store'
      templateUrl: 'partials/signup.html'
      controller: 'contactCtrl'
      data:
        pageTitle: 'Create your store | eeosk'
    # .state 'success',
    #   url: '/success/:path'
    #   templateUrl: 'partials/success.html'
    #   controller: 'successCtrl'
    #   data: pageTitle: 'Success! | eeosk'
    .state 'login',
      url: '/user/login'
      templateUrl: 'partials/login.html'
      controller: 'loginCtrl'
      data: pageTitle: 'Login | eeosk'
    .state 'logout',
      url: '/user/logout'
      template: ''
      controller: 'logoutCtrl'
      data: pageTitle: 'Logout | eeosk'
    .state 'loginTemp',
      url: '/user/loginTemp'
      templateUrl: 'partials/loginTemp.html'
      controller: 'loginTempCtrl'
      data: pageTitle: 'Login | eeosk'

    ## need data prior to render
    # .state 'about',
    #   url: '/about'
    #   templateUrl: 'partials/about.html'
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
      templateUrl: 'partials/app/storefront/view-container.html'
      controller: 'app.storefrontCtrl'
      resolve: eeProductData: (eeFirebaseSvc) -> eeFirebaseSvc.getProducts('admin')
      data:
        pageTitle: 'Build your store | eeosk'
        offscreenCategory: 'Storefront'
        offscreenColor: 'blue'
    .state 'app.storefront.home',
      url: '/home'
      templateUrl: 'partials/app/storefront/home.html'
    .state 'app.storefront.shop',
      url: '/shop/:shopCategory'
      templateUrl: 'partials/app/storefront/shop.html'
    .state 'app.storefront.blog',
      url: '/blog'
      templateUrl: 'partials/app/storefront/blog.html'
    .state 'app.storefront.about',
      url: '/about'
      templateUrl: 'partials/app/storefront/about.html'
    .state 'app.storefront.audience',
      url: '/audience'
      templateUrl: 'partials/app/storefront/audience.html'

    ## Catalog ##
    .state 'app.catalog',
      url: '/catalog'
      templateUrl: 'partials/app/catalog.html'
      controller: 'app.catalogCtrl'
      resolve: eeProductData: (eeFirebaseSvc) -> eeFirebaseSvc.getProducts('admin')
      data:
        pageTitle: 'Add products | eeosk'
        offscreenCategory: 'Catalog'
        offscreenColor: 'gold'

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

angular.module('eeApp').constant 'eeFirebaseUrl', "https://fiery-inferno-1584.firebaseIO.com/"

angular.module('eeApp').run ($rootScope, $state, $cookies, $location) ->

  $location.path '/' unless $location.path() == '/user/login' || $cookies.superSecret == 'ABCD'

  # binding this so $state.current.data.pageTitle & other $state data can be accessed
  $rootScope.$state = $state
  $rootScope.eeUser =
    storefront:
      categories: {
        'New Arrivals'
        'Home Decor'
        'Paper'
        'Bags'
        'Jewelry'
        'Accessories'
        'Vintage'
        'Apparel'
      }
      home:
        name: 'Common Deer VT'
        topBarColor: '#f6f6f6'
        topBarBackgroundColor: '#222222'
        carousel:
          1:
            imgUrl: 'http://cdn.shopify.com/s/files/1/0269/1895/t/2/assets/slideshow_6.jpg?5116'
            headline: 'TOPO DESIGNS'
            byline: 'OUR FAVORITE PACKS'
            btnText: 'SHOP NOW'
            btnPosition: 'right'
            linkCategory: 'Bags'
      shop: {}
      blog:
        url: 'http://www.myblog.com'
      about: {}
      audience:
        social:
          facebook: 'CommonDeer'
          pinterest: 'commondeer'
          twitter: 'commondeervt'
          instagram: 'commondeer'
        contact:
          email: 'info@commondeervt.com'
          address:
            street1: '5224 Shelburne Rd'
            street2: 'Suite 102'
            city: 'Shelburne'
            state: 'VT'
            zip: '05482'
        newsletterSignup: true

  # window.eeUser = $rootScope.eeUser
  # window.rootScope = $rootScope
  return

# ========================

angular.module('eeApp').factory 'eeEnvSvc', ($location) ->
  envFromHost: ->
    if _.contains($location.host(), 'eeosk') then 'production' else 'development'

angular.module('eeApp').factory 'eeGlobalSvc', ($state, $document) ->
  getTitle: -> $state.current.data.pageTitle
  setTitle: (newTitle) -> $state.current.data.pageTitle = newTitle; return
  addBodyClass: (newClass) -> $document.find('body').addClass newClass; return
  removeBodyClass: (oldClass) -> $document.find('body').removeClass oldClass; return

angular.module('eeApp').factory 'eePathMaker', ->
  vals = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_"
  createPath: ->
    dateStr = Date.now() + ''
    residual = parseInt(dateStr.substr(8,5) + dateStr.substr(1,7)) # chop off first number of Date.now() and rearrange
    result = ''
    while true
      val = residual % 64
      result = vals.charAt(val) + result
      residual = Math.floor(residual / 64)
      if residual == 0 then break
    result

angular.module('eeApp').factory 'eeFirebaseSvc', ($http, $q, $location, eeFirebaseUrl, eeEnvSvc) ->
  _ref = (new Firebase eeFirebaseUrl).child eeEnvSvc.envFromHost()
  _firebaseEnv = eeEnvSvc.envFromHost()
  setRef = (newEnv) ->
    _firebaseEnv = newEnv
    _ref = (new Firebase eeFirebaseUrl).child newEnv
    return

  getFirebaseEnv: -> _firebaseEnv
  setRef: setRef

  # product, client-facing
  getProducts: (state) ->
    deferred = $q.defer()
    # TODO: don't get products w/ trade: false (may not be possible if firebase data isn't ordered)
    # _ref.child('products').once 'value', (data) ->
    #   results = []
    #   for key, value of data.val()
    #     value.id = key
    #     results.push value
    #   if state isnt 'admin'
    #     # remove products that shouldn't be visible in trade catalog
    #     results = results.filter (product) -> product.trade
    #   deferred.resolve results
    $http.get '/products.json'
      .success (data) -> deferred.resolve data;
      .error (data) -> deferred.resolve data;
    deferred.promise

  getProduct: (id) ->
    deferred = $q.defer()
    _ref.child('products').child(id).once 'value', (data) ->
      deferred.resolve data.val()
    deferred.promise

  # product admin
  createProduct: (product) ->
    deferred = $q.defer()
    _ref.child('products').push product, (err) ->
      if err then deferred.reject err else deferred.resolve()
    deferred.promise
  updateProduct: (id, product) ->
    deferred = $q.defer()
    _ref.child('products').child(id).set product, (err) ->
      if err then deferred.reject err else deferred.resolve()
    deferred.promise
  deleteProduct: (id) ->
    deferred = $q.defer()
    _ref.child('products').child(id).remove (err) ->
      if err then deferred.reject err else deferred.resolve()
    deferred.promise

  # link
  getLink: (id) ->
    deferred = $q.defer()
    _ref.child('links').child(id).once 'value', (data) ->
      deferred.resolve data.val()
    deferred.promise
  createLink: (productId, email, sellerPrice, path) ->
    _ref.child('links').child(path).setWithPriority(
      productId: productId
      email: email
      sellerPrice: sellerPrice
    , path)
    _ref.child 'links'

  # auth
  getAuth: () -> _ref.getAuth()
  authWithPassword: (email, password) ->
    deferred = $q.defer()
    _ref.authWithPassword
      email: email
      password: password
    , (error, authData) ->
      deferred.resolve authData
    deferred.promise
  unauth: () -> _ref.unauth()
  redirectUnlessAuth: ->
    $location.path('user/login') unless _ref.getAuth()

  #signup
  createSignup: (signup) ->
    deferred = $q.defer()
    _ref.child('signups').push signup, (err) ->
      if err then deferred.reject err else deferred.resolve()
    deferred.promise

  #orders
  getOrders: () ->
    deferred = $q.defer()
    $http.get '/orders.json'
      .success (data) -> deferred.resolve data;
      .error (data) -> deferred.resolve data;
    deferred.promise

angular.module('eeApp').factory 'eeFullScreenSvc', ($rootScope) ->
  fullScreen = false
  get: -> fullScreen
  set: (newState) ->
    fullScreen = newState
    $rootScope.$broadcast 'setFullScreen', fullScreen
    return

# ========================

angular.module('eeApp').controller 'landingCtrl', ($scope, $location, $anchorScroll) ->
  $scope.navbarCollapsed = true
  $scope.scrollToMore = ->
    $location.hash 'more'
    $anchorScroll()
  return

angular.module('eeApp').controller 'catalogCtrl', ($scope, $stateParams, eeProductData, eeFullScreenSvc) ->
  $scope.path = $stateParams.id
  $scope.fullScreen = eeFullScreenSvc.get()
  $scope.$on 'setFullScreen', (e, val) -> $scope.fullScreen = val; return
  $scope.products = eeProductData
  return

angular.module('eeApp').controller 'app.storefrontCtrl', ($scope, $rootScope, eeProductData) ->
  $rootScope.toggle = true
  $scope.products = eeProductData
  return

angular.module('eeApp').controller 'app.catalogCtrl', ($scope, $rootScope, eeProductData) ->
  $rootScope.toggle = true
  $scope.products = eeProductData
  return

angular.module('eeApp').controller 'app.ordersCtrl', ($scope, $rootScope, eeOrderData) ->
  $rootScope.toggle = true
  $scope.orders = eeOrderData
  return

angular.module('eeApp').controller 'generateCtrl', ($scope, $location, $stateParams, eeFirebaseSvc, eePathMaker, eeGlobalSvc, eeProductData, eeFullScreenSvc) ->
  $scope.fullScreen = eeFullScreenSvc.get()
  $scope.$on 'setFullScreen', (e, val) -> $scope.fullScreen = val; return

  $scope.product = _.find eeProductData, (product) -> product.id is $stateParams.id

  eeGlobalSvc.setTitle 'Sell ' + $scope.product.title

  $scope.sellerPrice = $scope.product.baselinePrice * 1.1
  $scope.minPrice = $scope.product.baselinePrice + 1
  $scope.maxPrice = $scope.product.baselinePrice * 2

  $scope.$watch 'editPrice', (newVal) ->
    if newVal >= $scope.minPrice && newVal <= $scope.maxPrice
      $scope.sellerPrice = newVal
    return

  $scope.createLink = ->
    if $scope.sellerPrice <= $scope.product.baselinePrice + 1
      $scope.validationError = "You won't make a profit. Please set a higher selling price."
      return

    path = eePathMaker.createPath()
    linkRef = eeFirebaseSvc.createLink $stateParams.id, $scope.email, $scope.sellerPrice, path
    linkRef.once 'child_added', ->
      $location.path '/success/' + path
      $scope.$apply()
    return
  return

angular.module('eeApp').controller 'successCtrl', ($scope, $stateParams, eeFirebaseSvc) ->
  $scope.path = $stateParams.path
  eeFirebaseSvc.getLink($stateParams.path).then (data) ->
    $scope.link = data
    eeFirebaseSvc.getProduct(data.productId).then (data) ->
      $scope.product = data
  return

angular.module('eeApp').controller 'aboutCtrl', ($scope, eeProductData) ->
  $scope.products = _.sample eeProductData, 10
  $scope.sellerPrice = 3
  $scope.examplePrice = 50
  $scope.slidePos = 'slide-1'
  return

angular.module('eeApp').controller 'loginCtrl', ($scope, $location, $state, $cookies, eeFirebaseSvc) ->
  # $scope.authWithPassword = ->
  #   eeFirebaseSvc.authWithPassword($scope.email, $scope.password).then ->
  #     if eeFirebaseSvc.getAuth()?.token then $location.path '/products/all'
  #   return
  # $location.path '/app/storefront/home' if $cookies.superSecret = "ABCD"
  $state.go 'app.storefront.home' if $cookies.superSecret == "ABCD"
  $scope.authWithPassword = ->
    if $scope.email == "demo@eeosk.com" && $scope.password == 'secret'
      $cookies.superSecret = "ABCD"
      $state.go 'app.storefront.home'
    return
  return

angular.module('eeApp').controller 'loginTempCtrl', ($scope, $location, $state, $cookies, $http, eeFirebaseSvc) ->
  $state.go 'app.storefront.home' if $cookies.superSecret == "ABCDE"
  $scope.res = ''
  $scope.authWithPassword = ->
    $http
      method: 'POST',
      url: 'http://localhost:3000/v0/auth',
      data: {},
      headers:
        authorization: 'Basic ' + $scope.email + ':' + $scope.password
    .success (data, status, headers, config) ->
      $scope.res = data
    .error (err) -> $scope.res = err

  return

angular.module('eeApp').controller 'logoutCtrl', ($location, eeFirebaseSvc) ->
  eeFirebaseSvc.unauth()
  $location.path '/'
  return

angular.module('eeApp').controller 'contactCtrl', ($scope, $location, eeFirebaseSvc) ->
  $scope.signup = {}
  $scope.signup.location = $location.path()
  $scope.submitForm = ->
    $scope.buttonDisabled = true
    eeFirebaseSvc.createSignup $scope.signup
    .then () -> $scope.signupCreated = true; return
    .catch (err) -> alert "Failed to process signup"; $scope.buttonDisabled = false; return
    return
  return

# ========================

angular.module('eeApp').directive 'clickAnywhere', ($document) ->
  restrict: 'A'
  link: (scope, ele, attr) ->
    ele.bind 'click', (e) -> e.stopPropagation()
    $document.bind 'click', () -> scope.$apply attr.clickAnywhere
    return

angular.module('eeApp').directive 'eSelectOnFocus', ->
  restrict: 'A',
  link: (scope, ele) ->
    ele.on 'focus', -> this.select()
    return

angular.module('eeApp').filter 'eeImg', () ->
  (input) ->
    if input.indexOf("http") < 0 then return "https://s3.amazonaws.com/eeosk/products/" + input
    return input

angular.module('eeApp').filter 'eeShopCategories', () ->
  (products, category) ->
    if !category || category == 'All' then return products
    filtered = []
    for product in products
      if product.categories.indexOf(category) >= 0 then filtered.push product
    return filtered
