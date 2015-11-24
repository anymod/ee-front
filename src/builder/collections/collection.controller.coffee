'use strict'

angular.module('builder.collections').controller 'collectionCtrl', ($state, $stateParams, eeDefiner, eeCollection, eeCollections) ->

  collection = this

  collection.ee     = eeDefiner.exports
  collection.data   = eeCollection.data
  collection.fns    = eeCollection.fns
  
  collection.id     = $stateParams.id
  collection.state  = $state.current.name
  if !collection.id then $state.go 'collections'

  eeCollection.fns.search(collection.id).catch (err) ->
    console.log 'err', err
    $state.go 'collections'
  eeCollections.fns.defineNavCollections()

  collection.update = () -> eeCollection.fns.update collection.data.collection

  return
