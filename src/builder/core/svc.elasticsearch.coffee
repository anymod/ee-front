'use strict'

angular.module('builder.core').factory 'eeElasticsearch', ($http, $q, eeBackUrl) ->

  _data =
    inputs:
      perPage:  48
      search:   'sailboats'

  _handleError = (deferred, data, status) ->
    if status is 0 then deferred.reject 'Connection error' else deferred.reject data

  _makeRequest = (req) ->
    deferred = $q.defer()
    $http(req)
      .success (data, status) -> deferred.resolve data
      .error (data, status) -> _handleError deferred, data, status
    deferred.promise

  _formQueryString = (query) ->
    if !query then return ''
    keys = Object.keys(query)
    parts = []
    addQuery = (key) -> parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]))
    addQuery(key) for key in keys
    '?' + parts.join('&')

  _searchProducts = (token, query) ->
    _makeRequest {
      method: 'GET'
      url: eeBackUrl + 'products' + _formQueryString(query)
      headers: authorization: token
    }

  data: _data

  fns:
    searchProducts: _searchProducts
