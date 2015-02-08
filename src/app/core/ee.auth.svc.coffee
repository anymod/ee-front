'use strict'

angular.module('app.core').factory 'eeAuth', ($rootScope, $cookies, $cookieStore, $q, eeBack) ->
  _user = {}

  $rootScope.user = _user
  $rootScope.$watch 'user', (newVal, oldVal) ->
    console.log 'watching', newVal, oldVal

  _resetUser = () ->
    _user = {}
    $cookieStore.remove 'loginToken'
  _setUser = (u) -> _user = u
  _userLastSet = Date.now()

  getToken: ()  -> $cookies.loginToken
  hasToken: ()  -> !!$cookies.loginToken

  getUser: ()   -> _user
  # setUser: (u)  ->
  #   console.log 'setUser'
  #   _setUser(u)
  #   _userLastSet = Date.now()
  #   $rootScope.$broadcast 'eeAuth.setUser', 'foobar'
  # getUserLastSet: () -> _userLastSet
  saveUser: ()  -> eeBack.usersPUT(_user, $cookies.loginToken)
  resetUser: () -> _resetUser()

  setUserFromToken: () ->
    deferred = $q.defer()
    if !$cookies.loginToken
      _resetUser()
      deferred.reject 'Missing login credentials'
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
