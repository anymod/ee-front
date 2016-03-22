'use strict'

angular.module('builder.collections').controller 'collectionCtrl', ($scope, $state, $stateParams, eeDefiner, eeCollection, eeCollections, eeProducts) ->

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
      collection.preview = { id: collection.id }
      eeCollections.fns.readPublicCollection collection.preview
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
    console.log 'updatePreview', collection.preview, collection.preview.page
    eeCollections.fns.readPublicCollection collection.preview, collection.preview.page

  $scope.$on 'search:started', () -> $state.go 'collectionadd', { id: collection.id }

  return
