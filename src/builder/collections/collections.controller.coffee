'use strict'

angular.module('builder.collections').controller 'collectionsCtrl', ($state, eeDefiner, eeCollections) ->

  collections = this

  collections.ee  = eeDefiner.exports

  eeCollections.fns.resetCollections()
  if $state.current.name is 'collectionsAdd'  then eeCollections.fns.definePublicCollections true
  if $state.current.name is 'collections'     then eeCollections.fns.defineOwnCollections true

  return
