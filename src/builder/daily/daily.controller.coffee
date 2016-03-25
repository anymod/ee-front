'use strict'

angular.module('builder.daily').controller 'dailyCtrl', ($state, eeDefiner, eeCollections, eeTracks) ->

  daily = this

  daily.ee    = eeDefiner.exports
  daily.state = $state.current.name

  eeCollections.fns.defineNavCollections()
  eeTracks.fns.getDailyActivity()

  return
