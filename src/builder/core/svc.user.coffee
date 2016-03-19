'use strict'

angular.module('builder.core').factory 'eeUser', ($rootScope, $q, $cookies, eeAuth, eeBack) ->

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

  _updateUser = (payload, skipAssignment) ->
    if _data.updating then return
    _data.err = null
    _data.updating = true
    eeBack.fns.usersPUT (payload || _data.user), eeAuth.fns.getToken()
    .then (user) ->
      unless skipAssignment
        _data.user[key] = user[key] for key in Object.keys(user)
    .catch (err) ->
      _data.err = err
      throw err
    .finally () ->
      _data.updating = false
      $rootScope.$broadcast 'user:updated', _data.user

  _defineUser = (force) ->
    $q.when(if !_data.user or force then _readUser() else _data.user)

  _setAboutImage = (image) ->
    return unless _data.user?.storefront_meta?.about
    _data.user.storefront_meta.about.imgUrl = image

  ## MESSAGING
  keenio =
    user:       eeAuth.fns.getKeen()
    username:   eeAuth.fns.getUsername()
    _ga:        $cookies.get('_ga')
    _gat:       $cookies.get('_gat')

  $rootScope.$on 'completed:steps:toggle', (e, data) ->
    return if !_data.user.completed_steps
    { track, activity, step } = data
    keenio.track_id       = track.id
    keenio.activity_id    = activity.id
    keenio.step_id        = step.id
    keenio.track_title    = track.title
    keenio.activity_title = activity.title
    keenio.step_title     = step.title
    index = _data.user.completed_steps.indexOf(step.id)
    if index > -1
      _data.user.completed_steps.splice(index, 1)
      keenio.uncheck = true
    else
      _data.user.completed_steps.push step.id
      keenio.check = true
    _updateUser({ id: _data.user.id, completed_steps: _data.user.completed_steps })
    if $rootScope.isProduction then $rootScope.keenio.addEvent 'checkbox', keenio

  moveBetween = (fromArr, fromIndex, toArr, toIndex) ->
    obj = fromArr.splice(fromIndex, 1)[0]
    toArr.splice toIndex, 0, obj

  moveWithin = (arr, index, n) ->
    return if index >= arr.length
    arr.splice(index + n, 0, arr.splice(index, 1)[0])

  $rootScope.$on 'move:homepage:collection', (e, data) ->
    # data = { section: string, collection: obj, direction: string }
    return unless _data?.user?.home_page and data.section and data.collection and data.direction
    index = _data.user.home_page[data.section].indexOf data.collection
    length = _data.user.home_page[data.section].length
    switch data.section
      when 'carousel'
        switch data.direction
          when 'left' then moveWithin _data.user.home_page.carousel, index, -1
          when 'right' then moveWithin _data.user.home_page.carousel, index, 1
          when 'down' then moveBetween _data.user.home_page.carousel, index, _data.user.home_page.arranged, 0
      when 'arranged'
        switch data.direction
          when 'up'
            if index is 0 then moveBetween _data.user.home_page.arranged, index, _data.user.home_page.carousel, 0
            moveWithin _data.user.home_page.arranged, index, -1
          when 'down' then moveWithin _data.user.home_page.arranged, index, 1
    _updateUser({ id: _data.user.id, home_page: _data.user.home_page }, true )

  $rootScope.$on 'hide:homepage:collection', (e, data) ->
    # data = { section: string, collection: obj }
    return unless _data?.user?.home_page and data.section and data.collection
    index = _data.user.home_page[data.section].indexOf data.collection
    moveBetween _data.user.home_page[data.section], index, _data.user.home_page.hidden, 0
    _updateUser({ id: _data.user.id, home_page: _data.user.home_page }, true )

  $rootScope.$on 'show:homepage:collection', (e, data) ->
    # data = { collection: obj }
    return unless _data?.user?.home_page and data.collection
    index = _data.user.home_page.hidden.indexOf data.collection
    return if index < 0
    moveBetween _data.user.home_page.hidden, index, _data.user.home_page.arranged, _data.user.home_page.arranged.length
    _updateUser({ id: _data.user.id, home_page: _data.user.home_page }, true )


  ## EXPORTS
  data: _data
  fns:
    defineUser: _defineUser
    updateUser: _updateUser
    setAboutImage: _setAboutImage
