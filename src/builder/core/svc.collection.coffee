'use strict'

angular.module('builder.core').factory 'eeCollection', ($q, eeAuth, eeBack) ->

  ## SETUP
  # none

  ## PRIVATE EXPORT DEFAULTS
  _data =
    creating:       false
    reading:        false
    updating:       false
    destroying:     false
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
    .catch (err) -> console.error err
    .finally () -> _data.reading = false

  _updateCollection = () ->
    deferred  = $q.defer()
    token     = eeAuth.fns.getToken()
    if _data.updating then return _data.updating
    if !token then deferred.reject('Missing token'); return deferred.promise
    _data.updating = deferred.promise
    eeBack.collectionPUT token, _data.collection
    .then (collection) -> _data.collection = collection
    .catch (err) -> console.error err
    .finally () -> _data.updating = false

  _addProduct = (product) ->
    deferred  = $q.defer()
    product.updating = deferred.promise
    eeBack.collectionAddProduct _data.collection?.id, product.id, eeAuth.fns.getToken()
    .then () -> product.added = true
    .catch (err) -> console.error err
    .finally () -> product.updating = false

  _removeProduct = (product) ->
    deferred  = $q.defer()
    product.updating = deferred.promise
    eeBack.collectionRemoveProduct _data.collection?.id, product.id, eeAuth.fns.getToken()
    .then () -> product.added = false
    .catch (err) -> console.error err
    .finally () -> product.updating = false


  ## EXPORTS
  data: _data
  fns:
    defineCollection: _defineCollection
    updateCollection: _updateCollection
    addProduct:       _addProduct
    removeProduct:    _removeProduct
