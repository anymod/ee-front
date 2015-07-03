'use strict'

angular.module('builder.edit').controller 'editCtrl', (eeDefiner, eeLanding, eeStorefront) ->

  edit = this

  edit.ee           = eeDefiner.exports
  edit.data         = eeStorefront.data
  edit.landingData  = eeLanding.data

  edit.setCarouselImage = (imgUrl) -> eeDefiner.exports.carousel.imgUrl = imgUrl
  edit.setAboutImage    = (imgUrl) -> eeDefiner.exports.about.imgUrl = imgUrl

  return
