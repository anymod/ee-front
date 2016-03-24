'use strict'

angular.module('builder.homepage').controller 'editCollectionModalCtrl', ($scope, eeDefiner, eeCollection, eeProducts, data) ->

  modal = this
  modal.ee = eeDefiner.exports
  modal.data = data
  modal.collectionData = eeCollection.data

  if data.type is 'image'
    eeCollection.fns.search modal.data.collection.id, true

  if data.type is 'products'
    modal.productsFns = eeProducts.fns

    modal.showAdd = () ->
      modal.tab = 'add'
      eeProducts.fns.runSection 'search'

    modal.showIn = () ->
      modal.tab = 'in'
      eeCollection.fns.search modal.data.collection.id, true

    modal.showIn()

    $scope.$on 'search:started', () -> modal.tab = 'add'

  return
