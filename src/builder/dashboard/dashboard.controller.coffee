'use strict'

angular.module('builder.dashboard').controller 'dashboardCtrl', ($state, eeDefiner, eeUser, eeCollection, eeCollections, eeProducts, eeModal) ->

  dashboard = this

  dashboard.ee       = eeDefiner.exports
  dashboard.state    = $state.current.name
  dashboard.openCollectionsModal = () -> eeModal.fns.openCollectionsModal(eeCollections.data.nav.alphabetical)
  dashboard.productsUpdate  = () -> eeProducts.fns.runSection('search')

  eeUser.fns.defineUser()
  .then () ->
    return unless dashboard.ee?.User?.user?.dashboard_meta?
    dashboard.ee.meta      = dashboard.ee.User.user.dashboard_meta
    dashboard.ee.carousel  = dashboard.ee.User.user.dashboard_meta.home.carousel[0]

  eeCollections.fns.defineNavCollections()
  # eeProducts.fns.featured()
  eeProducts.fns.runSection 'search'

  return
