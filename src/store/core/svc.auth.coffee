'use strict'

angular.module('store.core').factory 'eeAuth', ($location, $q) ->

  getUsername: () ->
    deferred = $q.defer()
    username = $location.host().split('.')[0]
    if username isnt 'eeosk' and username isnt 'localhost'
      deferred.resolve username # demoseller
    else
      deferred.reject 'No username found in URL'
    deferred.promise
