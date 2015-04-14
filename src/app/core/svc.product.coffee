'use strict'

angular.module('app.core').factory 'eeProduct', ($q, $cookies, $modal, eeBack) ->

  ## SETUP
  # none

  ## PRIVATE EXPORT DEFAULTS
  _focused_product  = {}
  _focused_image    = {}
  _data =
    loading: false

  ## PRIVATE FUNCTIONS
  _getProduct = (id) ->
    deferred = $q.defer()
    if !id
      deferred.reject 'Missing product ID'
    else
      eeBack.productGET(id, $cookies.loginToken)
      .then (data) -> deferred.resolve data
      .catch (err) -> deferred.reject err
    deferred.promise

  _calcPrice = (base, margin) -> parseInt(base / (1 - margin))

  _margins =
    minMargin:    0.05
    maxMargin:    0.40
    startMargin:  0.15
    marginArray:  [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4]
    calcPrice:    (base, margin) -> _calcPrice(base, margin)
    calcEarnings: (base, margin) -> _calcPrice(base, margin) - parseInt(base)
    # setPricing: (newMargin) ->
    #   calcPrice = (base, margin) -> base / (1 - margin)
    #   margin = newMargin
    #   if newMargin >= _catalog.maxMargin then margin = _catalog.maxMargin
    #   if newMargin <= _catalog.minMargin then margin = _catalog.minMargin
    #   _catalog.focusedProduct.currentMargin = margin
    #   _catalog.focusedProduct.currentPrice  = calcPrice(base, margin)
    #   _catalog.focusedProduct.currentProfit = _catalog.focusedProduct.currentPrice - base
    #   return


  ## EXPORTS
  focused_product:  _focused_product
  focused_image:    _focused_image
  data:             _data
  fns:
    openProductModal: (id) ->
      if !id then return
      _getProduct id
      .then (data) ->
        _focused_product = data
        $modal.open({
          templateUrl: 'builder/catalog/catalog.modal.html'
          backdropClass: 'white-background opacity-08'
          resolve:
            product:  () -> _focused_product
            margins:  () -> _margins
          controller: 'catalogModalCtrl'
          controllerAs: 'modal'
        })
      .catch (err) -> console.error err
