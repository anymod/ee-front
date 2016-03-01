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
    .then (user) -> _data.user[key] = user[key] for key in Object.keys(user)
    .catch (err) ->
      _data.err = err
      throw err
    .finally () -> _data.updating = false

  _defineUser = (force) ->
    $q.when(if !_data.user or force then _readUser() else _data.user)

  _setAboutImage = (image) ->
    return unless _data.user?.storefront_meta?.about
    _data.user.storefront_meta.about.imgUrl = image

  ## MESSAGING
  $rootScope.$on 'completed:steps:toggle', (e, step) ->
    _data.user.completed_steps ||= []
    console.log _data.user.completed_steps
    index = _data.user.completed_steps.indexOf(step.id)
    if index > -1 then _data.user.completed_steps.splice(index, 1) else _data.user.completed_steps.push step.id
    _updateUser({ id: _data.user.id, completed_steps: _data.user.completed_steps })

  ## EXPORTS
  data: _data
  fns:
    defineUser: _defineUser
    updateUser: _updateUser
    setAboutImage: _setAboutImage
