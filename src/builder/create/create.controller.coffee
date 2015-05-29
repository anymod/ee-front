'use strict'

angular.module('builder.create').controller 'createCtrl', ($state, eeDefiner, eeCatalog) ->

  that = this
  this.ee   = eeDefiner.exports
  this.data = eeCatalog.data

  this.btnText = 'Finished'

  eeCatalog.fns.setCategory 'Furniture'
  eeCatalog.fns.search()

  return
