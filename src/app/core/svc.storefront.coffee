'use strict'

angular.module('app.core').factory 'eeStorefront', ($rootScope, $q, eeAuth, eeBack) ->
  # _fetching = false if not fetching, _fetching = deferred.promise if still fetching
  _fetching   = false
  _storefront = {}
  _categories = ['All']

  _broadcast = () -> $rootScope.$broadcast 'storefront:updated', _storefront
  _broadcastCategories = () -> $rootScope.$broadcast 'storefront:categories:updated', _categories

  _addCategory = (cat, categories) -> if !!cat and (categories.indexOf(cat) < 0) then categories.push cat

  _getCategories = (storefront) ->
    categories = ['All']
    if !!storefront?.product_selection
      _addCategory(product.category, categories) for product in storefront.product_selection
    categories

  _storefrontIsEmpty = () -> Object.keys(_storefront).length is 0

  _getStorefront = (force) ->
    deferred = $q.defer()
    # if _fetching then avoid simultaneous calls to API
    if !!_fetching then return _fetching
    if !_storefrontIsEmpty() and force isnt true
      _fetching = false
      deferred.resolve _storefront
    else
      # set _fetching to deferred.promise so that subsequent method calls will not lead to API calls
      _fetching = deferred.promise
      eeAuth.getUsername()
      .then (username) -> eeBack.storefrontGET(username)
      .then (data) ->
        # set _fetching to false because API call is finished
        _fetching = false
        _storefront = data
        _categories = _getCategories data
        _broadcast()
        _broadcastCategories()
        deferred.resolve data
      .catch (err) ->
        # set _fetching to false because API call is finished
        _fetching = false
        deferred.reject err
    deferred.promise

  # Fetch and rebroadcast storefront upon selection changes
  $rootScope.$on 'selection:added',   () -> _getStorefront(true)
  $rootScope.$on 'selection:removed', () -> _getStorefront(true)

  reset: () ->
    _storefront = {}
    _broadcast()

  isStore: () -> !!$rootScope.isStore
  isBuilder: () -> !!$rootScope.isBuilder

  setCategories: () ->
    _categories = _getCategories _storefront
    _broadcastCategories()

  getCategories: () -> _categories

  getStorefront: (force) -> _getStorefront(force)

  setScopeCategories: (storefront, scope) ->
    scope.categories = _getCategories(storefront)
