'use strict'

angular.module('builder.selections').controller 'selectionsCtrl', ($state, $stateParams, eeSelections, eeDefiner) ->

  this.ee = eeDefiner.exports

  this.data = eeSelections.data
  this.fns  = eeSelections.fns

  eeSelections.fns.search()

  return
