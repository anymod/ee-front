'use strict'

angular.module('app.core').factory 'eeCatalog', ($cookies, $q, eeBack) ->
  _products = []

  _setProducts  = (product_array) -> _products = product_array
  _productsIsEmpty = Object.keys(_products).length is 0

  getProducts: () -> _products

  productsFromToken: (opts) ->
    deferred = $q.defer()
    if !$cookies.loginToken
      deferred.reject 'Missing login credentials'
    else if !!_products and !_productsIsEmpty and opts?.force isnt true
      deferred.resolve _products
    else
      eeBack.productsGET($cookies.loginToken)
      .then (data) ->
        _setProducts data
        deferred.resolve data
      .catch (err) -> deferred.reject err
    deferred.promise
