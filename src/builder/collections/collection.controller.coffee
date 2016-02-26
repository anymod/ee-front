'use strict'

angular.module('builder.collections').controller 'collectionCtrl', ($scope, $state, $stateParams, eeDefiner, eeCollection, eeCollections, eeProducts) ->

  collection = this

  collection.ee     = eeDefiner.exports
  collection.data   = eeCollection.data
  collection.fns    = eeCollection.fns
  collection.productsFns = eeProducts.fns
  collection.id     = $stateParams.id
  collection.state  = $state.current.name
  collection.tab    = 'canvas'
  collection.editImage = false

  if !collection.id then $state.go 'collections'
  eeCollection.fns.search collection.id, true
  .catch (err) -> $state.go 'collections'

  collection.showCanvas = () ->
    collection.tab = 'canvas'

  collection.showIn = () ->
    collection.tab = 'in'
    eeCollection.fns.search collection.id
    .catch (err) -> $state.go 'collections'
  # collection.showIn()

  collection.showAdd = () ->
    collection.tab = 'add'
    eeProducts.fns.runSection 'search'
    .catch (err) -> $state.go 'collections'

  collection.save = () ->
    collection.fns.updateCollection()
    .then () -> collection.editImage = false

  collection.update = () -> eeCollection.fns.update collection.id

  $scope.$on 'search:started', () -> collection.tab = 'add'

  return
