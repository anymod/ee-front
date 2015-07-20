'use strict'

angular.module('builder.promote').controller 'promoteCtrl', (eeDefiner, eeLanding, eeStorefront) ->

  promote = this

  promote.ee           = eeDefiner.exports
  promote.data         = eeStorefront.data
  promote.landingData  = eeLanding.data

  promote.setCarouselImage = (imgUrl) -> eeDefiner.exports.carousel.imgUrl = imgUrl
  promote.setAboutImage    = (imgUrl) -> eeDefiner.exports.about.imgUrl = imgUrl

  return
