'use strict'

angular.module('builder.account').controller 'accountCtrl', (eeDefiner) ->

  account = this

  account.ee = eeDefiner.exports

  return
