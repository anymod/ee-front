'use strict'

angular.module('builder.landing').controller 'landingCtrl', ($scope, $state, eeAuth, eeLanding, eeStorefront) ->

  this.user = eeAuth.fns.landingUser()

  this.storefront = eeStorefront.storefront
  this.storefront.storefront_meta = this.user.storefront_meta

  this.show = eeLanding.show
  this.data = eeLanding.data
  this.fns  = eeLanding.fns

  this.product_selection  = eeStorefront.product_selection
  this.setCarouselImage   = (imgUrl) ->
    eeStorefront.fns.setCarouselImage this.user, imgUrl
    eeLanding.fns.showCarouselImage imgUrl
  this.save = () -> eeAuth.fns.openSignupModal()

  that = this
  $scope.$watch (() -> that.user?.storefront_meta?.home?.name), (newVal, oldVal) ->
    if newVal?.length > 3 and that.show.popover?.title then eeLanding.fns.finishEditorTimeout()

  eeLanding.fns.showState $state.current.name

  return
