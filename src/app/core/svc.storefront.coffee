'use strict'

angular.module('app.core').factory 'eeStorefront', ($rootScope, $q, eeAuth, eeBack) ->

  ## SETUP
  # none

  ## PRIVATE EXPORT DEFAULTS
  _data =
    product_selection:  []
    product_ids:        []
    categories:         ['All']
    loading:            false

  ## PRIVATE FUNCTIONS
  _inStorefront   = (id)                -> _data.product_ids.indexOf(id) > -1

  _addProductSel  = (p_s, psArray)      -> if !!p_s and !!p_s.product_id then psArray.push p_s
  _addProductId   = (id, ids)           -> if !!id  and (ids.indexOf(id) < 0) then ids.push id
  _addCategory    = (cat, categories)   -> if !!cat and (categories.indexOf(cat) < 0) then categories.push cat

  _setCategories  = () ->
    categories = ['All']
    _addCategory(p_s.category, categories) for p_s in _data.product_selection
    _data.categories = categories
    return

  _defineData = (product_selection) ->
    if !!product_selection
      _data.product_selection.length = 0
      _addProductSel(p_s, _data.product_selection) for p_s in product_selection

    defineIdAndCategory = (p_s) ->
      _addProductId   p_s.product_id, _data.product_ids
      _addCategory    p_s.category,   _data.categories

    _data.product_ids.length = 0
    _data.categories.length  = 0
    _data.categories.push 'All'
    defineIdAndCategory p_s for p_s in _data.product_selection
    return

  _storefrontIsEmpty = () ->
    _data.product_selection.length is 0

  _getStorefront = (force) ->
    deferred = $q.defer()
    # if _data.loading then avoid simultaneous calls to API
    if !!_data.loading then return _data.loading
    if !_storefrontIsEmpty() and force isnt true
      _data.loading = false
      deferred.resolve { product_selection: _data.product_selection }
    else
      # set _data.loading to deferred.promise so that subsequent method calls will not lead to API calls
      _data.loading = deferred.promise
      eeAuth.fns.getUsername()
      .then (username) ->
        if !username then eeBack.usersStorefrontGET(eeAuth.getToken()) else eeBack.storefrontGET(username)
      .then (data) ->
        _defineData data.product_selection
        deferred.resolve data
      .catch (err) -> deferred.reject err
      .finally () -> _data.loading = false
    deferred.promise

  ## EXPORTS
  data: _data
  fns:
    setCategories: () -> _setCategories()
    getStorefront: (force) -> _getStorefront(force)

    setCarouselImage: (user, imgUrl) -> user.storefront_meta.home.carousel[0].imgUrl = imgUrl
    setAboutImage:    (user, imgUrl) -> user.storefront_meta.about.imgUrl = imgUrl

    addDummyProduct: (product) ->
      if !product.calculated then return console.error('Problem adding dummy product')
      if !_inStorefront product.id then _data.product_selection.push product
      _defineData()

    removeDummyProduct: (product) ->
      index = _data.product_ids.indexOf product.id
      if index > -1 then _data.product_selection.splice index, 1
      _defineData()

    inStorefront: (id) -> _inStorefront id

    setTheme: (user, theme) ->
      user.storefront_meta.home.topBarColor = theme.topBarColor
      user.storefront_meta.home.topBarBackgroundColor = theme.topBarBackgroundColor
      user.storefront_meta.home.carousel[0].imgUrl = theme.imgUrl
      return
