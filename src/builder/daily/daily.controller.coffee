'use strict'

angular.module('builder.daily').controller 'dailyCtrl', ($state, eeDefiner, eeUser, eeCollection, eeCollections, eeProducts, eeModal) ->

  daily = this

  daily.ee    = eeDefiner.exports
  daily.state = $state.current.name
  # daily.openCollectionsModal = () -> eeModal.fns.openCollectionsModal(eeCollections.data.nav.alphabetical)
  # daily.productsUpdate = () -> eeProducts.fns.runSection('search')

  # daily.paginate = () ->
    # $state.go 'products'
    # eeProducts.fns.runSection 'search'

  eeCollections.fns.defineNavCollections()
  # eeProducts.fns.featured()
  # eeProducts.fns.runSection 'search'

  return
