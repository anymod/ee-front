'use strict'

angular.module('builder.create').controller 'createCtrl', ($state, eeDefiner, eeCatalog) ->

  that = this
  this.ee   = eeDefiner.exports
  this.data = eeCatalog.data

  eeCatalog.fns.setCategory 'Furniture'
  eeCatalog.fns.search()

  return
