'use strict'

angular.module('builder.core').factory 'eeAuth', ($rootScope, $stateParams, $cookies, $cookieStore, $q, $window, eeBack) ->

  ## SETUP
  _status = {}

  ## PRIVATE EXPORT DEFAULTS
  _exports =
    user:       {}
    confirming: false

  ## PRIVATE FUNCTIONS
  _userIsSaved  = true
  _userLastSet  = Date.now()
  _userIsEmpty  = () -> Object.keys(_exports.user).length is 0

  _setUser = (u) ->
    assignKey = (k) -> _exports.user[k] = u[k]
    assignKey key for key in Object.keys u
    _exports.user

  _setConfirmationToken = (token) -> $cookies.confirmationToken = token
  _clearConfirmationToken = () -> $cookieStore.remove 'confirmationToken'

  _setLoginToken = (token) -> $cookies.loginToken = token
  _clearLoginToken = () -> $cookieStore.remove 'loginToken'

  _setKeen = (user) -> $cookies.keen = user.tr_uuid
  _clearKeen = () -> $cookieStore.remove 'keen'

  _setUsername = (user) -> $cookies.username = user.username
  _clearUsername = () -> $cookieStore.remove 'username'

  _reset = () ->
    _clearLoginToken()
    _clearKeen()
    _clearUsername()
    _clearConfirmationToken()
    _setUser {}
    $rootScope.$emit 'definer:logout'

  _logout = () ->
    _reset()
    protocol  = $window.location.protocol
    host      = $window.location.href.split('//')[1].split('/')[0]
    $window.location.assign(protocol + '//' + host + '/logout')

  _defineUserFromToken = () ->
    deferred = $q.defer()

    if !!_status.fetching then return _status.fetching
    if !$cookies.loginToken then deferred.reject('Missing login credentials'); return deferred.promise
    _status.fetching = deferred.promise

    eeBack.fns.tokenPOST $cookies.loginToken
    .then (data) ->
      _setUser data
      if !!data.email then deferred.resolve(data) else deferred.reject(data)
    .catch (err) ->
      _reset()
      deferred.reject err
    .finally () -> _status.fetching = false
    deferred.promise

  _defineUserFromGoToken = (goToken) ->
    deferred = $q.defer()
    eeBack.fns.goPOST goToken
    .then (data) ->
      _setUser data
      if !!data.email then deferred.resolve(data) else deferred.reject(data)
    .catch (err) ->
      _reset()
      deferred.reject err
    deferred.promise

  _completeNewUser = (data, token) ->
    deferred = $q.defer()
    _exports.completing = true
    if !data.username or !data.password
      deferred.reject 'Missing credentials'
    else
      eeBack.fns.usersCompletePUT data, token
      .then (data) ->
        if !!data.user and !!data.token
          _setLoginToken data.token
          _setKeen data.user
          _setUsername data.user
          _setUser data.user
          $rootScope.$emit 'definer:login'
          deferred.resolve data.user
        else
          _reset()
          deferred.reject data
      .catch (err) ->
        _reset()
        deferred.reject err
      .finally () -> _exports.completing = false
    deferred.promise

  _createUserFromEmail = (email, proposition) ->
    deferred = $q.defer()
    _exports.confirming = true
    if !email
      deferred.reject 'Missing email'
    else
      eeBack.fns.usersPOST email, proposition
      .then (data) ->
        _setUser data
        deferred.resolve data
      .catch (err) ->
        _reset()
        deferred.reject err
      .finally () -> _exports.confirming = false
    deferred.promise

  _setUserFromCreateToken = () ->
    token = $stateParams.token
    deferred = $q.defer()
    if !token
      _reset()
      deferred.reject 'Missing login credentials'
    else
      eeBack.fns.createTokenPOST token
      .then (data) ->
        if data.token
          _setConfirmationToken data.token
          deferred.resolve data.token
        else
          _reset()
          deferred.reject data
      .catch (err) ->
        _reset()
        deferred.reject err
    deferred.promise

  ## EXPORTS
  exports: _exports
  fns:
    logout: _logout
    reset:  _reset
    hasToken:               () -> !!$cookies.loginToken
    getToken:               () -> $cookies.loginToken
    getConfirmationToken:   () -> $cookies.confirmationToken
    getKeen:                () -> $cookies.keen
    getUsername:            () -> $cookies.username
    defineUserFromToken:    _defineUserFromToken
    defineUserFromGoToken:  _defineUserFromGoToken
    setUserFromCreateToken: _setUserFromCreateToken

    createUserFromEmail:    _createUserFromEmail
    completeNewUser:        _completeNewUser

    # saveUser: () -> _saveUser()
    setUserIsSaved: (bool) -> _userIsSaved = bool
    userIsSaved: () -> _userIsSaved
    userIsntSaved: () -> !_userIsSaved

    setUserFromCredentials: (email, password) ->
      deferred = $q.defer()
      if !email or !password
        _reset()
        deferred.reject 'Missing login credentials'
      else
        eeBack.fns.authPOST(email, password)
        .then (data) ->
          if !!data.user and !!data.token
            _setLoginToken data.token
            _setKeen data.user
            _setUsername data.user
            _setUser data.user
            $rootScope.$emit 'definer:login'
            deferred.resolve data.user
          else
            _reset()
            deferred.reject data
        .catch (err) ->
          _reset()
          deferred.reject err
        .finally () -> _status.landing = false
      deferred.promise

    # createUserFromSignup: (email, password, storefront_meta, template_ids) ->
    #   _createUserFromSignup email, password, storefront_meta, template_ids

    sendPasswordResetEmail: (email) ->
      deferred = $q.defer()
      if !email
        deferred.reject 'Missing email'
      else
        eeBack.fns.passwordResetEmailPOST(email)
        .then (data) -> deferred.resolve data
        .catch (err) -> deferred.reject err
      deferred.promise

    resetPassword: (password, token) ->
      deferred = $q.defer()
      if !password or !token
        deferred.reject 'Missing password or token'
      else
        token = 'Bearer ' + token
        eeBack.fns.usersUpdatePasswordPUT password, token
        .then (data) -> deferred.resolve data
        .catch (err) -> deferred.reject err
      deferred.promise
