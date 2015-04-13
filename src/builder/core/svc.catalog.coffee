'use strict'

angular.module('app.core').factory 'eeCatalog', ($rootScope, $cookies, $q, $location, $modal, eeBack, eeAuth, eeStorefront) ->

  ## SETUP
  _inputDefaults =
    productsPerPage:  24
    page:             null
    search:           null
    range:
      min:            null
      max:            null
    category:         null
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

  ## PRIVATE EXPORT DEFAULTS
  _products   = []
  _inputs     = _inputDefaults
  _searching  = false

  ## PRIVATE FUNCTIONS
  _formQuery = () ->
    query = {}
    if _inputs.page      then query.page       = _inputs.page
    if _inputs.range.min then query.min        = _inputs.range.min
    if _inputs.range.max then query.max        = _inputs.range.max
    if _inputs.search    then query.search     = _inputs.search
    if _inputs.category  then query.categories = [ _inputs.category ] else query.categories = []
    query

  _runQuery = () ->
    deferred = $q.defer()
    # if searching then avoid simultaneous calls to API
    if !!_searching then return _searching
    _searching = deferred.promise
    eeBack.productsGET $cookies.loginToken, _formQuery()
    .then (products) ->
      _products = products
      deferred.resolve products
    .catch (err) -> deferred.reject err
    .finally () ->
      _searching = false
    deferred.promise

  ## EXPORTS
  products:   _products
  inputs:     _inputs
  searching:  _searching
  fns:
    search: () -> _runQuery()
    incrementPage: () ->
      _inputs.page = if _inputs.page < 1 then 2 else _inputs.page + 1
      _runQuery()
    decrementPage: () ->
      _inputs.page = if _inputs.page < 2 then 1 else _inputs.page - 1
      _runQuery()
    setCategory: (category) ->
      _inputs.page = 1
      _inputs.category = category
      _runQuery()
    setRange: (range) ->
      range = range || {}
      _inputs.page = 1
      _inputs.range.min = range.min || null
      _inputs.range.max = range.max || null
      _runQuery()
    setSearchTerm: (search_term) ->
      _inputs.page = 1
      _inputs.search = search_term
      _runQuery()
