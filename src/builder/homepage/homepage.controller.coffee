'use strict'

angular.module('builder.homepage').controller 'homepageCtrl', ($state, eeDefiner, eeCollections, eeModal) ->

  homepage = this

  homepage.ee    = eeDefiner.exports
  homepage.fns   = eeCollections.fns
  homepage.modalFns = eeModal.fns
  homepage.state = $state.current.name

  eeCollections.fns.resetCollections()
  if $state.current.name is 'homepage' then eeCollections.fns.search()

  homepage.create = () ->
    eeCollections.fns.createCollection()
    .then (res) -> $state.go 'homepage', id: res.collection.id

  homepage.update = () -> eeCollections.fns.update()

  return
