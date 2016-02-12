'use strict'

angular.module('builder.collections').controller 'collectionCtrl', ($scope, $state, $stateParams, eeDefiner, eeCollection, eeCollections, eeProducts) ->

  collection = this

  collection.ee     = eeDefiner.exports
  collection.data   = eeCollection.data
  collection.fns    = eeCollection.fns
  collection.productsFns = eeProducts.fns
  collection.id     = $stateParams.id
  collection.state  = $state.current.name
  collection.in     = true
  collection.editImage = false

  if !collection.id then $state.go 'collections'

  collection.showIn = () ->
    collection.in = true
    eeCollection.fns.search collection.id
    .catch (err) -> $state.go 'collections'
  collection.showIn()

  collection.showAdd = () ->
    collection.in = false
    eeProducts.fns.runSection 'search'
    .catch (err) -> $state.go 'collections'

  collection.save = () ->
    collection.fns.updateCollection()
    .then () -> collection.editImage = false

  collection.update = () -> eeCollection.fns.update collection.id

  $scope.$on 'search:started', () -> collection.in = false

  return
