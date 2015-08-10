'use strict'

angular.module('builder.collections').controller 'collectionViewCtrl', ($state, $stateParams, eeDefiner, eeCollection) ->

  collectionView = this

  collectionView.data   = eeCollection.data
  collectionView.id     = $stateParams.id
  collectionView.state  = $state.current.name
  if !collectionView.id then $state.go 'collections'

  eeCollection.fns.defineCollection collectionView.id

  # TODO show products along with collection
  # eeProducts.fns.clear()
  # eeProducts.fns.defineForCollection collection_id

  return
