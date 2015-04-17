'use strict'

angular.module('builder.core').factory 'eeAuth', ($rootScope, $cookies, $cookieStore, $q, $modal, eeBack) ->

  ## SETUP
  _userDefaults =
    landing: true
    storefront_meta:
      home:
        name: ''
        topBarBackgroundColor: '#dbd6ff'
        topBarColor: '#021709'
        carousel: [{ imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_center,h_400,w_1200/v1425250403/desk1.jpg' }]
      blog: { url: 'https://eeosk.com' }
      about: { headline: 'eeosk' }
      audience:
        social:
          facebook:   'facebook'
          pinterest:  'pinterest'
          twitter:    'twitter'
          instagram:  'instagram'

  _fetching = false

  ## PRIVATE EXPORT DEFAULTS
  _user = {}

  ## PRIVATE FUNCTIONS
  _userIsSaved  = true
  _userLastSet  = Date.now()
  _userIsEmpty  = () -> Object.keys(_user).length is 0

  _setUser = (u) ->
    assignKey = (k) -> _user[k] = u[k]
    assignKey key for key in Object.keys u

  _resetUser = () ->
    $cookieStore.remove 'loginToken'
    _setUser {}

  _getUser = (opts) ->
    deferred = $q.defer()
    if _fetching then return _fetching
    _fetching = deferred
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

  _defineUser = () ->
    deferred = $q.defer()
    if !_userIsEmpty() then deferred.resolve _user
    if _fetching then deferred = _fetching
    if !_fetching and $cookies.loginToken
      _getUser().then (data) -> deferred.resolve data
    else
      _user.storefront_meta = _userDefaults.storefront_meta
      deferred.resolve _user
    deferred.promise

  _saveUser = () -> eeBack.usersPUT(_user, $cookies.loginToken)

  _openSignupModal = () ->
    $modal.open({
      templateUrl: 'builder/auth.signup/auth.signup.modal.html'
      backdropClass: 'white-background opacity-08'
      controller: 'signupCtrl'
      controllerAs: 'modal'
      size: 'sm'
    })

  ## EXPORTS
  user: _user
  fns:
    reset: () -> _resetUser()

    getToken: ()  -> $cookies.loginToken
    hasToken: ()  -> !!$cookies.loginToken

    getUsername: () ->
      _getUser()
      .then (user) -> user.username
      .catch (err) -> console.error err

    defineUser: () -> _defineUser()

    saveUser: ()  -> _saveUser()
    saveOrSignup: () -> if _user.landing then _openSignupModal() else _saveUser()

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

    landingUser: () ->
      if _userIsEmpty()
        _user.storefront_meta = _userDefaults.storefront_meta
        _user.landing         = _userDefaults.landing
      _user

    openSignupModal: () -> _openSignupModal()

    # TODO create terms or other service for these
    openSellerTermsModal: () ->
      $modal.open({
        templateUrl: 'builder/terms/terms.modal.html'
        backdropClass: 'white-background opacity-08'
        controller: 'termsModalCtrl'
        controllerAs: 'modal'
      })

    openPrivacyPolicyModal: () ->
      $modal.open({
        templateUrl: 'builder/terms/terms.modal.privacy.html'
        backdropClass: 'white-background opacity-08'
        controller: 'termsModalCtrl'
        controllerAs: 'modal'
      })
