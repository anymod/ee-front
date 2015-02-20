'use strict'

angular.module('app.core').factory 'eeCatalog', ($rootScope, $cookies, $q, $location, eeBack) ->
  _products = []
  _minMargin   = 0.05
  _maxMargin   = 0.40
  _startMargin = 0.15

  _setProducts  = (product_array) ->
    _products = product_array
    console.log 'catalog updated to', _products
    $rootScope.$broadcast 'catalog:updated'
  _productsIsEmpty = () -> Object.keys(_products).length is 0
  _calcPrice = (base, margin) -> base / (1 - margin)

  ## Product
  getProducts: () -> _products

  getProduct: (id) ->
    deferred = $q.defer()
    if !id
      deferred.reject 'Missing product ID'
    else
      eeBack.productGET(id, $cookies.loginToken)
      .then (data) -> deferred.resolve data
      .catch (err) -> deferred.reject err
    deferred.promise

  productsFromToken: (opts) ->
    deferred = $q.defer()
    if !$cookies.loginToken
      deferred.reject 'Missing login credentials'
    else if !!_products and !_productsIsEmpty() and opts?.force isnt true
      deferred.resolve _products
    else
      eeBack.productsGET($cookies.loginToken)
      .then (data) ->
        _setProducts data
        deferred.resolve data
      .catch (err) -> deferred.reject err
    deferred.promise

  productsFromQuery: (query) ->
    if !!query?.min then query.min = parseInt(query.min / (1 + _startMargin))
    if !!query?.max then query.max = parseInt(query.max / (1 + _startMargin))
    $location.search('min', query.min)
    $location.search('max', query.max)
    deferred = $q.defer()
    if !$cookies.loginToken
      deferred.reject 'Missing login credentials'
    else
      eeBack.productsGET($cookies.loginToken, query)
      .then (data) ->
        _setProducts data
        deferred.resolve data
      .catch (err) -> deferred.reject err
    deferred.promise


  ## Pricing
  marginArray: [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4]
  minMargin: _minMargin
  maxMargin: _maxMargin
  startMargin: _startMargin
  calcPrice: (base, margin) -> _calcPrice(base, margin)
  setCurrentPriceAndCurrentMargin: (scope, base, newMargin) ->
    margin = newMargin
    if newMargin >= _maxMargin then margin = _maxMargin
    if newMargin <= _minMargin then margin = _minMargin
    scope.currentMargin = margin
    scope.currentPrice = _calcPrice(base, margin)
    return
