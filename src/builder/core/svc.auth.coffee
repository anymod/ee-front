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

  _reset = () ->
    _clearLoginToken()
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

    eeBack.tokenPOST $cookies.loginToken
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
    eeBack.goPOST goToken
    .then (data) ->
      _setUser data
      if !!data.email then deferred.resolve(data) else deferred.reject(data)
    .catch (err) ->
      _reset()
      deferred.reject err
    deferred.promise

  # _createUserFromSignup = (email, password, storefront_meta, product_ids) ->
  #   deferred = $q.defer()
  #   if !email or !password
  #     _reset()
  #     deferred.reject 'Missing signup credentials'
  #   else
  #     signup = { product_selection: [] }
  #     addToSignup = (p_s) ->
  #       margin = p_s.dummy_only?.margin
  #       signup.product_selection.push { product_id: p_s.product_id, supplier_id: p_s.supplier_id, margin: margin }
  #     addToSignup p_s for p_s in product_selection
  #
  #     eeBack.usersPOST(email, password, storefront_meta, signup)
  #     .then (data) ->
  #       if !!data.user and !!data.token
  #         _setLoginToken data.token
  #         _setUser data.user
  #         $rootScope.$emit 'definer:login'
  #         deferred.resolve data.user
  #       else
  #         _reset()
  #         deferred.reject data
  #     .catch (err) ->
  #       _reset()
  #       deferred.reject err
  #     .finally () -> _status.landing = false
  #   deferred.promise

  _completeNewUser = (data, token) ->
    deferred = $q.defer()
    _exports.completing = true
    if !data.username or !data.password
      deferred.reject 'Missing credentials'
    else
      eeBack.usersCompletePUT data, token
      .then (data) ->
        if !!data.user and !!data.token
          _setLoginToken data.token
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
      eeBack.usersPOST email, proposition
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
      eeBack.createTokenPOST token
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
        eeBack.authPOST(email, password)
        .then (data) ->
          if !!data.user and !!data.token
            _setLoginToken data.token
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

    # createUserFromSignup: (email, password, storefront_meta, product_ids) ->
    #   _createUserFromSignup email, password, storefront_meta, product_ids

    sendPasswordResetEmail: (email) ->
      deferred = $q.defer()
      if !email
        deferred.reject 'Missing email'
      else
        eeBack.passwordResetEmailPOST(email)
        .then (data) -> deferred.resolve data
        .catch (err) -> deferred.reject err
      deferred.promise

    resetPassword: (password, token) ->
      deferred = $q.defer()
      if !password or !token
        deferred.reject 'Missing password or token'
      else
        token = 'Bearer ' + token
        eeBack.usersUpdatePasswordPUT password, token
        .then (data) -> deferred.resolve data
        .catch (err) -> deferred.reject err
      deferred.promise
