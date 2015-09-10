'use strict'

angular.module('builder.auth').controller 'logoutCtrl', (eeAuth) ->
  
  if eeAuth.fns.hasToken() then eeAuth.fns.logout() else eeAuth.fns.reset()

  return
