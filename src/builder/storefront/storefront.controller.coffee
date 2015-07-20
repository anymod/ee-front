'use strict'

angular.module('builder.storefront').controller 'storefrontCtrl', ($state, eeDefiner, eeStorefront, eeModal) ->

  storefront = this

  storefront.ee       = eeDefiner.exports
  storefront.data     = eeStorefront.data
  storefront.state    = $state.current.name
  storefront.modalFns = eeModal.fns

  eeStorefront.fns.defineStorefrontFromToken $state.params.title

  return
