'use strict'

angular.module('builder.homepage').controller 'homepageCtrl', ($state, eeDefiner, eeUser, eeCollections, eeModal) ->

  homepage = this

  eeUser.fns.defineUser true

  homepage.ee    = eeDefiner.exports
  homepage.fns   = eeCollections.fns
  homepage.modalFns = eeModal.fns
  homepage.state = $state.current.name

  # eeCollections.fns.resetCollections()
  # eeCategorizations.fns.getCategorizations()

  # eeCollections.fns.search()

  # homepage.create = () ->
  #   eeCollections.fns.createCollection()
  #   .then (res) -> $state.go 'homepage', id: res.collection.id
  #
  # homepage.update = () -> eeCollections.fns.update()

  # $scope.$on 'update:carousel', (e, carousel) ->
  #   homepage.hideCarousel = true
  #   homepage.ee?.User?.user?.home_carousel = carousel
  #   restore = () ->
  #     homepage.hideCarousel = false
  #     $scope.$apply()
  #     console.log 'restored', carousel
  #   $timeout restore, 100


  return
