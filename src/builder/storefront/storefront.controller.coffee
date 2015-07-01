'use strict'

angular.module('builder.storefront').controller 'storefrontCtrl', ($state, eeDefiner, eeStorefront) ->

  this.ee     = eeDefiner.exports
  this.data   = eeStorefront.data
  this.state  = $state.current.name

  eeStorefront.fns.defineStorefrontFromToken $state.params.title

  return
