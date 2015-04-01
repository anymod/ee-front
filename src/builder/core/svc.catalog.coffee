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
    product_selection_obj: {}

  _catalog      = _defaults
  _minMargin    = 0.05
  _maxMargin    = 0.40
  _startMargin  = 0.15

  # _products = []
  # _query = {}

  _broadcast = () -> $rootScope.$broadcast 'catalog:updated', _catalog

  _setAttrs = (attrs) ->
    setAttr = (key) -> _catalog[key] = attrs[key]
    setAttr key for key in Object.keys(attrs)
    _broadcast()

  _setStorefrontVars = (storefront) ->
    ids     = []
    sels    = {}
    setVars = (p_s) ->
      ids.push p_s.product_id
      sels[p_s.product_id] = p_s.selection_id
    if !!storefront.product_selection then setVars(p_s) for p_s in storefront.product_selection
    _catalog.storefront_product_ids = ids
    _catalog.product_selection_obj = sels

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
        eeStorefront.getStorefront()
      .then (storefront) ->
        _setStorefrontVars storefront
        deferred.resolve _catalog
      .catch (err) -> deferred.reject err
      .finally () ->
        _fetching = false
        $rootScope.$broadcast 'catalog:updated', _catalog
    deferred.promise

  _calcPrice = (base, margin) -> base / (1 - margin)

  _getProduct = (id) ->
    deferred = $q.defer()
    if !id
      deferred.reject 'Missing product ID'
    else
      eeBack.productGET(id, $cookies.loginToken)
      .then (data) -> deferred.resolve data
      .catch (err) -> deferred.reject err
    deferred.promise

  changePageBy = (n) ->
    $scope.page += n
    if $scope.page <= 1 then $scope.page = 1
    eeCatalog.search()

  $rootScope.$on 'storefront:updated', (e, storefront) ->
    _setStorefrontVars storefront
    _broadcast()

  ## Reset
  reset: () -> _catalog = _defaults
  search: () -> _runQuery()

  incrementPage: () ->
    _catalog.page = if _catalog.page < 1 then 2 else _catalog.page + 1
    _runQuery()
  decrementPage: () ->
    _catalog.page = if _catalog.page < 2 then 1 else _catalog.page - 1
    _runQuery()
  setCategory: (category) ->
    _catalog.page = 1
    _catalog.category = category
    _runQuery()
  setRange: (range) ->
    _catalog.min = range.min || null
    _catalog.max = range.max || null
    _runQuery()

  # ## Product
  getProduct: (id) -> _getProduct id

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
  marginArray:  [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4]
  minMargin:    _minMargin
  maxMargin:    _maxMargin
  startMargin:  _startMargin
  calcPrice: (base, margin) -> _calcPrice(base, margin)
  setCurrents: (scope, base, newMargin) ->
    margin = newMargin
    if newMargin >= _maxMargin then margin = _maxMargin
    if newMargin <= _minMargin then margin = _minMargin
    scope.currentMargin = margin
    scope.currentPrice = _calcPrice(base, margin)
    scope.currentProfit = scope.currentPrice - base
    return
