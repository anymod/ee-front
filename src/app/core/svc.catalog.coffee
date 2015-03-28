'use strict'

angular.module('app.core').factory 'eeCatalog', ($rootScope, $cookies, $q, $location, eeBack) ->
  _products = []
  _query = {}
  _minMargin   = 0.05
  _maxMargin   = 0.40
  _startMargin = 0.15

  _setProducts  = (ps) ->
    _products = ps
    $rootScope.$broadcast 'catalog:products:updated', _products

  _productsIsEmpty = () -> Object.keys(_products).length is 0
  _calcPrice = (base, margin) -> base / (1 - margin)

  _addQuery = (key, value) ->
    if key is 'min' or key is 'max' then value = parseInt(value / (1 + _startMargin))
    _query[key] = value
    $rootScope.$broadcast 'catalog:query:updated', _query

  _removeQuery = (key) -> _addQuery key, null
  _replaceNaNs = () ->
    if !!_query and isNaN _query.min then _removeQuery 'min'
    if !!_query and isNaN _query.max then _removeQuery 'max'

  _getProduct = (id) ->
    deferred = $q.defer()
    if !id
      deferred.reject 'Missing product ID'
    else
      eeBack.productGET(id, $cookies.loginToken)
      .then (data) -> deferred.resolve data
      .catch (err) -> deferred.reject err
    deferred.promise

  ## Reset
  reset: () ->
    _setProducts []
    _query = {}

  ## Product

  getProducts: () -> _products
  getProduct: (id) -> _getProduct id

  ## Query
  getQuery: () -> _query
  addQuery: (key, value) -> _addQuery key, value
  removeQuery: (key) -> _removeQuery key
  logQuery: () -> console.log '_query', _query
  search: () ->
    deferred = $q.defer()
    # $location.search('min', _query.min)
    # $location.search('max', _query.max)
    # $location.search('categories', _query.categories)
    # $location.search('page', _query.page)
    _replaceNaNs()
    if !$cookies.loginToken
      deferred.reject 'Missing login credentials'
    else
      $rootScope.$broadcast 'catalog:search:started'
      eeBack.productsGET($cookies.loginToken, _query)
      .then (data) ->
        _setProducts data
        deferred.resolve data
        $rootScope.$broadcast 'catalog:search:ended'
      .catch (err) ->
        deferred.reject err
        $rootScope.$broadcast 'catalog:search:ended'
    deferred.promise


  ## Pricing
  marginArray: [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4]
  minMargin: _minMargin
  maxMargin: _maxMargin
  startMargin: _startMargin
  calcPrice: (base, margin) -> _calcPrice(base, margin)
  setCurrents: (scope, base, newMargin) ->
    margin = newMargin
    if newMargin >= _maxMargin then margin = _maxMargin
    if newMargin <= _minMargin then margin = _minMargin
    scope.currentMargin = margin
    scope.currentPrice = _calcPrice(base, margin)
    scope.currentProfit = scope.currentPrice - base
    return
