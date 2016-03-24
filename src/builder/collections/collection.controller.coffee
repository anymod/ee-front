'use strict'

angular.module('builder.collections').controller 'collectionCtrl', ($window, $scope, $state, $stateParams, eeDefiner, eeCollection, eeCollections, eeProducts) ->

  collection = this

  collection.ee     = eeDefiner.exports
  collection.data   = eeCollection.data
  collection.fns    = eeCollection.fns
  collection.productsFns = eeProducts.fns
  collection.id     = parseInt($stateParams.id)
  collection.state  = $state.current.name
  # collection.tab    = 'canvas'
  # collection.editImage = false

  if !collection.id then $state.go 'homepage'

  switch $state.current.name
    when 'collectionadd' then eeProducts.fns.runSection 'search'
    when 'collectionpreview'
      collection.preview =
        collection: { id: collection.id }
      eeCollections.fns.readPublicCollection collection.preview.collection
    else
      eeCollection.fns.search collection.id, true
      .catch (err) -> $state.go 'homepage'

  # collection.showCanvas = () ->
  #   collection.tab = 'canvas'
  #
  # collection.showIn = () ->
  #   collection.tab = 'in'
  #   eeCollection.fns.search collection.id
  #   .catch (err) -> $state.go 'collections'
  #
  # collection.showAdd = () ->
  #   collection.tab = 'add'
  #   eeProducts.fns.runSection 'search'
  #   .catch (err) -> $state.go 'collections'

  collection.save = () ->
    collection.fns.updateCollection()
    .then () -> collection.editImage = false

  collection.update = () -> eeCollection.fns.update collection.id
  collection.updatePreview = () ->
    eeCollections.fns.readPublicCollection collection.preview, collection.preview.page

  $scope.$on 'search:started', () -> $state.go 'collectionadd', { id: collection.id }

  # Preview functions
  collection.back = () -> $window.history.back()
  collection.add = () ->
    collection.preview.cloned = true
    eeCollections.fns.cloneCollection collection.preview.collection
    .then (data) ->
      collection.preview.collection[key] = data.collection[key] for key in Object.keys(data.collection)
      collection.preview.cloned = true
  collection.remove = () ->
    eeCollections.fns.destroyCollection collection.preview.collection
    .then () ->
      collection.preview = collection: { id: collection.id }
      eeCollections.fns.readPublicCollection collection.preview.collection
      # collection.preview.collection[key] = initialCollection[key] for key in Object.keys(collection.preview.collection)
      collection.preview.collection.removed = true



  return
