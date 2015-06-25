'use strict'

angular.module('app.core').factory 'eeSelection', ($rootScope, $cookies, $q, eeBack) ->

  ## SETUP
  _isBuilder          = $rootScope.isBuilder
  _isStore            = $rootScope.isStore
  _loggedIn           = !!$cookies.loginToken
  _loggedOut          = !_loggedIn

  _data = {}

  _reset = () ->
    _data.selection = {}
    # _data.calculated =
    #   selling_cents:    undefined
    #   selling_dollars:  undefined
    #   earnings:         undefined
    #   margin:           undefined
    # _data.margins =
    #   min_margin:       0.05
    #   max_margin:       0.40
    #   start_margin:     0.15
    #   margin_array:     [0.1, 0.2, 0.3]
    _data.collections = ['Featured']
    _data.loading = false

  if !_data.margins then _reset()

  _addSelection  = (selection) ->
    $rootScope.$broadcast 'selection:added', selection

  _removeSelection = (id) ->
    $rootScope.$broadcast 'selection:removed', id

  # _calculate = () ->
  #   if !_data.selection?.selling_price then return
  #   _data.calculated.selling_cents    = Math.abs(parseInt(_data.selection.selling_price % 100))
  #   _data.calculated.selling_dollars  = parseInt(parseInt(_data.selection.selling_price) - _data.calculated.selling_cents) / 100
  #   _data.calculated.earnings         = _data.selection.selling_price - _data.selection.baseline_price
  #   _data.calculated.margin           = 1 - (_data.selection.baseline_price / _data.selection.selling_price)
  #   return

  _setSelectionFromId = (id) ->
    deferred = $q.defer()
    if !!_data.loading then return _data.loading
    if !id then deferred.reject('Missing selection ID'); return deferred.promise
    _data.loading = deferred.promise
    eeBack.selectionGET id, $cookies.loginToken
    .then (sel) ->
      _data.selection = sel
      deferred.resolve sel
    .catch (err) -> deferred.reject err
    .finally () -> _data.loading = false
    deferred.promise

  # _setSelectionFromProduct = (product) ->
  #   _data.selection =
  #     product_id:     product.id
  #     title:          product.title
  #     content:        product.content
  #     collection:     product.category
  #     featured:       true
  #     margin:         _data.margins.start_margin
  #     baseline_price: parseInt(product.baseline_price)
  #     selling_price:  parseInt(product.baseline_price / (1 - _data.margins.start_margin))
  #   _calculate()

  data: _data
  fns:
    setSelectionFromId:       _setSelectionFromId
    # setSelectionFromProduct:  _setSelectionFromProduct

    createSelection: (product, margin) ->
      deferred = $q.defer()
      attrs =
        supplier_id: product.supplier_id
        product_id: product.id
        margin: margin
      if !$cookies.loginToken
        deferred.reject 'Missing login credentials'
      else
        eeBack.selectionsPOST($cookies.loginToken, attrs)
        .then (data) ->
          _addSelection data.id
          deferred.resolve data
        .catch (err) -> deferred.reject err
      deferred.promise

    deleteSelection: (id) ->
      deferred = $q.defer()
      if !$cookies.loginToken
        deferred.reject 'Missing login credentials'
      else
        eeBack.selectionsDELETE($cookies.loginToken, id)
        .then (data) ->
          _removeSelection id
          deferred.resolve data
        .catch (err) -> deferred.reject err
      deferred.promise
