'use strict'

angular.module('app.core').factory 'eeOrders', ($cookies, $q, eeBack, $http) ->
  # _orders = []
  #
  # _setOrders  = (order_array) -> _orders = order_array
  # _ordersIsEmpty = Object.keys(_orders).length is 0

  reset: () ->
    return

  getOrders: () ->
    # _orders
    deferred = $q.defer()
    $http.get '/orders.json'
      .success (data) -> deferred.resolve data;
      .error (data) -> deferred.resolve data;
    deferred.promise

  # ordersFromToken: (opts) ->
  #   deferred = $q.defer()
  #   if !$cookies.loginToken
  #     deferred.reject 'Missing login credentials'
  #   else if !!_orders and !_ordersIsEmpty and opts?.force isnt true
  #     deferred.resolve _orders
  #   else
  #     eeBack.ordersGET($cookies.loginToken)
  #     .then (data) ->
  #       _setOrders data
  #       deferred.resolve data
  #     .catch (err) -> deferred.reject err
  #   deferred.promise
