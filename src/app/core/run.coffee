'use strict'

angular.module('app.core').run ($rootScope, $state, productsPerPage) ->

  $rootScope.productsPerPage = productsPerPage

  # binding this so $state.current.data.pageTitle & other $state data can be accessed
  $rootScope.$state = $state

  return
