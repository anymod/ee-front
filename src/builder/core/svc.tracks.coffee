'use strict'

angular.module('app.core').factory 'eeTracks', ($rootScope, $q, eeBack, eeAuth) ->

  ## SETUP
  _inputDefaults =
    perPage:      48
    page:         null

  ## PRIVATE EXPORT DEFAULTS
  _data =
    count:    null
    tracks:   []
    inputs:   angular.copy _inputDefaults
    reading:  false
    dailyActivity: null

  ## PRIVATE FUNCTIONS
  _clearSection = () ->
    _data.tracks = []
    _data.count = 0

  _formQuery = () ->
    query = {}
    query.size = _data.inputs.perPage
    if _data.inputs.search then query.search = _data.inputs.search
    query

  _runQuery = (queryPromise) ->
    if _data.reading then return
    _data.reading = true
    eeBack.fns.tracksGET(eeAuth.fns.getToken(), _formQuery())
    .then (res) ->
      { rows, count, took } = res
      _data.tracks  = rows
      _data.count   = count
      _data.took    = took
      _data.inputs.searchLabel = _data.inputs.search
    .catch (err) -> _data.count = null
    .finally () -> _data.reading = false

  _getDailyActivity = (force) ->
    if _data.dailyActivity then return _data.dailyActivity
    _data.reading = true
    eeBack.fns.dailyActivityGET eeAuth.fns.getToken()
    .then (activity) ->
      _data.dailyActivity = activity
      activity
    .catch (err) -> console.log err
    .finally () -> _data.reading = false

  ## MESSAGING
  # none

  ## EXPORTS
  data: _data
  fns:
    runQuery: _runQuery
    runSection: _runQuery
    getDailyActivity: _getDailyActivity
    # clearSearch: () -> _searchWithTerm ''
