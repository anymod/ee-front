'use strict'

angular.module('builder.selections').controller 'selectionViewCtrl', ($state, $stateParams, eeSelection, eeProduct) ->

  selection_id = $stateParams.id
  if !selection_id then $state.go 'selections'

  this.selectionData  = eeSelection.data
  this.productData    = eeProduct.data

  eeSelection.fns.setSelectionFromId selection_id

  this.delete = () ->
    eeSelection.fns.deleteSelection selection_id
    .then () -> $state.go 'selections'

  this.save = () ->
    eeSelection.fns.updateSelection eeSelection.data.selection
    .then () -> $state.go 'selections'

  return
