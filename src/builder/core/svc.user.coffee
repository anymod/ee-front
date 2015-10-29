'use strict'

angular.module('builder.core').factory 'eeUser', ($q, eeAuth, eeBack) ->

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
    deferred  = $q.defer()
    token     = eeAuth.fns.getToken()
    if _data.reading then return _data.reading
    if !token then deferred.reject('Missing token'); return deferred.promise
    _data.reading = deferred.promise
    eeBack.usersGET token
    .then (user) -> _data.user = user
    .finally () -> _data.reading = false

  _updateUser = (payload) ->
    deferred  = $q.defer()
    token     = eeAuth.fns.getToken()
    if _data.updating then return _data.updating
    if !token then deferred.reject('Missing token'); return deferred.promise
    _data.updating = deferred.promise
    console.log 'payload', payload
    eeBack.usersPUT (payload || _data.user), token
    .then (user) -> _data.user = user
    .finally () -> _data.updating = false

  _defineUser = (force) ->
    $q.when(if !_data.user or force then _readUser() else _data.user)

  _setCarouselImage = (image) ->
    return unless _data.user?.storefront_meta?.home?.carousel[0]
    _data.user.storefront_meta.home?.carousel[0].imgUrl = image

  _setAboutImage = (image) ->
    return unless _data.user?.storefront_meta?.about
    _data.user.storefront_meta.about.imgUrl = image

  ## EXPORTS
  data: _data
  fns:
    defineUser: _defineUser
    updateUser: _updateUser

    setCarouselImage: _setCarouselImage
    setAboutImage:    _setAboutImage
