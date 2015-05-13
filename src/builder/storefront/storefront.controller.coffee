'use strict'

angular.module('builder.storefront').controller 'storefrontCtrl', (eeDefiner, eeModal) ->

  ## Setup
  #  For shared views (carousel, products, about, footer)
  this.ee = eeDefiner.exports
  this.modalFns = eeModal.fns

  return
