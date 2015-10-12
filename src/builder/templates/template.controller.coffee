'use strict'

angular.module('builder.templates').controller 'templateCtrl', ($state, $stateParams, eeTemplate, eeTemplates) ->

  template = this

  template.id           = $stateParams.id
  template.data         = eeTemplate.data
  template.templatesFns = eeTemplates.fns
  if !template.id then $state.go 'templates'

  eeTemplate.fns.setTemplate template.id

  return
