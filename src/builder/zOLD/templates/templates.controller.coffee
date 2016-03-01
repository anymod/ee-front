'use strict'

angular.module('builder.templates').controller 'templatesCtrl', (eeDefiner, eeTemplates, eeCollection, eeCollections) ->

  templates = this

  templates.ee = eeDefiner.exports

  templates.data           = eeTemplates.data
  templates.fns            = eeTemplates.fns
  templates.collectionsFns = eeCollections.fns

  if !templates.data.templates or templates.data.templates.length < 1 then eeTemplates.fns.search()

  eeCollections.fns.search()

  return
