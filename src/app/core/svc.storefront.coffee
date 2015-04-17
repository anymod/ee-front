'use strict'

angular.module('app.core').factory 'eeStorefront', ($rootScope, $q, eeAuth, eeBack) ->

  ## SETUP
  # none

  ## PRIVATE EXPORT DEFAULTS
  _storefront =
    storefront_meta:    {}
    product_selection:  []
  _data =
    product_ids:          []
    categories:           ['All']
    fetching:             false

  ## PRIVATE FUNCTIONS
  _inStorefront   = (id)                -> _data.product_ids.indexOf(id) >= 0
  _addProductId   = (id, ids)           -> if !!id and (ids.indexOf(id) < 0) then ids.push id
  _addCategory    = (cat, categories)   -> if !!cat and (categories.indexOf(cat) < 0) then categories.push cat

  _getCategories  = (product_selection) ->
    categories = ['All']
    if product_selection then _addCategory(product.category, categories) for product in product_selection
    categories

  _defineData = () ->
    product_ids = []
    categories  = ['All']
    defineData = (product) ->
      _addProductId product.id, product_ids
      _addCategory product.category, categories
    defineData product for product in _storefront.product_selection
    _data.product_ids = product_ids
    _data.categories  = categories
    return

  _storefrontIsEmpty = () ->
    Object.keys(_storefront.storefront_meta).length is 0 and _storefront.product_selection.length is 0

  _getStorefront = (force) ->
    deferred = $q.defer()
    # if _data.fetching then avoid simultaneous calls to API
    if !!_data.fetching then return _data.fetching
    if !_storefrontIsEmpty() and force isnt true
      _data.fetching = false
      deferred.resolve {
        storefront_meta:    _storefront.storefront_meta
        product_selection:  _storefront.product_selection
      }
    else
      # set _data.fetching to deferred.promise so that subsequent method calls will not lead to API calls
      _data.fetching = deferred.promise
      eeAuth.getUsername()
      .then (username) -> eeBack.storefrontGET(username)
      .then (data) ->
        _storefront.storefront_meta   = data.storefront_meta
        _storefront.product_selection = data.product_selection
        _defineData()
        deferred.resolve data
      .catch (err) -> deferred.reject err
      .finally () -> _data.fetching = false
    deferred.promise

  ## EXPORTS
  storefront: _storefront
  data:       _data
  fns:
    setCategories: () -> _data.categories = _getCategories _storefront.storefront_meta
    getStorefront: (force) -> _getStorefront(force)

    setCarouselImage: (user, imgUrl) ->
      user.storefront_meta.home.carousel[0].imgUrl = imgUrl

    addDummyProduct: (product) ->
      if !product.calculated then console.error('Problem adding dummy product'); return
      if !_inStorefront(product.id) then _storefront.product_selection.push product
      _defineData()

    removeDummyProduct: (product) ->
      index = _data.product_ids.indexOf product.id
      if index >= 0 then _storefront.product_selection.splice index, 1
      _defineData()

    inStorefront: (id) -> _inStorefront id

    setTheme: (user, theme) ->
      user.storefront_meta.home.topBarColor = theme.topBarColor
      user.storefront_meta.home.topBarBackgroundColor = theme.topBarBackgroundColor
      user.storefront_meta.home.carousel[0].imgUrl = theme.imgUrl
      return
