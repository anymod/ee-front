'use strict'

angular.module('builder.collections').controller 'collectionCtrl', ($state, $stateParams, $scope, eeDefiner, eeUser, eeCollection, eeCollections) ->

  collection = this

  collection.ee     = eeDefiner.exports
  collection.data   = eeCollection.data
  collection.fns    = eeCollection.fns
  collection.id     = $stateParams.id
  collection.state  = $state.current.name
  if !collection.id then $state.go 'collectionsAdd'

  eeCollection.fns.defineCollection(collection.id).catch (err) -> $state.go 'collections'
  eeUser.fns.defineUser()
  eeCollections.fns.defineOwnCollections()

  # TODO show products along with collection
  # eeProducts.fns.clear()
  # eeProducts.fns.defineForCollection collection_id

  collection.update = () -> eeCollection.fns.defineCollection collection.id
  collection.delete = () -> eeCollection.fns.destroyCollection(collection.id).then () -> $state.go 'collections'

  return
