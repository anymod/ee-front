'use strict'

angular.module('app.core').factory 'eeBack', ($rootScope, $cookies, $http, $q, eeBackUrl) ->
  eeUser = ''
  eeToken = $cookies.loginToken

  save: () ->
    req =
      method: 'PUT'
      url: eeBackUrl + 'users'
      headers:
        authorization: eeToken
      body: $rootScope.eeUser
    deferred = $q.defer()
    $http(req)
      .success (data, status, headers, config) ->
        $rootScope.eeUser = data
        deferred.resolve data
      .error (data, status, headers, config) ->
        if status is 0 then deferred.reject 'Connection error' else deferred.reject data
    deferred.promise


  authWithPassword: (email, password) ->
    req =
      method: 'POST'
      url: eeBackUrl + 'auth'
      headers:
        authorization: 'Basic ' + email + ':' + password
    deferred = $q.defer()
    $http(req)
      .success (data, status, headers, config) ->
        eeUser = data.user
        $cookies.loginToken = eeToken = data.token
        deferred.resolve data
      .error (data, status, headers, config) ->
        if status is 0 then deferred.reject 'Connection error' else deferred.reject data
    deferred.promise

  loginWithToken: (token) ->
    req =
      method: 'POST'
      url: eeBackUrl + 'token'
      headers:
        authorization: token
    deferred = $q.defer()
    $http(req)
      .success (data, status, headers, config) ->
        if !!data.username then eeUser = data
        $cookies.loginToken = eeToken = data.token
        deferred.resolve data
      .error (data, status, headers, config) ->
        if status is 0 then deferred.reject 'Connection error' else deferred.reject data
    deferred.promise

  createUser: (email, password, username) ->
    req =
      method: 'POST'
      url: eeBackUrl + 'users'
      headers: {}
      data: { email: email, password: password, username: username }
    deferred = $q.defer()
    $http(req)
      .success (data, status, headers, config) ->
        if !!data.username then eeUser = data
        $cookies.loginToken = eeToken = data.token
        deferred.resolve data
      .error (data, status, headers, config) ->
        if status is 0 then deferred.reject 'Connection error' else deferred.reject data
    deferred.promise

  getUser: () -> $rootScope.eeUser
  setUser: () -> $rootScope.eeUser = eeUser
  hasToken: () -> !!eeToken

  getProducts: () ->
    req =
      method: 'GET'
      url: eeBackUrl + 'products'
      headers:
        authorization: eeToken
    deferred = $q.defer()
    $http req
      .success (data, status, headers, config) ->
        deferred.resolve data
      .error (data, status, headers, config) ->
        if status is 0 then deferred.reject 'Connection error' else deferred.reject data
    deferred.promise

angular.module('app.core').factory 'eeEnvSvc', ($location) ->
  envFromHost: ->
    if !!$location.host() and $location.host().indexOf('eeosk') > -1 then 'production' else 'development'

angular.module('app.core').factory 'eeGlobalSvc', ($state, $document) ->
  getTitle: -> $state.current.data.pageTitle
  setTitle: (newTitle) -> $state.current.data.pageTitle = newTitle; return
  addBodyClass: (newClass) -> $document.find('body').addClass newClass; return
  removeBodyClass: (oldClass) -> $document.find('body').removeClass oldClass; return

angular.module('app.core').factory 'eePathMaker', ->
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

angular.module('app.core').factory 'eeFirebaseSvc', ($http, $q, $location, eeFirebaseUrl, eeEnvSvc) ->
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

angular.module('app.core').factory 'eeFullScreenSvc', ($rootScope) ->
  fullScreen = false
  get: -> fullScreen
  set: (newState) ->
    fullScreen = newState
    $rootScope.$broadcast 'setFullScreen', fullScreen
    return
