'use strict'

angular.module('builder.account').controller 'accountCtrl', (eeDefiner, eeUser,  defaultMargins) ->

  account = this

  account.ee = eeDefiner.exports
  account.defaultMargins = defaultMargins

  account.updatePricing = () ->
    account.saving = true
    account.saved = false
    eeUser.fns.updateUser({ pricing: account.ee.User.user.pricing })
    .then () -> account.saved = true
    .catch () -> account.error = 'Problem saving'
    .finally () -> account.saving = false

  return
