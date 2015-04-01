'use strict'

angular.module('app.core').factory 'eeCatalog', ($rootScope, $cookies, $q, $location, eeBack, eeAuth, eeStorefront) ->
  # _fetching = false if not fetching, _fetching = deferred.promise if still fetching
  _fetching   = false

  _defaults =
    products: []
    page:     null
    search:   null
    min:      null
    max:      null
    category: null
    storefront_product_ids: []
    product_selections: {}

  _catalog      = _defaults
  _minMargin    = 0.05
  _maxMargin    = 0.40
  _startMargin  = 0.15

  # _products = []
  # _query = {}

  _broadcast = () ->
    console.log '_catalog', _catalog
    $rootScope.$broadcast 'catalog:updated', _catalog

  _setAttrs = (attrs) ->
    setAttr = (key) -> _catalog[key] = attrs[key]
    setAttr key for key in Object.keys(attrs)
    _broadcast()

  _formQuery = () ->
    query = {}
    if _catalog.page      then query.page       = _catalog.page
    if _catalog.min       then query.min        = _catalog.min
    if _catalog.max       then query.max        = _catalog.max
    if _catalog.search    then query.search     = _catalog.search
    if _catalog.category  then query.categories = [ _catalog.category ]
    query

  _runQuery = () ->
    deferred = $q.defer()
    # if _fetching then avoid simultaneous calls to API
    if !!_fetching then return _fetching
    if !$cookies.loginToken
      deferred.reject 'Missing login credentials'
    else
      $rootScope.$broadcast 'catalog:search:started'
      _fetching = deferred.promise
      eeBack.productsGET $cookies.loginToken, _formQuery()
      .then (products) ->
        _catalog.products = products
        eeAuth.getUsername()
      .then (username) -> eeStorefront.productLookup username
      .then (productLookup) ->
        _catalog.product_selections     = productLookup
        _catalog.storefront_product_ids = Object.keys(productLookup).map((key) -> parseInt(key))
        deferred.resolve _catalog
      .catch (err) -> deferred.reject err
      .finally () ->
        _fetching = false
        $rootScope.$broadcast 'catalog:search:ended', _catalog
    deferred.promise


  # _productsIsEmpty = () -> Object.keys(_products).length is 0
  _calcPrice = (base, margin) -> base / (1 - margin)
  #
  # _addQuery = (key, value) ->
  #   if key is 'min' or key is 'max' then value = parseInt(value / (1 + _startMargin))
  #   _query[key] = value
  #   $rootScope.$broadcast 'catalog:query:updated', _query
  #
  # _removeQuery = (key) -> _addQuery key, null
  # _replaceNaNs = () ->
  #   if !!_query and isNaN _query.min then _removeQuery 'min'
  #   if !!_query and isNaN _query.max then _removeQuery 'max'
  #
  # _getProduct = (id) ->
  #   deferred = $q.defer()
  #   if !id
  #     deferred.reject 'Missing product ID'
  #   else
  #     eeBack.productGET(id, $cookies.loginToken)
  #     .then (data) -> deferred.resolve data
  #     .catch (err) -> deferred.reject err
  #   deferred.promise
  #


  changePageBy = (n) ->
    $scope.page += n
    if $scope.page <= 1 then $scope.page = 1
    eeCatalog.search()

  # ## Reset
  reset: () -> _catalog = _defaults
  incrementPage: (n) -> return

  search: () -> _runQuery()
  setCategory: (category) ->
    _catalog.page = 1
    _catalog.category = category
    _runQuery()

  setRange: (range) ->
    _catalog.min = range.min || null
    _catalog.max = range.max || null
    _runQuery()


  #
  # ## Product
  #
  # getProducts: () -> _products
  # getProduct: (id) -> _getProduct id
  #
  # ## Query
  # getQuery: () -> _query
  # addQuery: (key, value) -> _addQuery key, value
  # removeQuery: (key) -> _removeQuery key
  # logQuery: () -> console.log '_query', _query
  # search: () ->
  #   deferred = $q.defer()
  #   # $location.search('min', _query.min)
  #   # $location.search('max', _query.max)
  #   # $location.search('categories', _query.categories)
  #   # $location.search('page', _query.page)
  #   _replaceNaNs()
  #   if !$cookies.loginToken
  #     deferred.reject 'Missing login credentials'
  #   else
  #     $rootScope.$broadcast 'catalog:search:started'
  #     eeBack.productsGET($cookies.loginToken, _query)
  #     .then (data) ->
  #       _setProducts data
  #       deferred.resolve data
  #       $rootScope.$broadcast 'catalog:search:ended'
  #     .catch (err) ->
  #       deferred.reject err
  #       $rootScope.$broadcast 'catalog:search:ended'
  #   deferred.promise


  ## Catalog setup
  categoryArray: [
    'Home Decor',
    'Kitchen',
    'Accessories',
    'Health & Beauty',
    'Electronics',
    'General Merchandise'
  ]
  rangeArray: [
    { min: 0,     max: 2500   },
    { min: 2500,  max: 5000   },
    { min: 5000,  max: 10000  },
    { min: 10000, max: 20000  },
    { min: 20000, max: null   }
  ]

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
