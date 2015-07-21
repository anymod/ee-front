'use strict'

angular.module('builder.collections').controller 'collectionsCtrl', (eeCollections) ->

  collections = this

  collections.data = eeCollections.data

  return
