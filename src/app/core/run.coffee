'use strict'

angular.module('app.core').run ($rootScope, $location, $anchorScroll, $state, productsPerPage) ->

  $rootScope.productsPerPage = productsPerPage

  # binding this so $state.current.data.pageTitle & other $state data can be accessed
  $rootScope.$state = $state

  $rootScope.$on '$stateChangeSuccess', () ->
    $location.hash 'body-top'
    $anchorScroll()
    $location.url $location.path()

  return
