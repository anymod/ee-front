'use strict'

angular.module('builder.collections').controller 'collectionsCtrl', ($scope, $state, eeDefiner, eeCollections, eeProducts) ->

  collections = this

  collections.ee    = eeDefiner.exports
  collections.fns   = eeCollections.fns
  collections.productsFns = eeProducts.fns
  collections.state = $state.current.name

  # eeCollections.fns.resetCollections()
  # if $state.current.name is 'collections'     then eeCollections.fns.search()
  switch $state.current.name
   when 'collectionsAdd' then eeCollections.fns.searchPublic()
   when 'collectionsNew'
     collections.product_ids = []
     $scope.$on 'added:product', (e, data) -> collections.product_ids.push data.product.id
     $scope.$on 'removed:product', (e, data) ->
       index = collections.product_ids.indexOf data.product.id
       if index > -1 then collections.product_ids.splice(index, 1)
     eeProducts.fns.runSection 'search'

  collections.create = () ->
    if collections.product_ids?.length > 0
      eeCollections.fns.createCollection { product_ids: collections.product_ids }
      .then (res) -> $state.go 'collectionimage', id: res.collection.id

  # collections.update = () -> eeCollections.fns.update()

  return
