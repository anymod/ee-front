'use strict'

angular.module('app.core').factory 'eeBack', ($http, $q, eeBackUrl) ->

  _handleError = (deferred, data, status) ->
    if status is 0 then deferred.reject 'Connection error' else deferred.reject data

  _makeRequest = (req) ->
    deferred = $q.defer()
    $http(req)
      .success (data, status) -> deferred.resolve data
      .error (data, status) -> _handleError deferred, data, status
    deferred.promise

  _tokenPOST = (token) ->
    _makeRequest {
      method: 'POST'
      url: eeBackUrl + 'token'
      headers: authorization: token
    }

  tokenPOST: (token) -> _tokenPOST token

  authPOST: (email, password) ->
    _makeRequest {
      method: 'POST'
      url: eeBackUrl + 'auth'
      headers: authorization: 'Basic ' + email + ':' + password
    }

  usersPUT: (user, token) ->
    _makeRequest {
      method: 'PUT'
      url: eeBackUrl + 'users'
      headers: authorization: token
      data: user
    }

  usersPOST: (email, password, username) ->
    _makeRequest {
      method: 'POST'
      url: eeBackUrl + 'users'
      headers: {}
      data: { email: email, password: password, username: username }
    }

  productsGET: (token) ->
    _makeRequest {
      method: 'GET'
      url: eeBackUrl + 'products'
      headers: authorization: token
    }

  productGET: (id, token) ->
    _makeRequest {
      method: 'GET'
      url: eeBackUrl + 'products/' + id
      headers: authorization: token
    }

  selectionsPOST: (token, attrs) ->
    _makeRequest {
      method: 'POST'
      url: eeBackUrl + 'selections'
      headers: authorization: token
      data: attrs
    }

  selectionsDELETE: (token, id) ->
    _makeRequest {
      method: 'DELETE'
      url: eeBackUrl + 'selections/' + id
      headers: authorization: token
    }

  storefrontGET: (username) ->
    _makeRequest {
      method: 'GET'
      url: eeBackUrl + 'store/' + username + '/all'
      headers: authorization: {}
    }
