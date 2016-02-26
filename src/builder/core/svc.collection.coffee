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
    page:           1
    perPage:        48
    count:          null
    collection:     {}
    products:   []

  ## PRIVATE FUNCTIONS
  _formQuery = () ->
    query = {}
    if _data.page    then query.page   = _data.page
    if _data.search  then query.search = _data.search
    query

  _defineCollection = (id, reset) ->
    _data.reading = true
    if reset then _data.collection = {}
    eeBack.fns.collectionGET id, eeAuth.fns.getToken(), _formQuery()
    .then (res) ->
      { collection, rows, count, page, perPage } = res
      _data.page        = page
      _data.perPage     = perPage
      _data.count       = count
      _data.collection  = collection
      _data.products    = rows
    .finally () -> _data.reading = false

  _updateCollection = () ->
    _data.collection.updating = true
    eeBack.fns.collectionPUT _data.collection, eeAuth.fns.getToken()
    .then (res) ->
      { collection, rows, count, page, perPage } = res
      _data.page        = page
      _data.perPage     = perPage
      _data.count       = count
      _data.collection  = collection
      _data.products    = rows
      $rootScope.$broadcast 'collection:updated', _data.collection
    .finally () -> _data.collection.updating = false

  # _updateCollection = () ->
  #   deferred  = $q.defer()
  #   token     = eeAuth.fns.getToken()
  #   if _data.updating then return _data.updating
  #   if !token then deferred.reject('Missing token'); return deferred.promise
  #   _data.updating = deferred.promise
  #   eeBack.fns.collectionPUT token, _data.collection
  #   .then (collection) ->
  #     $rootScope.$broadcast 'sync:collections', collection
  #     _data.collection = collection
  #   .finally () -> _data.updating = false

  _destroyCollection = () ->
    deferred  = $q.defer()
    token     = eeAuth.fns.getToken()
    if _data.destroying then return _data.destroying
    if !token then deferred.reject('Missing token'); return deferred.promise
    _data.destroying = deferred.promise
    eeBack.fns.collectionDELETE _data.collection.id, token
    .then (res) ->
      $rootScope.$broadcast 'remove:collections', _data.collection.id
      res
    .finally () -> _data.destroying = false

  ## MESSAGING
  $rootScope.$on 'collection:update:banner', (e, banner) ->
    _data.collection.banner = banner
    _updateCollection()


  ## EXPORTS
  data: _data
  fns:
    update: _defineCollection
    search: (id, reset) ->
      _data.page = 1
      _defineCollection id, reset
    updateCollection:   _updateCollection
    destroyCollection:  _destroyCollection
