'use strict'

angular.module('builder.start').controller 'startCtrl', (eeDefiner, eeTrack) ->

  start = this

  start.ee = eeDefiner.exports
  start.data = {}

  eeTrack.fns.get 9
  .then (tr) -> start.data.track = tr

  return
