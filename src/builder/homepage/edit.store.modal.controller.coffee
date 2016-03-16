'use strict'

angular.module('builder.homepage').controller 'editStoreModalCtrl', (eeDefiner, eeCategorizations, data) ->

  modal = this

  modal.ee = eeDefiner.exports
  modal.data = data
  modal.categoryFns = eeCategorizations.fns

  return
