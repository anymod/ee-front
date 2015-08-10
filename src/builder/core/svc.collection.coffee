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
  _defineCollection = (id) ->
    deferred  = $q.defer()
    token     = eeAuth.fns.getToken()
    if _data.reading then return _data.reading
    if !token then deferred.reject('Missing token'); return deferred.promise
    _data.collection = {}
    _data.reading = deferred.promise
    eeBack.collectionGET id, token
    .then (res) ->
      { page, count, perPage, collection, storeProducts } = res
      _data.page          = page
      _data.perPage       = perPage
      _data.count         = count
      _data.collection    = collection
      _data.storeProducts = storeProducts
    .catch (err) -> console.error err
    .finally () -> _data.reading = false


  ## EXPORTS
  data: _data
  fns:
    defineCollection: _defineCollection
