'use strict'

angular.module('builder.selections').controller 'selectionsCtrl', ($state, $stateParams, eeSelections, eeDefiner) ->

  this.ee = eeDefiner.exports

  this.data = eeSelections.data
  this.fns  = eeSelections.fns

  if !this.data.selections or this.data.selections.length < 1 then eeSelections.fns.search()

  return
