'use strict'

angular.module('builder.core').factory 'eeAuth', ($rootScope, $cookies, $cookieStore, $q, eeBack, eeModal) ->

  ## SETUP
  # _userDefaults =
  #   storefront_meta:
  #     home:
  #       name: ''
  #       topBarBackgroundColor: '#dbd6ff'
  #       topBarColor: '#021709'
  #       carousel: [{ imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_center,h_400,w_1200/v1425250403/desk1.jpg' }]
  #     blog: { url: 'https://eeosk.com' }
  #     about: { headline: 'eeosk' }
  #     audience:
  #       social:
  #         facebook:   'facebook'
  #         pinterest:  'pinterest'
  #         twitter:    'twitter'
  #         instagram:  'instagram'

  _status   =
    fetching: false
    landing:  true
    signedIn: false

  ## PRIVATE EXPORT DEFAULTS
  _user = {}

  ## PRIVATE FUNCTIONS
  _userIsSaved  = true
  _userLastSet  = Date.now()
  _userIsEmpty  = () -> Object.keys(_user).length is 0

  _setUser = (u) ->
    assignKey = (k) -> _user[k] = u[k]
    assignKey key for key in Object.keys u
    _user

  _setLoginToken = (token) ->
    $cookies.loginToken = token
    _status.landing     = false
    _status.signedIn    = true

  _clearLoginToken = () -> $cookieStore.remove 'loginToken'

  # _defineAsLanding = () ->
  #   _status.landing  = true
  #   _status.signedIn = false
  #   _setUser _userDefaults

  _resetUser = () -> _clearLoginToken()

  _getUser = (opts) ->
    deferred = $q.defer()
    if !!_status.fetching then return _status.fetching
    _status.fetching = deferred.promise
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
          _status.signedIn = true
          deferred.resolve data
        else
          _resetUser()
          deferred.reject data
      .catch (err) ->
        _resetUser()
        deferred.reject err
      .finally () -> _status.landing = false
    deferred.promise

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
      _resetUser()
      deferred.reject err
    .finally () -> _status.fetching = false
    deferred.promise


  # _getOrSetUser = () ->
  #   deferred = $q.defer()
  #   if !_userIsEmpty() then deferred.resolve _user
  #   if _userIsEmpty() and $cookies.loginToken  then return _getUser()
  #   if _userIsEmpty() and !$cookies.loginToken then deferred.resolve _defineAsLanding()
  #   deferred.promise

  _saveUser = () -> eeBack.usersPUT(_user, $cookies.loginToken)

  ## EXPORTS
  user:   _user
  status: _status
  fns:
    reset:                () -> _resetUser()
    hasToken:             () -> !!$cookies.loginToken
    defineUserFromToken:  () -> _defineUserFromToken()
    # getOrSetUser: () -> _getOrSetUser()

    # getToken: ()  -> $cookies.loginToken

    getUsername: () ->
      _getUser()
      .then (user) -> user.username
      .catch (err) -> console.error err

    saveUser: ()  -> _saveUser()
    saveOrSignup: () -> if _status.landing then eeModal.fns.openSignupModal() else _saveUser()

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
            _setLoginToken data.token
            _setUser data.user
            deferred.resolve data.user
          else
            _resetUser()
            deferred.reject data
        .catch (err) ->
          _resetUser()
          deferred.reject err
        .finally () -> _status.landing = false
      deferred.promise

    createUserFromSignup: (email, password) ->
      deferred = $q.defer()
      if !email or !password
        _resetUser()
        deferred.reject 'Missing login credentials'
      else
        eeBack.usersPOST(email, password)
        .then (data) ->
          if !!data.user and !!data.token
            _setLoginToken data.token
            _setUser data.user
            deferred.resolve data.user
          else
            _resetUser()
            deferred.reject data
        .catch (err) ->
          _resetUser()
          deferred.reject err
        .finally () -> _status.landing = false
      deferred.promise

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

    landingUser: () -> if _userIsEmpty() then _defineAsLanding()
