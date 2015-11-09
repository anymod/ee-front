'use strict'

angular.module('builder.core').factory 'eeOrders', ($cookies, $q, eeBack, eeAuth) ->

  ## SETUP
  _inputDefaults =
    perPage:          48
    page:             null
    search:           null
    searchLabel:      null

  ## PRIVATE EXPORT DEFAULTS
  _data =
    count:      null
    orders:     []
    searching:  false
    inputs:     _inputDefaults

  ## PRIVATE FUNCTIONS
  _formQuery = () ->
    query = {}
    if _data.inputs.page      then query.page       = _data.inputs.page
    if _data.inputs.search    then query.search     = _data.inputs.search
    query

  _runQuery = () ->
    deferred = $q.defer()
    if !!_data.searching then return _data.searching
    _data.searching = deferred.promise
    eeBack.fns.ordersGET eeAuth.fns.getToken(), _formQuery()
    .then (res) ->
      { count, rows }   = res
      _data.count       = count
      _data.orders      = rows
      _data.inputs.searchLabel = _data.inputs.search
      deferred.resolve _data.orders
    .catch (err) ->
      _data.count = null
      deferred.reject err
    .finally () ->
      _data.searching = false
    deferred.promise

  ## EXPORTS
  data: _data
  fns:
    update: () -> _runQuery()
    search: () ->
      _data.inputs.page = 1
      _runQuery()
    # clearSearch: () ->
    #   _data.inputs.search = ''
    #   _data.inputs.page = 1
    #   _runQuery()
    # incrementPage: () ->
    #   _data.inputs.page = if _data.inputs.page < 1 then 2 else _data.inputs.page + 1
    #   _runQuery()
    # decrementPage: () ->
    #   _data.inputs.page = if _data.inputs.page < 2 then 1 else _data.inputs.page - 1
    #   _runQuery()
    # setCategory: (category) ->
    #   _data.inputs.page = 1
    #   _data.inputs.category = if _data.inputs.category is category then null else category
    #   _runQuery()
    # setRange: (range) ->
    #   range = range || {}
    #   _data.inputs.page = 1
    #   if _data.inputs.range.min is range.min and _data.inputs.range.max is range.max
    #     _data.inputs.range.min = null
    #     _data.inputs.range.max = null
    #   else
    #     _data.inputs.range.min = range.min
    #     _data.inputs.range.max = range.max
    #   _runQuery()
    # addTemplateModal: _addTemplateModal
