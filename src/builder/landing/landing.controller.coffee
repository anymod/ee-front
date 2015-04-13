'use strict'

angular.module('builder.landing').controller 'landingCtrl', ($scope, $state, $modal, eeLanding) ->

  this.user               = eeLanding.user
  this.show               = eeLanding.show
  this.defaultImages      = eeLanding.defaultImages
  this.product_selection  = eeLanding.product_selection
  this.fns                = eeLanding.fns

  that = this
  $scope.$watch (() -> that.user?.storefront_meta?.home?.name), (newVal, oldVal) ->
    if newVal?.length > 3 and that.show.popover?.title then eeLanding.fns.finishEditorTimeout()

  eeLanding.fns.showState $state.current.name

  # $modal.open({
  #   templateUrl: 'builder/auth.signup/auth.signup.modal.html'
  #   backdropClass: 'white-background opacity-08'
  # })

  return
