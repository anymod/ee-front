angular.module('app.core').factory 'eeEnvSvc', ($location) ->
  envFromHost: ->
    if !!$location.host() and $location.host().indexOf('eeosk') > -1 then 'production' else 'development'
