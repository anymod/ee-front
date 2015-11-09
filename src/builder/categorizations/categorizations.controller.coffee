'use strict'

angular.module('builder.categorizations').controller 'categorizationsCtrl', (eeDefiner, eeUser, eeCategorizations) ->

  categorizations = this

  categorizations.ee  = eeDefiner.exports
  categorizations.fns = eeCategorizations.fns

  eeCategorizations.fns.getCategorizations()
  eeUser.fns.defineUser true

  return
