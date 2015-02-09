'use strict'

angular.module('app.core').factory 'eeSelection', ($cookies, $q, eeBack) ->

  createSelection: (product, margin) ->
    deferred = $q.defer()
    attrs =
      supplier_id: product.supplier_id
      product_id: product.id
      margin: margin
    console.log 'attrs', attrs
    if !$cookies.loginToken
      deferred.reject 'Missing login credentials'
    else
      eeBack.selectionsPOST($cookies.loginToken, attrs)
      .then (data) -> deferred.resolve data
      .catch (err) -> deferred.reject err
    deferred.promise
