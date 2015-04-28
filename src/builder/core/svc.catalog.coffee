'use strict'

angular.module('builder.core').factory 'eeCatalog', ($rootScope, $cookies, $q, $location, $modal, eeBack, eeAuth) ->

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
      'Accessories'
      'Arts & Crafts'
      'Artwork'
      'Bed & Bath'
      'Electronics'
      'Furniture'
      'Health & Beauty'
      'Home Decor'
      'Jewelry'
      'Kitchen'
      'Outdoor'
      'Pet Supplies'
    ]
    rangeArray: [
      { min: 0,     max: 2500   },
      { min: 2500,  max: 5000   },
      { min: 5000,  max: 10000  },
      { min: 10000, max: 20000  },
      { min: 20000, max: null   }
    ]

  ## PRIVATE EXPORT DEFAULTS
  _data =
    products:   []
    inputs:     _inputDefaults
    searching:  false

  ## PRIVATE FUNCTIONS
  _formQuery = () ->
    query = {}
    if _data.inputs.page      then query.page       = _data.inputs.page
    if _data.inputs.range.min then query.min        = _data.inputs.range.min
    if _data.inputs.range.max then query.max        = _data.inputs.range.max
    if _data.inputs.search    then query.search     = _data.inputs.search
    if _data.inputs.category  then query.categories = [ _data.inputs.category ] else query.categories = []
    query

  _runQuery = () ->
    deferred = $q.defer()
    # if searching then avoid simultaneous calls to API
    if !!_data.searching then return _data.searching
    _data.searching = deferred.promise
    eeBack.productsGET $cookies.loginToken, _formQuery()
    .then (products) ->
      _data.products = products
      deferred.resolve _data.products
    .catch (err) -> deferred.reject err
    .finally () ->
      _data.searching = false
    deferred.promise

  ## EXPORTS
  data: _data
  fns:
    search: () -> _runQuery()
    incrementPage: () ->
      _data.inputs.page = if _data.inputs.page < 1 then 2 else _data.inputs.page + 1
      _runQuery()
    decrementPage: () ->
      _data.inputs.page = if _data.inputs.page < 2 then 1 else _data.inputs.page - 1
      _runQuery()
    setCategory: (category) ->
      _data.inputs.page = 1
      _data.inputs.category = if _data.inputs.category is category then null else category
      _runQuery()
    setRange: (range) ->
      range = range || {}
      _data.inputs.page = 1
      if _data.inputs.range.min is range.min and _data.inputs.range.max is range.max
        _data.inputs.range.min = null
        _data.inputs.range.max = null
      else
        _data.inputs.range.min = range.min
        _data.inputs.range.max = range.max
      _runQuery()
    setSearchTerm: (search_term) ->
      _data.inputs.page = 1
      _data.inputs.search = search_term
      _runQuery()
