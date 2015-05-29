'use strict'

angular.module('builder.create').controller 'createCtrl', ($state, eeDefiner, eeCatalog) ->

  that = this
  this.ee   = eeDefiner.exports
  this.data = eeCatalog.data

  eeCatalog.fns.setCategory 'Home Decor'
  eeCatalog.fns.search()

  return
