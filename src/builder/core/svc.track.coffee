'use strict'

angular.module('app.core').factory 'eeTrack', (eeAuth, eeBack) ->

  ## SETUP
  # none

  ## PRIVATE EXPORT DEFAULTS
  _data =
    reading: false

  ## PRIVATE FUNCTIONS
  _get = (id) ->
    _data.reading = true
    eeBack.fns.trackGET parseInt(id), eeAuth.fns.getToken()
    .then (track) -> track
    .catch (err) -> console.log err
    .finally () -> _data.reading = false

  ## EXPORTS
  data: _data
  fns:
    get: _get
