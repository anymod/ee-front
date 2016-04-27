# 'use strict'
#
# angular.module('builder.core').factory 'eeStoreProduct', ($q, eeAuth, eeBack) ->
#
#   ## SETUP
#   # none
#
#   ## PRIVATE EXPORT DEFAULTS
#   _data = {}
#
#   _reset = () ->
#     _data.storeproduct = {}
#     _data.reading = false
#
#   _reset()
#
#   ## PRIVATE FUNCTIONS
#   _getStoreProduct = (id) ->
#     deferred = $q.defer()
#     if !!_data.reading then return _data.reading
#     if !id then deferred.reject('Missing storeproduct ID'); return deferred.promise
#     _data.storeproduct = {}
#     _data.reading = deferred.promise
#     eeBack.fns.storeProductGET id, eeAuth.fns.getToken()
#     .then (data) -> deferred.resolve data
#     .catch (err) -> deferred.reject err
#     .finally () -> _data.reading = false
#     deferred.promise
#
#   _setStoreProduct = (id) ->
#     _data.storeproduct = {}
#     _getStoreProduct id
#     .then (data) ->
#       _data.storeproduct = data
#       _data.storeproduct
#     .catch (err) -> _data.storeproduct = {}
#
#   ## EXPORTS
#   data: _data
#   fns:
#     reset:            _reset
#     setStoreProduct:  _setStoreProduct
