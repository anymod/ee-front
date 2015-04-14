'use strict'

angular.module('builder.auth').controller 'logoutCtrl', ($state, eeAuth, eeStorefront, eeCatalog, eeSelection, eeOrders) ->
  eeAuth.fns.reset()
  ## TODO re-implement reset functions (or equivalent)
  # eeStorefront.reset()
  # eeCatalog.reset()
  # eeSelection.reset()
  # eeOrders.reset()
  return
