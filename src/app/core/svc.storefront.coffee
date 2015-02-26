'use strict'

angular.module('app.core').factory 'eeStorefront', ($rootScope, $cookies, $q, eeBack, eeAuth) ->
  # _fetching = false if not fetching, _fetching = deferred.promise if still fetching
  _fetching   = false
  _storefront = {}
  _categories = ['All']
  _productLookup = {}

  _setStorefront = (s) ->
    _storefront = s
    $rootScope.$broadcast 'storefront:updated', _storefront

  _setCategories = () ->
    _categories = ['All']
    if !!_storefront?.product_selection
      _addCategory(product.category) for product in _storefront.product_selection
    $rootScope.$broadcast 'storefront:categories:updated', _categories

  _storefrontIsEmpty = () -> Object.keys(_storefront).length is 0
  _setProductLookup = () ->
    arry = _storefront.product_selection
    _productLookup = {}
    addToProductLookup = (i) -> if !!arry[i] then _productLookup[arry[i].product_id] = arry[i]
    addToProductLookup(i) for i in [0..arry.length-1]

  _getStorefront = (force) ->
    deferred = $q.defer()
    user = eeAuth.getUser()
    # if _fetching then avoid simultaneous calls to API
    if !!_fetching then return _fetching
    if !user or !user.username
      deferred.reject 'Missing username'
    else if !_storefrontIsEmpty() and force isnt true
      _fetching = false
      deferred.resolve _storefront
    else
      # set _fetching to deferred.promise so that subsequent method calls will not lead to API calls
      _fetching = deferred.promise
      eeBack.storefrontGET(user.username)
      .then (data) ->
        # set _fetching to false because API call is finished
        _fetching = false
        _setStorefront data
        _setCategories()
        _setProductLookup()
        deferred.resolve data
      .catch (err) ->
        # set _fetching to false because API call is finished
        _fetching = false
        deferred.reject err
    deferred.promise

  _addCategory = (cat) -> if !!cat and (_categories.indexOf(cat) < 0) then _categories.push cat

  reset: () ->
    _setStorefront({})

  getProducts: () -> _getStorefront().then (res) -> _storefront.product_selection

  getProductInStorefront: (id) -> _getStorefront().then () -> _productLookup[id]

  setCategories: () -> _setCategories()
  getCategories: () -> _categories

  storefrontFromUser: (force) -> _getStorefront(force)
  resetStorefront: () -> _setStorefront({})

  getStorefront: () -> _storefront

  setScopeStorefront: (scope) ->
    _getStorefront()
    .then (storefront) -> scope.storefront = storefront

  setScopeCategories: (scope) ->
    _getStorefront()
    .then () -> _setCategories()
    .then () ->  scope.categories = _categories
    .catch () -> scope.categories = ['All']
