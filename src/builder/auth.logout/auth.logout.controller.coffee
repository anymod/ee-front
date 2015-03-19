'use strict'

angular.module('builder.auth').controller 'logoutCtrl', ($state, eeAuth, eeStorefront, eeCatalog, eeSelection, eeOrders) ->
  eeAuth.reset()
  eeStorefront.reset()
  eeCatalog.reset()
  eeSelection.reset()
  eeOrders.reset()
  # $state.go 'landing'
  return
