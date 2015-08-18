'use strict'

angular.module('builder.core').factory 'eeStoreProducts', ($q, eeAuth, eeBack) ->

  ## SETUP
  # none

  ## PRIVATE EXPORT DEFAULTS
  _data =
    creating:       false
    reading:        false
    updating:       false
    destroying:     false
    count:          null
    page:           null
    perPage:        48
    storeProducts:  []

  ## PRIVATE FUNCTIONS
  _formQuery = () ->
    query = {}
    if _data.page then query.page = _data.page
    query

  _runQuery = () ->
    deferred = $q.defer()
    if !!_data.reading then return _data.reading
    _data.reading = deferred.promise
    eeBack.storeProductsGET eeAuth.fns.getToken(), _formQuery()
    .then (res) ->
      { count, rows }     = res
      _data.count         = count
      _data.storeProducts = rows
      deferred.resolve _data.storeProducts
    .catch (err) ->
      _data.count = null
      deferred.reject err
    .finally () ->
      _data.reading = false
    deferred.promise

  _updateStoreProduct = (storeProduct) ->
    deferred  = $q.defer()
    storeProduct.updating = deferred.promise
    eeBack.storeProductsPUT storeProduct, eeAuth.fns.getToken()
    .then (res) -> storeProduct = res
    .catch (err) -> if err and err.message then storeProduct.err = err.message
    .finally () -> storeProduct.updating = false

  _destroyStoreProduct = (storeProduct) ->
    deferred = $q.defer()
    storeProduct.destroying = deferred.promise
    eeBack.storeProductsDELETE storeProduct.id, eeAuth.fns.getToken()
    .then (res) -> storeProduct = res
    .catch (err) -> if err and err.message then storeProduct.err = err.message
    .finally () -> storeProduct.deleted = true

  ## EXPORTS
  data: _data
  fns:
    updateStoreProduct:   _updateStoreProduct
    destroyStoreProduct:  _destroyStoreProduct
    update: () -> _runQuery()
    search: () ->
      _data.page = 1
      _runQuery()
