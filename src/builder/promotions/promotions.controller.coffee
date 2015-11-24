'use strict'

angular.module('builder.promotions').controller 'promotionsCtrl', (eeDefiner, eeLanding) ->

  promotions = this

  promotions.ee           = eeDefiner.exports
  promotions.landingData  = eeLanding.data

  promotions.setAboutImage    = (imgUrl) -> eeDefiner.exports.about.imgUrl = imgUrl

  return
