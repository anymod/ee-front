'use strict'

angular.module('builder.collections').controller 'collectionCtrl', ($state, $stateParams, eeDefiner, eeCollection, eeProducts) ->

  collection = this

  collection.ee     = eeDefiner.exports
  collection.data   = eeCollection.data
  collection.fns    = eeCollection.fns
  collection.id     = $stateParams.id
  collection.state  = $state.current.name
  collection.in     = true
  collection.editImage = false

  if !collection.id then $state.go 'collections'

  eeCollection.fns.search collection.id
  .catch (err) -> $state.go 'collections'

  eeProducts.fns.runSection 'search'

  collection.save = () ->
    collection.fns.updateCollection()
    .then () -> collection.editImage = false

  collection.update = () -> eeCollection.fns.update collection.id

  return
