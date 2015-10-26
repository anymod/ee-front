'use strict'

angular.module('builder.core').factory 'eeProducts', ($rootScope, $q, eeBack, eeAuth, eeDefiner, eeModal, eeElasticsearch) ->

  ## SETUP
  _inputDefaults =
    perPage:          48
    page:             null
    search:           null
    searchLabel:      null
    range:
      min:            null
      max:            null
    category:         null
    categoryArray: [
      { id: 1, title: 'Artwork' },
      { id: 2, title: 'Bed & Bath' },
      { id: 3, title: 'Furniture' },
      { id: 4, title: 'Home Accents' },
      { id: 5, title: 'Kitchen' },
      { id: 6, title: 'Outdoor' }
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
    count:        null
    products:     []
    category_ids: []
    inputs:       _inputDefaults
    searching:    false
    lastCollectionAddedTo: null

  ## PRIVATE FUNCTIONS
  _formQuery = () ->
    query = {}
    query.size = _data.inputs.perPage
    if _data.inputs.page      then query.page       = _data.inputs.page
    if _data.inputs.range.min then query.min_price  = _data.inputs.range.min
    if _data.inputs.range.max then query.max_price  = _data.inputs.range.max
    if _data.inputs.search    then query.search     = _data.inputs.search
    if _data.category_ids.length > 0 then query.category_ids = _data.category_ids
    query

  _runQuery = () ->
    deferred = $q.defer()
    if !!_data.searching then return _data.searching
    _data.searching = deferred.promise
    eeElasticsearch.fns.searchProducts eeAuth.fns.getToken(), _formQuery()
    .then (res) ->
      { hits, total } = res.hits
      _data.count    = total
      _data.products = hits
      _data.inputs.searchLabel = _data.inputs.search
      deferred.resolve _data.products
    .catch (err) ->
      _data.count = null
      deferred.reject err
    .finally () ->
      _data.searching = false
    deferred.promise

  _searchWithTerm = (term) ->
    _data.inputs.search = term
    _data.inputs.page = 1
    _runQuery()

  _addCategory = (category) ->
    _data.category_ids.push category.id

  _removeCategory = (category) ->
    new_category_ids = []
    (if cat_id isnt category.id then new_category_ids.push cat_id) for cat_id in _data.category_ids
    _data.category_ids = new_category_ids

  _addProductModal = (product) ->
    product.err = null
    _data.productToAdd = {}
    _data.productToAdd = product
    eeModal.fns.open 'addProduct'
    return

  ## MESSAGING
  # $rootScope.$on 'reset:products', () -> _data.products = []
  #
  # $rootScope.$on 'added:product', (e, product, collection_id) ->
  #   _data.lastCollectionAddedTo = collection_id
  #   (if product.id is prod.id then prod.productId = product.productId) for prod in _data.products
  #   eeModal.fns.close('addProduct')

  ## EXPORTS
  data: _data
  fns:
    update: _runQuery
    search: _searchWithTerm
    clearSearch: () -> _searchWithTerm ''
    searchWithTerm: (term) -> _searchWithTerm term
    # incrementPage: () ->
    #   _data.inputs.page = if _data.inputs.page < 1 then 2 else _data.inputs.page + 1
    #   _runQuery()
    # decrementPage: () ->
    #   _data.inputs.page = if _data.inputs.page < 2 then 1 else _data.inputs.page - 1
    #   _runQuery()
    toggleCategory: (category) ->
      _data.inputs.page = 1
      if _data.category_ids.indexOf(category.id) < 0 then _addCategory(category) else _removeCategory(category)
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
    addProductModal: _addProductModal
