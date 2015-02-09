'use strict'

angular.module('app.core').factory 'eeAuth', ($cookies, $cookieStore, $q, eeBack) ->
  _user = {}
  _userIsSaved = true

  _resetUser = () ->
    _user = {}
    $cookieStore.remove 'loginToken'
  _setUser = (u) -> _user = u
  _userLastSet = Date.now()
  _userIsEmpty = Object.keys(_user).length is 0

  getToken: ()  -> $cookies.loginToken
  hasToken: ()  -> !!$cookies.loginToken

  getUser: ()   -> _user
  # setUser: (u)  ->
  #   console.log 'setUser'
  #   _setUser(u)
  #   _userLastSet = Date.now()
  #   $rootScope.$broadcast 'eeAuth.setUser', 'foobar'
  # getUserLastSet: () -> _userLastSet
  resetUser: () -> _resetUser()
  saveUser: ()  -> eeBack.usersPUT(_user, $cookies.loginToken)

  setUserIsSaved: (bool) -> _userIsSaved = bool
  userIsSaved: () -> _userIsSaved
  userIsntSaved: () -> !_userIsSaved

  userFromToken: (opts) ->
    deferred = $q.defer()
    if !$cookies.loginToken
      _resetUser()
      deferred.reject 'Missing login credentials'
    else if !!_user and !_userIsEmpty and opts?.force isnt true
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
