'use strict'

angular.module('app.core').factory 'eeStorefront', ($rootScope, $q, eeBack) ->
  # _fetching = false if not fetching, _fetching = deferred.promise if still fetching
  _fetching   = false
  _storefront = {}
  _categories = ['All']
  _productLookup = {}

  _setStorefront = (s) ->
    _storefront = s
    $rootScope.$broadcast 'storefront:updated', _storefront

  _addCategory = (cat, categories) -> if !!cat and (categories.indexOf(cat) < 0) then categories.push cat

  _getCategories = (storefront) ->
    categories = ['All']
    if !!storefront?.product_selection
      _addCategory(product.category, categories) for product in storefront.product_selection
    categories

  _setCategories = () ->
    _categories = _getCategories(_storefront)
    $rootScope.$broadcast 'storefront:categories:updated', _categories

  _storefrontIsEmpty = () -> Object.keys(_storefront).length is 0
  _setProductLookup = () ->
    arry = _storefront.product_selection
    _productLookup = {}
    addToProductLookup = (i) -> if !!arry[i] then _productLookup[arry[i].product_id] = arry[i]
    addToProductLookup(i) for i in [0..arry.length-1]

  _getStorefront = (username, force) ->
    deferred = $q.defer()
    # if _fetching then avoid simultaneous calls to API
    if !!_fetching then return _fetching
    if !username
      deferred.reject 'Missing username'
    else if !_storefrontIsEmpty() and force isnt true
      _fetching = false
      deferred.resolve _storefront
    else
      # set _fetching to deferred.promise so that subsequent method calls will not lead to API calls
      _fetching = deferred.promise
      eeBack.storefrontGET(username)
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

  reset: () ->
    _setStorefront({})

  isStore: () -> !!$rootScope.isStore
  isBuilder: () -> !!$rootScope.isBuilder

  # getProducts: () -> _getStorefront().then (res) -> _storefront.product_selection

  getProductInStorefront: (username, id) -> _getStorefront(username).then () -> _productLookup[id]

  setCategories: () -> _setCategories()
  getCategories: () -> _categories

  storefrontFromUsername: (username, force) -> _getStorefront(username, force)

  getStorefront: () -> _storefront

  setScopeCategories: (storefront, scope) ->
    scope.categories = _getCategories(storefront)

  productLookup: (username) ->
    _getStorefront username
    .then (storefront) ->
      _setProductLookup()
      _productLookup
    .catch (err) -> console.error err


  defineForCatalog: (scope, username) ->
    # defines scope.storefront & scope.productLookup
    _getStorefront username
    .then (storefront) ->
      scope.storefront = storefront
      _setProductLookup()
      scope.productLookup = _productLookup
    .catch (err) -> console.error err
