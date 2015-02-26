'use strict'

angular.module('app.core').factory 'eeSelection', ($cookies, $q, eeBack) ->

  reset: () ->
    return

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
      .then (data) -> deferred.resolve data
      .catch (err) -> deferred.reject err
    deferred.promise

  deleteSelection: (id) ->
    deferred = $q.defer()
    if !$cookies.loginToken
      deferred.reject 'Missing login credentials'
    else
      eeBack.selectionsDELETE($cookies.loginToken, id)
      .then (data) -> deferred.resolve data
      .catch (err) -> deferred.reject err
    deferred.promise
