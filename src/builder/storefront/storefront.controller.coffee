'use strict'

angular.module('builder.storefront').controller 'storefrontCtrl', ($scope, user, eeAuth, eeStorefront) ->

  ## Setup
  this.user               = user
  this.product_selection  = eeStorefront.storefront.product_selection
  this.authStatus         = eeAuth.status

  ## For shared views (carousel, products, about, footer)
  this.meta             = user.storefront_meta
  this.carousel         = user.storefront_meta?.home?.carousel[0]
  this.about            = user.storefront_meta?.about
  this.categories       = eeStorefront.data.categories

  return
