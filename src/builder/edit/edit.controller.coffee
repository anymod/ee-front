'use strict'

angular.module('builder.edit').controller 'editCtrl', ($state, eeDefiner, eeCategorizations) ->

  edit = this

  edit.ee = eeDefiner.exports
  edit.categoryFns = eeCategorizations.fns

  switch $state.current.name
    when 'editcategories' then eeCategorizations.fns.getCategorizations()

  return
