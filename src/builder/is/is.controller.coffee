'use strict'

angular.module('builder.is').controller 'isCtrl', ($state) ->

  that = this
  states = [
    'your-own-business'
    'easy-to-use'
    'beautiful-and-customizable'
    'everything-you-need'
  ]
  length = states.length

  increment = (n) ->
    i = states.indexOf $state.current.name
    next = (i + n) % length
    if next < 0 then next = length - 1
    $state.go states[next]
    return

  this.next = () -> increment 1
  this.previous = () -> increment -1

  return
