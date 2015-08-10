'use strict'

angular.module('builder.promote').controller 'promoteCtrl', (eeDefiner, eeLanding) ->

  promote = this

  promote.ee           = eeDefiner.exports
  promote.landingData  = eeLanding.data

  promote.setCarouselImage = (imgUrl) -> eeDefiner.exports.carousel.imgUrl = imgUrl
  promote.setAboutImage    = (imgUrl) -> eeDefiner.exports.about.imgUrl = imgUrl

  return
