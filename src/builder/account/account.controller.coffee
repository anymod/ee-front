'use strict'

angular.module('builder.account').controller 'accountCtrl', (eeDefiner, eeUser) ->

  account = this

  account.ee = eeDefiner.exports

  eeUser.fns.defineUser()
  
  return
