'use strict'

angular.module('app.core').factory 'eeStorefront', ($cookies, $q, eeBack, eeAuth) ->

  getStorefront: () ->
    deferred = $q.defer()
    user = eeAuth.getUser()
    console.log 'user', user
    if !user or !user.username then return deferred.reject 'Missing username'
    console.log 'username is ', user.username
    eeBack.storefrontGET(user.username)
    .then (data) -> deferred.resolve data
    .catch (err) -> deferred.reject err
    deferred.promise
