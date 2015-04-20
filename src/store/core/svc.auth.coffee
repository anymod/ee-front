'use strict'

angular.module('store.core').factory 'eeAuth', ($location, $q) ->

  fns:
    getUsername: () ->
      deferred  = $q.defer()
      host      = $location.host()
      username  = host.split('.')[0]
      if !!host and host.indexOf('eeosk') < 0 and host.indexOf('localhost') < 0
        # non-eeosk url
        # eeBack.usernameFromNonEeoskUrl(host)
        # .then (username) -> deferred.resolve username
        # .catch () -> deferred.reject 'No username found in URL'
        deferred.resolve 'demoseller'
      else if username isnt 'eeosk' and username isnt 'localhost'
        # eeosk url with username
        deferred.resolve 'demoseller' # username
      else
        deferred.reject 'No username found in URL'
      deferred.promise
