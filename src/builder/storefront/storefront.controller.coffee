'use strict'

angular.module('builder.storefront').controller 'storefrontCtrl', ($state, eeDefiner, eeUser, eeCollection, eeCollections) ->

  storefront = this

  storefront.ee       = eeDefiner.exports
  storefront.state    = $state.current.name

  # TODO populate user, storeProducts, collections, etc
  eeUser.fns.defineUser()
  .then () ->
    return unless storefront.ee?.User?.user?.storefront_meta?
    storefront.ee.meta      = storefront.ee.User.user.storefront_meta
    storefront.ee.carousel  = storefront.ee.User.user.storefront_meta.home.carousel[0]

  eeCollections.fns.defineOwnCollections()

  return
