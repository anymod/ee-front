'use strict'

angular.module('builder.edit').controller 'editCtrl', ($scope, $state, eeDefiner, eeCategorizations) ->

  edit = this

  edit.ee = eeDefiner.exports
  edit.categoryFns = eeCategorizations.fns

  switch $state.current.name
    when 'editcategories' then eeCategorizations.fns.getCategorizations()

  $scope.$on 'canvas:save:started', ()  -> edit.saving = true
  $scope.$on 'canvas:save:finished', () -> edit.saving = false

  return
