'use strict'

angular.module('builder.core').factory 'eeCategorizations', (eeBack, eeAuth, eeUser) ->

  ## SETUP
  _imports =
    User: eeUser.data

  ## PRIVATE EXPORT DEFAULTS
  _data =
    count:            null
    categorizations:  []
    reading:          false

  ## PRIVATE FUNCTIONS
  _getCategorizations = () ->
    if !!_data.reading then return
    _data.reading = true
    eeBack.fns.categorizationsGET eeAuth.fns.getToken()
    .then (res) ->
      { rows, count } = res
      _data.count = count
      _data.categorizations = rows
    .catch (err) -> _data.count = null
    .finally () -> _data.reading = false

  _categorizationIds = () ->
    ids = []
    ids.push n for n in _imports.User.user.categorization_ids
    ids

  _toggleCategory = (category) ->
    categorization_ids = _categorizationIds()
    index = categorization_ids.indexOf(category.id)
    if index > -1 then categorization_ids.splice(index, 1) else categorization_ids.push(category.id)
    _imports.User.user.categorization_ids = categorization_ids
    eeUser.fns.updateUser({ categorization_ids: categorization_ids })


  ## EXPORTS
  data: _data
  fns:
    getCategorizations: _getCategorizations
    toggleCategory:     _toggleCategory
