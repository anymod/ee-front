'use strict'

angular.module('builder.core').factory 'eeCollections', ($q, $rootScope, eeAuth, eeBack) ->

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
    eeBack.collectionsGET token, _formQuery()
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
    eeBack.collectionPOST token
    .then (collection) ->
      $rootScope.$broadcast 'sync:collections', collection
      collection
    .catch (err) -> console.error err
    .finally () -> _data.creating = false

  _cloneCollection = (collection) ->
    deferred  = $q.defer()
    token     = eeAuth.fns.getToken() || eeAuth.fns.getConfirmationToken()
    if collection.cloning then return collection.cloning
    if !token then deferred.reject('Missing token'); return deferred.promise
    collection.cloning = deferred.promise
    eeBack.collectionClonePOST collection.id, token
    .then (new_collection) ->
      $rootScope.$broadcast 'sync:collections', new_collection
      new_collection
    .catch (err) ->
      if err and err.message then collection.err = err.message
      throw err
    .finally () -> collection.cloning = false

  _updateCollection = (collection) ->
    deferred  = $q.defer()
    collection.updating = deferred.promise
    eeBack.collectionPUT collection, eeAuth.fns.getToken()
    .then (res) -> collection = res
    .catch (err) ->
      if err and err.message then collection.err = err.message
      throw err
    .finally () -> collection.updating = false

  _destroyCollection = (collection) ->
    deferred = $q.defer()
    collection.destroying = deferred.promise
    eeBack.collectionDELETE collection.id, eeAuth.fns.getToken()
    .then (res) ->
      collection = res
      collection.deleted = true
    .catch (err) ->
      if err and err.message then collection.err = err.message
      throw err
    .finally () -> collection.destroying = false

  _readPublicCollection = (collection, page) ->
    page ||= 1
    deferred = $q.defer()
    collection.reading = deferred.promise
    eeBack.collectionPublicGET collection.id, eeAuth.fns.getToken(), { page: page }
    .then (res) ->
      { count, page, perPage, coll, products } = res
      # collection          = res.coll
      collection.count    = res.count
      collection.page     = res.page
      collection.perPage  = res.perPage
      collection.products = res.products
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
    eeBack.collectionsNavGET token
    .then (res) ->
      _data.nav.carousel      = res.carousel
      _data.nav.alphabetical  = res.alphabetical
    .catch (err) -> console.error err
    .finally () -> _data.nav.reading = false

  _defineNavCollections = (force) ->
    $q.when(if !_data.nav.carousel or !_data.nav.alphabetical or _data.nav.alphabetical.length is 0 or _data.nav.carousel.length is 0 or force then _readNavCollections() else _data.nav)

  _addProduct = (collection_id, product) ->
    deferred  = $q.defer()
    product.updating = deferred.promise
    eeBack.collectionAddProduct collection_id, product.id, eeAuth.fns.getToken()
    .then (storeProduct) ->
      product.storeProductId = storeProduct.id
      $rootScope.$broadcast 'added:product', product, collection_id
    .catch (err) -> if err and err.message then product.err = err.message; throw err
    .finally () -> product.updating = false

  _removeProduct = (collection_id, storeproduct) ->
    deferred  = $q.defer()
    storeproduct.updating = deferred.promise
    eeBack.collectionRemoveProduct collection_id, storeproduct.product_id, eeAuth.fns.getToken()
    .then () -> storeproduct.removed = true
    .catch (err) -> if err and err.message then storeproduct.err = err.message; throw err
    .finally () -> storeproduct.updating = false

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
    readPublicCollection: _readPublicCollection
    addProduct:           _addProduct
    removeProduct:        _removeProduct
    defineNavCollections: _defineNavCollections
