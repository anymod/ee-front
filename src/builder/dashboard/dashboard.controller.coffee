'use strict'

angular.module('builder.dashboard').controller 'dashboardCtrl', ($state, eeDefiner, eeUser, eeCollection, eeCollections, eeProducts, eeModal) ->

  dashboard = this

  dashboard.ee    = eeDefiner.exports
  dashboard.state = $state.current.name
  # dashboard.openCollectionsModal = () -> eeModal.fns.openCollectionsModal(eeCollections.data.nav.alphabetical)
  # dashboard.productsUpdate = () -> eeProducts.fns.runSection('search')

  # dashboard.paginate = () ->
    # $state.go 'products'
    # eeProducts.fns.runSection 'search'

  eeCollections.fns.defineNavCollections()
  # eeProducts.fns.featured()
  # eeProducts.fns.runSection 'search'

  return
