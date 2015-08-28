'use strict'

angular.module('builder.collections').controller 'collectionCtrl', ($state, $stateParams, eeDefiner, eeUser, eeCollection, eeCollections) ->

  collection = this

  collection.ee     = eeDefiner.exports
  collection.data   = eeCollection.data
  collection.fns    = eeCollection.fns
  collection.id     = $stateParams.id
  collection.state  = $state.current.name
  if !collection.id then $state.go 'collectionsAdd'

  eeCollection.fns.search(collection.id).catch (err) ->
    console.log 'err', err
    $state.go 'collections'
  eeUser.fns.defineUser()
  eeCollections.fns.defineNavCollections()

  collection.update = () -> eeCollection.fns.update collection.id

  return
