'use strict'

angular.module('builder.homepage').controller 'editCollectionImageModalCtrl', (eeDefiner, data) ->

  modal = this
  modal.ee = eeDefiner.exports
  modal.data = data

  return
