'use strict'

angular.module('builder.auth').controller 'logoutCtrl', ($state, eeAuth) ->
  ## TODO re-implement reset functions (or equivalent)
  # eeCatalog.reset()
  # eeSelection.reset()
  # eeOrders.reset()
  eeAuth.fns.logout()
  return
