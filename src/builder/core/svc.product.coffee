'use strict'

angular.module('builder.core').factory 'eeProduct', ($q, eeAuth, eeBack) ->

  ## SETUP
  # none

  ## PRIVATE EXPORT DEFAULTS
  _data = {}

  _reset = () ->
    _data.product = {}
    _data.reading = false

  _reset()

  ## PRIVATE FUNCTIONS
  _getComplete = (product) ->
    if product.reading then return
    product.reading = true
    eeBack.fns.productGET product.id, eeAuth.fns.getToken()
    .then (prod) ->
      assigns = ['title', 'msrps', 'prices', 'skus']
      product[attr] = prod[attr] for attr in assigns
      prod
    .catch (err) -> product.error = err
    .finally () -> product.reading = false

  _setProduct = (product) ->
    if _data.reading then return
    _data.reading = true
    _data.product = {}
    _getComplete product
    .then (prod) -> _data.product = prod
    .catch (err) -> _data.product = {}
    .finally () -> _data.reading = false

  ## EXPORTS
  data: _data
  fns:
    reset:        _reset
    setProduct:   _setProduct
    getComplete:  _getComplete
