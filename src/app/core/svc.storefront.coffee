'use strict'

angular.module('app.core').factory 'eeStorefront', ($rootScope, $q, eeAuth, eeBack) ->

  ## SETUP
  # none

  ## PRIVATE EXPORT DEFAULTS
  _storefront_meta    = {}
  _product_selection  = []
  _product_ids        = []
  _categories         = ['All']
  _fetching           = false

  ## PRIVATE FUNCTIONS
  _addCategory = (cat, categories) -> if !!cat and (categories.indexOf(cat) < 0) then categories.push cat

  _getCategories = (product_selection) ->
    categories = ['All']
    if product_selection then _addCategory(product.category, categories) for product in product_selection
    categories

  _storefrontIsEmpty = () ->
    Object.keys(_storefront_meta).length is 0 and _product_selection.length is 0

  _getStorefront = (force) ->
    deferred = $q.defer()
    # if _fetching then avoid simultaneous calls to API
    if !!_fetching then return _fetching
    if !_storefrontIsEmpty() and force isnt true
      _fetching = false
      deferred.resolve {
        storefront_meta:    _storefront_meta
        product_selection:  _product_selection
      }
    else
      # set _fetching to deferred.promise so that subsequent method calls will not lead to API calls
      _fetching = deferred.promise
      eeAuth.getUsername()
      .then (username) -> eeBack.storefrontGET(username)
      .then (data) ->
        _storefront_meta    = data.storefront_meta
        _product_selection  = data.product_selection
        _categories         = _getCategories data.product_selection
        deferred.resolve data
      .catch (err) -> deferred.reject err
      .finally () -> _fetching = false
    deferred.promise

  ## EXPORTS
  storefront_meta:    _storefront_meta
  product_selection:  _product_selection
  product_ids:        _product_ids
  categories:         _categories
  fetching:           _fetching
  fns:
    setCategories: () -> _categories = _getCategories _storefront_meta
    getStorefront: (force) -> _getStorefront(force)
