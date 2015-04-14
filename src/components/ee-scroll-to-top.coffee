'use strict'

angular.module('ee-scroller').directive "eeScrollToTop", ($location, $anchorScroll) ->
  scope: {}
  link: (scope, ele, attrs) ->
    ele.on 'click', () ->
      $location.hash (attrs.target || 'body-top')
      $anchorScroll()
      # Remove hash in url
      $location.url $location.path()
    return
