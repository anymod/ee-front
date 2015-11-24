'use strict'

angular.module('builder.storefront').controller 'storefrontCtrl', ($state, eeDefiner, eeCollection, eeCollections, eeProducts, eeModal) ->

  storefront = this

  storefront.ee       = eeDefiner.exports
  storefront.state    = $state.current.name
  storefront.openCollectionsModal = () -> eeModal.fns.openCollectionsModal(eeCollections.data.nav.alphabetical)
  storefront.productsUpdate  = () -> eeProducts.fns.runSection('search')

  eeCollections.fns.defineNavCollections()
  eeProducts.fns.featured()

  return
