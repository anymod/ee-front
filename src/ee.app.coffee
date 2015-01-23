'use strict'

angular.module('app.core').run ($rootScope, $state, $cookies, $location) ->

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

  return

# angular.module('eeApp').controller 'catalogCtrl', ($scope, $stateParams, eeProductData) ->
#   $scope.path = $stateParams.id
#   # $scope.fullScreen = eeFullScreenSvc.get()
#   # $scope.$on 'setFullScreen', (e, val) -> $scope.fullScreen = val; return
#   $scope.products = eeProductData
#   return

angular.module('eeApp').controller 'app.storefrontCtrl', ($scope, $rootScope, eeProductData) ->
  $rootScope.toggle = true
  $scope.products = eeProductData
  return

angular.module('eeApp').controller 'app.ordersCtrl', ($scope, $rootScope, eeOrderData) ->
  $rootScope.toggle = true
  $scope.orders = eeOrderData
  return

# angular.module('eeApp').controller 'generateCtrl', ($scope, $location, $stateParams, eeFirebaseSvc, eePathMaker, eeGlobalSvc, eeProductData, eeFullScreenSvc) ->
#   $scope.fullScreen = eeFullScreenSvc.get()
#   $scope.$on 'setFullScreen', (e, val) -> $scope.fullScreen = val; return
#
#   $scope.product = lodash.find eeProductData, (product) -> product.id is $stateParams.id
#
#   eeGlobalSvc.setTitle 'Sell ' + $scope.product.title
#
#   $scope.sellerPrice = $scope.product.baselinePrice * 1.1
#   $scope.minPrice = $scope.product.baselinePrice + 1
#   $scope.maxPrice = $scope.product.baselinePrice * 2
#
#   $scope.$watch 'editPrice', (newVal) ->
#     if newVal >= $scope.minPrice && newVal <= $scope.maxPrice
#       $scope.sellerPrice = newVal
#     return

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
  # $scope.products = lodash.sample eeProductData, 10
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

angular.module('eeApp').controller 'loginTempCtrl', ($scope, $location, $state, $cookies, $http, eeBack) ->
  $scope.res = ''
  if !!$cookies.loginToken
    eeBack.loginWithToken($cookies.loginToken).then (res) -> console.log 'auto result:', res

  $scope.authWithPassword = () ->
    eeBack.authWithPassword($scope.email, $scope.password)
    .then (data) ->
      $scope.res = data.message
      $cookies.loginToken = data.token
    return

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

angular.module('eeApp').filter 'eeShopCategories', () ->
  (products, category) ->
    if !category || category == 'All' then return products
    filtered = []
    for product in products
      if product.categories?.indexOf(category) >= 0 then filtered.push product
    return filtered

angular.module('eeApp').filter 'centToDollar', ($filter) ->
  (cents) ->
    currencyFilter = $filter('currency')
    currencyFilter Math.floor(cents)/100
