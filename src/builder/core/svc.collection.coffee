'use strict'

angular.module('builder.core').factory 'eeCollection', ($rootScope, $q, eeAuth, eeBack) ->

  ## SETUP
  # none

  ## PRIVATE EXPORT DEFAULTS
  _data =
    creating:       false
    reading:        false
    updating:       false
    destroying:     false
    save_status:    'Saved'
    save_bool:      false
    page:           1
    count:          null
    collection:     {}
    products:       []
    storeProducts:  []

  ## PRIVATE FUNCTIONS
  _formQuery = () ->
    query = {}
    if _data.page    then query.page   = _data.page
    if _data.search  then query.search = _data.search
    query

  _defineCollection = (id) ->
    deferred  = $q.defer()
    token     = eeAuth.fns.getToken()
    if _data.reading then return _data.reading
    if !token then deferred.reject('Missing token'); return deferred.promise
    _data.collection = {}
    _data.reading = deferred.promise
    eeBack.collectionGET id, token, _formQuery()
    .then (res) ->
      { page, count, perPage, collection, storeProducts } = res
      _data.page          = page
      _data.perPage       = perPage
      _data.count         = count
      _data.collection    = collection
      _data.storeProducts = storeProducts
    .finally () -> _data.reading = false

  _updateCollection = () ->
    deferred  = $q.defer()
    token     = eeAuth.fns.getToken()
    if _data.updating then return _data.updating
    if !token then deferred.reject('Missing token'); return deferred.promise
    _data.updating = deferred.promise
    _data.save_status = 'Saving'
    eeBack.collectionPUT token, _data.collection
    .then (collection) ->
      _data.collection  = collection
      _data.unsaved     = false
      _data.save_status = 'Saved'
      _data.save_bool   = true
    .catch (err) -> _data.save_status = 'Problem saving'
    .finally () -> _data.updating = false

  _destroyCollection = () ->
    deferred  = $q.defer()
    token     = eeAuth.fns.getToken()
    if _data.destroying then return _data.destroying
    if !token then deferred.reject('Missing token'); return deferred.promise
    _data.destroying = deferred.promise
    eeBack.collectionDELETE _data.collection.id, token
    .then (res) -> res
    .finally () -> _data.destroying = false

  _addProduct = (product) ->
    deferred  = $q.defer()
    product.updating = deferred.promise
    eeBack.collectionAddProduct _data.collection?.id, product.id, eeAuth.fns.getToken()
    .then (storeProduct) -> product.storeProductId = storeProduct.id
    .finally () -> product.updating = false

  _removeProduct = (product) ->
    deferred  = $q.defer()
    product.updating = deferred.promise
    eeBack.collectionRemoveProduct _data.collection?.id, product.id, eeAuth.fns.getToken()
    .then () -> product.storeProductId = null
    .finally () -> product.updating = false

  $rootScope.$watch () ->
    return _data.collection
  , (newVal, oldVal) ->
    if oldVal and oldVal.id
      if _data.save_status is 'Saved' and !_data.save_bool
        _data.save_bool = true
        _data.save_status = 'Save'
      else
        _data.save_bool = false
  , true

  ## EXPORTS
  data: _data
  fns:
    defineCollection:   _defineCollection
    updateCollection:   _updateCollection
    destroyCollection:  _destroyCollection
    addProduct:         _addProduct
    removeProduct:      _removeProduct
