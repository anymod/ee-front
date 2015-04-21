'use strict'

angular.module('builder.edit').controller 'editCtrl', ($state, eeDefiner, eeModal, eeLanding, eeStorefront) ->

  this.ee = eeDefiner.exports
  that = this

  this.show       = eeLanding.show
  this.data       = eeLanding.data
  this.fns        = eeLanding.fns

  this.setCarouselImage = (imgUrl) -> eeDefiner.exports.carousel.imgUrl = imgUrl
  this.setAboutImage    = (imgUrl) -> eeDefiner.exports.about.imgUrl = imgUrl

  this.save = () -> eeModal.fns.openSignupModal()

  this.setTheme = (theme) ->
    eeStorefront.fns.setTheme that.meta, theme
    $state.go 'edit'

  this.hidePopover = () ->
    eeLanding.fns.hidePopover 'editPopover'

  eeLanding.fns.showState $state.current.name

  return
