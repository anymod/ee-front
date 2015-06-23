'use strict'

angular.module('builder.selections').controller 'selectionsCtrl', ($state, $stateParams, eeSelections, eeDefiner, eeStorefront) ->

  this.ee = eeDefiner.exports

  this.data = eeSelections.data
  this.fns  = eeSelections.fns

  if this.data.stale or !this.data.selections or this.data.selections.length < 1 then eeSelections.fns.search()

  return
