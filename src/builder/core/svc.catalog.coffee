'use strict'

angular.module('app.core').factory 'eeCatalog', ($rootScope, $cookies, $q, $location, eeBack, eeAuth, eeStorefront) ->

  ## Catalog setup
  _defaults =
    products:               []
    focusedProduct:         null
    focusedImage:           null
    productsPerPage:        24
    page:                   null
    search:                 null
    range:
      min:                  null
      max:                  null
    category:               null
    storefront_product_ids: []
    product_selection:      {}
    searching:              false
    minMargin:              0.05
    maxMargin:              0.40
    startMargin:            0.15
    marginArray:  [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4]
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

  _catalog = _defaults

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
      sels[p_s.product_id] = p_s
    if !!storefront.product_selection then setVars(p_s) for p_s in storefront.product_selection
    _catalog.storefront_product_ids = ids
    _catalog.product_selection = sels

  _formQuery = () ->
    query = {}
    if _catalog.page      then query.page       = _catalog.page
    if _catalog.range.min then query.min        = _catalog.range.min
    if _catalog.range.max then query.max        = _catalog.range.max
    if _catalog.search    then query.search     = _catalog.search
    if _catalog.category  then query.categories = [ _catalog.category ] else query.categories = []
    query

  _runQuery = () ->
    deferred = $q.defer()
    # if searching then avoid simultaneous calls to API
    if !!_catalog.searching then return _catalog.searching
    $rootScope.$broadcast 'catalog:search:started'
    _catalog.searching = deferred.promise
    eeBack.productsGET $cookies.loginToken, _formQuery()
    .then (products) ->
      _catalog.products = products
      # eeStorefront.getStorefront()
    .then (storefront) ->
      _setStorefrontVars storefront
      deferred.resolve _catalog
    .catch (err) -> deferred.reject err
    .finally () ->
      _catalog.searching = false
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

  $rootScope.$on 'storefront:updated', (e, storefront) ->
    _setStorefrontVars storefront
    _broadcast()

  catalog: _catalog

  ## Functions
  fns:
    reset: () -> _catalog = _defaults
    search: () -> _runQuery()

    incrementPage: () ->
      _catalog.page = if _catalog.page < 1 then 2 else _catalog.page + 1
      _runQuery()
    decrementPage: () ->
      _catalog.page = if _catalog.page < 2 then 1 else _catalog.page - 1
      _runQuery()
    setCategory: (category) ->
      console.log 'setting', category
      _catalog.page = 1
      _catalog.category = category
      _runQuery()
    setRange: (range) ->
      range = range || {}
      _catalog.page = 1
      _catalog.range.min = range.min || null
      _catalog.range.max = range.max || null
      _runQuery()
    setSearchTerm: (search_term) ->
      _catalog.page = 1
      _catalog.search = search_term
      _runQuery()

    ## Product
    getProduct: (id) -> _getProduct id
    getProductSelection: () -> _catalog.product_selection

    ## Focused product
    setFocusedProduct: (id) ->
      $rootScope.overlay = !!id
      if !id then _catalog.focusedProduct = null; return
      _getProduct id
      .then (data) ->
        _catalog.focusedProduct = data
        _catalog.focusedImage = data.image_meta.main_image
      .catch (err) -> console.error err

    setFocusedImage: (img) -> _catalog.focusedImage = img

    ## Pricing
    calcPrice: (base, margin) -> _calcPrice(base, margin)
    setCurrents: (newMargin) ->
      margin = newMargin
      if newMargin >= _catalog.maxMargin then margin = _catalog.maxMargin
      if newMargin <= _catalog.minMargin then margin = _catalog.minMargin
      _catalog.focusedProduct.currentMargin = margin
      _catalog.focusedProduct.currentPrice  = _calcPrice(base, margin)
      _catalog.focusedProduct.currentProfit = _catalog.focusedProduct.currentPrice - base
      return
