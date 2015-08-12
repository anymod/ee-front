'use strict'

angular.module('builder.edit').controller 'editCtrl', (eeDefiner, eeUser, eeLanding) ->

  edit = this

  edit.ee           = eeDefiner.exports
  edit.landingData  = eeLanding.data

  edit.setCarouselImage = (imgUrl) -> eeUser.fns.setCarouselImage imgUrl
  edit.setAboutImage    = (imgUrl) -> eeUser.fns.setAboutImage imgUrl

  return
