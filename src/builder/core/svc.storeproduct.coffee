'use strict'

angular.module('builder.core').factory 'eeStoreProduct', ($q, eeAuth, eeBack) ->

  data: {}
  fns: {}

  # ## SETUP
  # # none
  #
  # ## PRIVATE EXPORT DEFAULTS
  # _data = {}
  #
  # _reset = () ->
  #   _data.product = {}
  #   _data.loading = false
  #
  # _reset()
  #
  # ## PRIVATE FUNCTIONS
  # _getProduct = (id) ->
  #   deferred = $q.defer()
  #   if !!_data.loading then return _data.loading
  #   if !id then deferred.reject('Missing product ID'); return deferred.promise
  #   _data.product = {}
  #   _data.loading = deferred.promise
  #   eeBack.productGET id, eeAuth.fns.getToken()
  #   .then (data) -> deferred.resolve data
  #   .catch (err) -> deferred.reject err
  #   .finally () -> _data.loading = false
  #   deferred.promise
  #
  # _setProduct = (id) ->
  #   _data.product = {}
  #   _getProduct id
  #   .then (data) ->
  #     _data.product = data
  #     _data.product
  #   .catch (err) -> _data.product = {}
  #
  # ## EXPORTS
  # data: _data
  # fns:
  #   reset:      _reset
  #   setProduct: _setProduct
