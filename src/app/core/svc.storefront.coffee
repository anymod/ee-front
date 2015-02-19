'use strict'

angular.module('app.core').factory 'eeStorefront', ($cookies, $q, eeBack, eeAuth) ->
  # _fetching = false if not fetching, _fetching = deferred.promise if still fetching
  _fetching   = false
  _storefront = {}
  _categories = ['All']
  _productLookup = {}
  _setStorefront = (s) -> _storefront = s
  _storefrontIsEmpty = () -> Object.keys(_storefront).length is 0
  _setProductLookup = () ->
    arry = _storefront.product_selection
    _productLookup = {}
    addToProductLookup = (i) -> _productLookup[arry[i].product_id] = arry[i]
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

  _addCategory = (cat) -> if _categories.indexOf(cat) < 0 then _categories.push cat
  _setCategories = () ->
    _categories = ['All']
    if !!_storefront?.product_selection
      _addCategory(product.category) for product in _storefront.product_selection

  getProducts: () -> _getStorefront().then (res) -> _storefront.product_selection

  getProductInStorefront: (id) -> _getStorefront().then () -> _productLookup[id]

  getStorefrontMeta: () -> _getStorefront().then () -> _storefront.storefront_meta
  setCategories: () -> _setCategories()
  getCategories: () -> _getStorefront().then () -> _categories

  storefrontFromUser: (force) -> _getStorefront(force)
