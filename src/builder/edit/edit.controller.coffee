'use strict'

angular.module('builder.edit').controller 'editCtrl', ($scope, $state, user, eeAuth, eeModal, eeLanding, eeStorefront) ->

  this.user = user
  that      = this

  this.categories = eeStorefront.data.categories
  this.meta       = this.user.storefront_meta

  this.show       = eeLanding.show
  this.data       = eeLanding.data
  this.fns        = eeLanding.fns
  this.authStatus = eeAuth.status

  this.product_selection  = eeStorefront.product_selection

  this.setCarouselImage   = (imgUrl) ->
    eeStorefront.fns.setCarouselImage that.user, imgUrl
    eeLanding.fns.showCarouselImage imgUrl

  this.setAboutImage   = (imgUrl) ->
    eeStorefront.fns.setAboutImage that.user, imgUrl

  this.save = () -> eeModal.fns.openSignupModal()

  this.setTheme = (theme) ->
    eeStorefront.fns.setTheme that.user, theme
    $state.go 'edit'

  this.hidePopover = () ->
    eeLanding.fns.hidePopover 'editPopover'

  eeLanding.fns.showState $state.current.name

  return
