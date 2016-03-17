'use strict'

angular.module('builder.homepage').controller 'homepageCtrl', ($state, $scope, $timeout, eeDefiner, eeCollections, eeModal, eeCategorizations) ->

  homepage = this

  homepage.ee    = eeDefiner.exports
  homepage.fns   = eeCollections.fns
  homepage.modalFns = eeModal.fns
  homepage.state = $state.current.name
  homepage.hideCarousel = false

  eeCollections.fns.resetCollections()
  eeCategorizations.fns.getCategorizations()

  if $state.current.name is 'homepage' then eeCollections.fns.search()

  # homepage.create = () ->
  #   eeCollections.fns.createCollection()
  #   .then (res) -> $state.go 'homepage', id: res.collection.id
  #
  # homepage.update = () -> eeCollections.fns.update()

  $scope.$on 'update:carousel', (e, carousel) ->
    homepage.hideCarousel = true
    homepage.ee?.User?.user?.home_page?.carousel = carousel
    restore = () ->
      homepage.hideCarousel = false
      $scope.$apply()
      console.log 'restored', carousel
    $timeout restore, 100


  return
