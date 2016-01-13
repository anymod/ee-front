'use strict'

angular.module('builder.core').factory 'eeUser', ($rootScope, $q, eeAuth, eeBack) ->

  ## SETUP
  # none

  ## PRIVATE EXPORT DEFAULTS
  _data =
    creating:   false
    reading:    false
    updating:   false
    destroying: false

  ## PRIVATE FUNCTIONS
  _readUser = () ->
    if _data.reading then return
    _data.err = null
    _data.reading = true
    eeBack.fns.usersGET eeAuth.fns.getToken()
    .then (user) ->
      _data.user = user
      $rootScope.$broadcast 'user:set'
    .finally () -> _data.reading = false

  _updateUser = (payload) ->
    if _data.updating then return
    _data.err = null
    _data.updating = true
    eeBack.fns.usersPUT (payload || _data.user), eeAuth.fns.getToken()
    .then (user) -> _data.user = user
    .catch (err) ->
      _data.err = err
      throw err
    .finally () -> _data.updating = false

  _defineUser = (force) ->
    $q.when(if !_data.user or force then _readUser() else _data.user)

  _setAboutImage = (image) ->
    return unless _data.user?.storefront_meta?.about
    _data.user.storefront_meta.about.imgUrl = image

  ## EXPORTS
  data: _data
  fns:
    defineUser: _defineUser
    updateUser: _updateUser
    setAboutImage: _setAboutImage
