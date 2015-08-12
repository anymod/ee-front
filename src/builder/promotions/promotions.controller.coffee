'use strict'

angular.module('builder.promotions').controller 'promotionsCtrl', (eeDefiner, eeLanding) ->

  promotions = this

  promotions.ee           = eeDefiner.exports
  promotions.landingData  = eeLanding.data

  promotions.setCarouselImage = (imgUrl) -> eeDefiner.exports.carousel.imgUrl = imgUrl
  promotions.setAboutImage    = (imgUrl) -> eeDefiner.exports.about.imgUrl = imgUrl

  return
