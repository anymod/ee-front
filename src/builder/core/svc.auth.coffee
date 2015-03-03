'use strict'

angular.module('builder.core').factory 'eeAuth', ($rootScope, $cookies, $cookieStore, $q, eeBack) ->
  _user = {}
  _userIsSaved = true
  _userLastSet = Date.now()
  _userIsEmpty = () -> Object.keys(_user).length is 0

  _setUser = (u) ->
    _user = u
    $rootScope.$broadcast 'auth:user:updated', _user

  _resetUser = () ->
    $cookieStore.remove 'loginToken'
    _setUser {}

  _getUser = (opts) ->
    deferred = $q.defer()
    if !$cookies.loginToken
      _resetUser()
      deferred.reject 'Missing login credentials'
    else if !!_user and !_userIsEmpty() and opts?.force isnt true
      deferred.resolve _user
    else
      eeBack.tokenPOST $cookies.loginToken
      .then (data) ->
        if !!data.username
          _setUser data
          deferred.resolve data
        else
          _resetUser()
          deferred.reject data
      .catch (err) ->
        _resetUser()
        deferred.reject err
    deferred.promise

  reset: () ->
    _resetUser()
    return

  getToken: ()  -> $cookies.loginToken
  hasToken: ()  -> !!$cookies.loginToken

  getUsername: () ->
    _getUser()
    .then (user) -> user.username
    .catch (err) -> console.error err

  saveUser: ()  -> eeBack.usersPUT(_user, $cookies.loginToken)

  setUserIsSaved: (bool) -> _userIsSaved = bool
  userIsSaved: () -> _userIsSaved
  userIsntSaved: () -> !_userIsSaved

  userFromToken: (opts) -> _getUser(opts)

  setUserFromCredentials: (email, password) ->
    deferred = $q.defer()
    if !email or !password
      _resetUser()
      deferred.reject 'Missing login credentials'
    else
      eeBack.authPOST(email, password)
      .then (data) ->
        if !!data.user and !!data.token
          $cookies.loginToken = data.token
          _setUser data.user
          deferred.resolve data.user
        else
          _resetUser()
          deferred.reject data
      .catch (err) ->
        _resetUser()
        deferred.reject err
    deferred.promise

  createUserFromSignup: (email, password, username) ->
    deferred = $q.defer()
    if !email or !password or !username
      _resetUser()
      deferred.reject 'Missing login credentials'
    else
      eeBack.usersPOST(email, password, username)
      .then (data) ->
        if !!data.user and !!data.token
          $cookies.loginToken = data.token
          _setUser data.user
          deferred.resolve data.user
        else
          _resetUser()
          deferred.reject data
      .catch (err) ->
        _resetUser()
        deferred.reject err
    deferred.promise

  setScopeUser: (scope) ->
    _getUser()
    .then () -> scope.user = _user
    .catch () -> scope.user = {}
