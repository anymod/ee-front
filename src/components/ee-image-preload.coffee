'use strict'

angular.module 'ee-image-preload', []

angular.module('ee-image-preload').directive "eeImagePreload", () ->
  scope:
    eeSrc: '='
  link: (scope, element) ->
    scope.$watch 'eeSrc', () -> element.addClass 'loading'
    element.bind 'load', () -> element.removeClass 'loading'
