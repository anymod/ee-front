'use strict'

angular.module('builder.landing').controller 'landingCtrl', ($scope, eeLanding) ->

  $scope.user           = eeLanding.user
  $scope.show           = eeLanding.show
  $scope.defaultImages  = eeLanding.defaultImages
  $scope.fns            = eeLanding.fns

  $scope.$watch 'user.storefront_meta.home.name', (newVal, oldVal) ->
    if newVal?.length > 3 and $scope.show.popover?.title then eeLanding.fns.finishEditorTimeout()

  return
