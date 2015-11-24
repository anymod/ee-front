'use strict'

angular.module('builder.edit').controller 'editCtrl', (eeDefiner, eeUser, eeLanding) ->

  edit = this

  edit.ee           = eeDefiner.exports
  edit.landingData  = eeLanding.data

  edit.setAboutImage    = (imgUrl) -> eeUser.fns.setAboutImage imgUrl

  return
