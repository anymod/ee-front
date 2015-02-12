'use strict'

angular.module('app.core').factory 'eeStorefront', ($cookies, $q, eeBack, eeAuth) ->
  _storefront = {}
  _categories = ['All']
  _setStorefront = (s) -> _storefront = s
  _storefrontIsEmpty = () -> Object.keys(_storefront).length is 0
  _addCategory = (cat) -> if _categories.indexOf(cat) < 0 then _categories.push cat
  _setCategories = () ->
    _categories = ['All']
    _addCategory(product.category) for product in _storefront.product_selection

  getProducts: () -> _storefront.product_selection
  getStorefrontMeta: () -> _storefront.storefront_meta
  setCategories: () -> _setCategories
  getCategories: () -> _categories

  storefrontFromUser: () ->
    deferred = $q.defer()
    user = eeAuth.getUser()
    if !user or !user.username
      deferred.reject 'Missing username'
    # TODO check promise object to avoid simultaneous calls to API
    else if !_storefrontIsEmpty()
      deferred.resolve _storefront
    else
      eeBack.storefrontGET(user.username)
      .then (data) ->
        _setStorefront data
        _setCategories()
        deferred.resolve data
      .catch (err) ->
        deferred.reject err
    deferred.promise
