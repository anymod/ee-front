'use strict'

angular.module('builder.landing').controller 'landingCtrl', ($state, eeDefiner, eeAuth, eeModal, eeLanding, eeStorefront) ->

  that = this

  this.ee = eeDefiner.exports

  this.show     = eeLanding.show
  this.data     = eeLanding.data
  this.fns      = eeLanding.fns
  this.authFns  = eeAuth.fns
  this.modalFns = eeModal.fns

  this.save = () -> eeModal.fns.openSignupModal()

  this.setTheme = (theme) ->
    eeStorefront.fns.setTheme that.ee.meta, theme
    $state.go 'try-storefront'

  eeLanding.fns.showState $state.current.name

  return
