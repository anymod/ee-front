'use strict'

angular.module('builder.playbook').controller 'playbookCtrl', (eeDefiner) ->

  playbook = this

  playbook.ee = eeDefiner.exports

  return
