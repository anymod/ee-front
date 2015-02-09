'use strict'

angular.module('app.core').factory 'eeProducts', ($cookies, $q, eeBack) ->
  _storefrontProducts = []
  _catalogProducts = []

  _setStorefrontProducts  = (product_array) -> _storefrontProducts = product_array
  _setCatalogProducts     = (product_array) -> _catalogProducts = product_array

  getStorefrontProducts: () -> _storefrontProducts
  getCatalogProducts: () -> _catalogProducts

  getProducts: () ->
    deferred = $q.defer()
    if !$cookies.loginToken
      deferred.reject 'Missing login credentials'
    else
      eeBack.productsGET($cookies.loginToken)
      .then (data) ->
        deferred.resolve data
      .catch (err) ->
        deferred.reject err
    deferred.promise
