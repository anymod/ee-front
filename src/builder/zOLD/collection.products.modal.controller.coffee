'use strict'

angular.module('builder.collections').controller 'collectionProductsModalCtrl', (eeDefiner, eeCollections, collection) ->

  modal = this

  modal.ee              = eeDefiner.exports
  modal.collection      = collection
  modal.collectionsFns  = eeCollections.fns

  modal.reading = true
  eeCollections.fns.readPublicCollection modal.collection
  .then (products) -> modal.products = products
  .finally () -> modal.reading = false

  return
