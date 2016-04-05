'use strict'

angular.module('builder.brand').controller 'brandCtrl', (eeDefiner, eeTrack) ->

  brand = this

  brand.ee = eeDefiner.exports
  brand.data = eeTrack.data

  eeTrack.fns.get 10
  .then (tr) -> brand.data.track = tr

  return
