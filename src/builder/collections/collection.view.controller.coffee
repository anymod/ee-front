'use strict'

angular.module('builder.collections').controller 'collectionViewCtrl', ($state, $stateParamss) ->

  collection_id = $stateParams.id
  if !collection_id then $state.go 'collections'

  return
