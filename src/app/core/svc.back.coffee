'use strict'

angular.module('app.core').factory 'eeBack', ($http, $q, eeBackUrl) ->

  _tokenPOST = (token) ->
    req =
      method: 'POST'
      url: eeBackUrl + 'token'
      headers: authorization: token
    deferred = $q.defer()
    $http(req)
      .success (data, status, headers, config) -> deferred.resolve data
      .error (data, status, headers, config) ->
        if status is 0 then deferred.reject 'Connection error' else deferred.reject data
    deferred.promise

  tokenPOST: (token) -> _tokenPOST(token)

  authPOST: (email, password) ->
    req =
      method: 'POST'
      url: eeBackUrl + 'auth'
      headers: authorization: 'Basic ' + email + ':' + password
    deferred = $q.defer()
    $http(req)
      .success (data, status, headers, config) -> deferred.resolve data
      .error (data, status, headers, config) ->
        if status is 0 then deferred.reject 'Connection error' else deferred.reject data
    deferred.promise

  usersPUT: (user, token) ->
    req =
      method: 'PUT'
      url: eeBackUrl + 'users'
      headers: authorization: token
      data: user
    deferred = $q.defer()
    $http(req)
      .success (data, status, headers, config) ->
        deferred.resolve data
      .error (data, status, headers, config) ->
        if status is 0 then deferred.reject 'Connection error' else deferred.reject data
    deferred.promise

  usersPOST: (email, password, username) ->
    req =
      method: 'POST'
      url: eeBackUrl + 'users'
      headers: {}
      data: { email: email, password: password, username: username }
    deferred = $q.defer()
    $http(req)
      .success (data, status, headers, config) ->
        deferred.resolve data
      .error (data, status, headers, config) ->
        if status is 0 then deferred.reject 'Connection error' else deferred.reject data
    deferred.promise

  productsGET: (token) ->
    req =
      method: 'GET'
      url: eeBackUrl + 'products'
      headers: authorization: token
    deferred = $q.defer()
    $http req
      .success (data, status, headers, config) ->
        deferred.resolve data
      .error (data, status, headers, config) ->
        if status is 0 then deferred.reject 'Connection error' else deferred.reject data
    deferred.promise

  selectionsPOST: (token, attrs) ->
    req =
      method: 'POST'
      url: eeBackUrl + 'selections'
      headers: authorization: token
      data: attrs
    deferred = $q.defer()
    $http(req)
      .success (data, status, headers, config) ->
        deferred.resolve data
      .error (data, status, headers, config) ->
        if status is 0 then deferred.reject 'Connection error' else deferred.reject data
    deferred.promise

  storefrontGET: (username) ->
    req =
      method: 'GET'
      url: eeBackUrl + 'store/' + username + '/all'
      headers: authorization: {}
    deferred = $q.defer()
    $http(req)
      .success (data, status, headers, config) ->
        deferred.resolve data
      .error (data, status, headers, config) ->
        if status is 0 then deferred.reject 'Connection error' else deferred.reject data
    deferred.promise
