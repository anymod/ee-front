'use strict'

angular.module('builder.core').factory 'eeCollections', ($q, $rootScope, $window, eeAuth, eeBack, eeModal) ->

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
    public:         null
    collections:    []
    nav:
      reading:      false
      carousel:     []
      alphabetical: []

  ## PRIVATE FUNCTIONS
  _formQuery = () ->
    query = {}
    if _data.page   then query.page   = _data.page
    if _data.public then query.public = _data.public
    query

  _runQuery = (opts) ->
    deferred  = $q.defer()
    opts    ||= {}
    token = if opts.signup then eeAuth.fns.getConfirmationToken() else eeAuth.fns.getToken()
    if !!_data.reading then return _data.reading
    _data.reading = deferred.promise
    eeBack.fns.collectionsGET token, _formQuery()
    .then (res) ->
      { count, rows }   = res
      _data.count       = count
      _data.collections = rows
      deferred.resolve _data.collections
    .catch (err) ->
      _data.count = null
      deferred.reject err
    .finally () ->
      _data.reading = false
    deferred.promise

  _resetCollections = () ->
    _data.collections       = []
    _data.nav.carousel      = []
    _data.nav.alphabetical  = []

  _createCollection = () ->
    deferred  = $q.defer()
    token     = eeAuth.fns.getToken()
    if _data.creating then return _data.creating
    if !token then deferred.reject('Missing token'); return deferred.promise
    _data.creating = deferred.promise
    eeBack.fns.collectionPOST token
    .then (collection) ->
      $rootScope.$broadcast 'sync:collections', collection
      collection
    .catch (err) -> console.error err
    .finally () -> _data.creating = false

  _cloneCollection = (collection) ->
    token = eeAuth.fns.getToken() || eeAuth.fns.getConfirmationToken()
    if collection.cloning then return collection.cloning
    collection.cloning = true
    eeBack.fns.collectionClonePOST collection.id, token
    .then (new_collection) ->
      collection.cloned = new_collection
      new_collection
    .catch (err) ->
      if err and err.message then collection.err = err.message
      throw err
    .finally () -> collection.cloning = false

  _updateCollection = (collection) ->
    collection.updating = true
    eeBack.fns.collectionPUT collection, eeAuth.fns.getToken()
    .then (res) -> collection[key] = res.collection[key] for key in Object.keys(res.collection)
    .catch (err) ->
      if err and err.message then collection.err = err.message
      throw err
    .finally () -> collection.updating = false

  _destroyCollection = (collection) ->
    destroy = $window.confirm 'Remove this from your store?'
    if destroy
      collection.destroying = true
      eeBack.fns.collectionDELETE collection.id, eeAuth.fns.getToken()
      .then (res) -> collection.destroyed = true
      .catch (err) -> if err and err.message then collection.err = err.message
      .finally () -> collection.destroying = false

  _readPublicCollection = (collection, page) ->
    page ||= 1
    deferred = $q.defer()
    collection.reading = deferred.promise
    token = if eeAuth.fns.getToken() then eeAuth.fns.getToken() else eeAuth.fns.getConfirmationToken()
    eeBack.fns.collectionPublicGET collection.id, token, { page: page }
    .then (res) ->
      { count, page, perPage, coll, rows } = res
      # collection          = res.coll
      collection.count     = res.count
      collection.page      = res.page
      collection.perPage   = res.perPage
      collection.products  = res.rows
    .catch (err) ->
      if err and err.message then collection.err = err.message
      throw err
    .finally () -> collection.reading = false

  _readNavCollections = () ->
    deferred  = $q.defer()
    token     = eeAuth.fns.getToken()
    if _data.nav.reading then return _data.nav.reading
    if !token then deferred.reject('Missing token'); return deferred.promise
    _data.nav.reading = deferred.promise
    eeBack.fns.collectionsNavGET token
    .then (res) ->
      _data.nav.carousel      = res.carousel
      _data.nav.alphabetical  = res.alphabetical
    .catch (err) -> console.error err
    .finally () -> _data.nav.reading = false

  _defineNavCollections = (force) ->
    $q.when(if !_data.nav.carousel or !_data.nav.alphabetical or _data.nav.alphabetical.length is 0 or _data.nav.carousel.length is 0 or force then _readNavCollections() else _data.nav)

  _addProduct = (collection, product, products) ->
    if product.updating then return
    product.updating = true
    product.added = false
    eeBack.fns.collectionAddProduct collection.id, product.id, eeAuth.fns.getToken()
    .then (res) ->
      product.added = true
      collection = res.collection
      $rootScope.$broadcast 'added:product', product, res.collection
    .catch (err) -> if err and err.message then product.err = err.message; throw err
    .finally () -> product.updating = false

  _removeProduct = (collection, product, products) ->
    if product.updating then return
    product.updating = true
    product.removed = false
    eeBack.fns.collectionRemoveProduct collection.id, product.id, eeAuth.fns.getToken()
    .then (res) ->
      product.removed = true
      collection      = res.collection
    .catch (err) -> if err and err.message then product.err = err.message; throw err
    .finally () -> product.updating = false

  _openProductsModal = (collection) ->
    collection.err = null
    eeModal.fns.openCollectionProductsModal collection
    return

  _toggleAddToStore = (collection) ->
    if collection.added
      _destroyCollection collection.cloned
      .then () -> collection.added = false
    else
      _cloneCollection collection
      .then (res) ->
        collection.cloned = res.collection
        collection.added = true

  $rootScope.$on 'sync:collections', (e, collection) ->
    in_set = false
    sync = (coll) ->
      if coll.id is collection.id
        in_set = true
        coll.title        = collection.title
        coll.banner       = collection.banner
        coll.headline     = collection.headline
        coll.in_carousel  = collection.in_carousel
    sync coll for coll in _data.collections
    _data.collections.push collection unless in_set
    _defineNavCollections()

  $rootScope.$on 'remove:collections', (e, id) ->
    (if coll.id is id then coll = {}) for coll in _data.collections
    _defineNavCollections()

  ## EXPORTS
  data: _data
  fns:
    update: _runQuery
    search: (opts) ->
      _data.public = null
      _data.page = 1
      _runQuery opts
    searchPublic: (opts) ->
      _data.public = true
      _data.page = 1
      _runQuery opts

    resetCollections:     _resetCollections
    createCollection:     _createCollection
    updateCollection:     _updateCollection
    destroyCollection:    _destroyCollection
    cloneCollection:      _cloneCollection
    toggleAddToStore:     _toggleAddToStore
    readPublicCollection: _readPublicCollection
    addProduct:           _addProduct
    removeProduct:        _removeProduct
    defineNavCollections: _defineNavCollections
    openProductsModal:    _openProductsModal
