'use strict'

angular.module('builder.homepage').controller 'editCollectionModalCtrl', (eeDefiner, data) ->

  modal = this
  modal.ee = eeDefiner.exports
  modal.data = data

  return
