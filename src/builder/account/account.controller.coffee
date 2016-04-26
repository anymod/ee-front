'use strict'

angular.module('builder.account').controller 'accountCtrl', ($window, eeDefiner, eeUser,  defaultMargins) ->

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

  body = angular.element $window.document.body

  account.copyToClipboard = (toCopy) ->
    account.copiedToClipboard = false
    temp = angular.element '<input>'
    body.append temp
    temp.val toCopy
    temp[0].select()
    try
      successful = document.execCommand('copy')
      if !successful then throw successful
      account.copiedToClipboard = true
    catch err
      window.prompt 'Copy to clipboard: Ctrl+C or Command+C', toCopy
    temp.remove()
    return

  account.openEmail = (refUrl, storeUrl) ->
    subject = 'Selling with eeosk'
    body = "Hi!\n\nI've created my own online business selling home furnishings and I thought you might be interested in starting your own home decor business too." +
    "\n\nHere’s a referral link to get started: " + refUrl +
    "\nYou can check out my eeosk store here: " + storeUrl +
    "\n\nI love my eeosk store because I can make my own hours and work from home. They give me the tools to create and market my store for free, and they handle all product shipping and returns. I think you’ll like it, too!"
    mailto = 'mailto:?Subject=' + encodeURI(subject) + '&body=' + encodeURI(body).replace(/\&/g, '%26')
    $window.open mailto, '_blank'
    return

  return
