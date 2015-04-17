'use strict'

angular.module('builder.landing').controller 'landingCtrl', ($scope, $state, eeAuth, eeLanding, eeStorefront) ->

  this.user = eeAuth.fns.landingUser()

  this.storefront = eeStorefront.storefront
  this.storefront.storefront_meta = this.user.storefront_meta

  this.show = eeLanding.show
  this.data = eeLanding.data
  this.fns  = eeLanding.fns
  this.authFns = eeAuth.fns

  this.product_selection  = eeStorefront.product_selection
  this.setCarouselImage   = (imgUrl) ->
    eeStorefront.fns.setCarouselImage this.user, imgUrl
    eeLanding.fns.showCarouselImage imgUrl
  this.save = () -> eeAuth.fns.openSignupModal()

  this.setTheme = (theme) ->
    eeStorefront.fns.setTheme eeAuth.fns.landingUser(), theme
    $state.go 'try-edit'

  eeLanding.fns.showState $state.current.name

  return
