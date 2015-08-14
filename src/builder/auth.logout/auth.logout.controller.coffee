'use strict'

angular.module('builder.auth').controller 'logoutCtrl', ($state, eeAuth) ->
  ## TODO re-implement reset functions (or equivalent)
  # eeProducts.reset()
  # eeOrders.reset()
  eeAuth.fns.logout()
  return
