'use strict'

angular.module('builder.tracks').controller 'trackCtrl', ($stateParams, eeDefiner, eeTrack) ->

  track = this

  track.id = parseInt $stateParams.id
  track.ee = eeDefiner.exports
  track.data = eeTrack.data

  eeTrack.fns.get $stateParams.id
  .then (tr) -> track.data.track = tr

  return
