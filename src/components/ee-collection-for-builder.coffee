'use strict'

module = angular.module 'ee-collection-for-builder', []

module.directive "eeCollectionForBuilder", ($state, eeCollections, eeModal) ->
  templateUrl: 'components/ee-collection-for-builder.html'
  restrict: 'E'
  scope:
    section: '@'
    collection: '='
    first: '='
    last: '='
    # modal: '@'
  link: (scope, ele, attrs) ->
    scope.collectionsFns = eeCollections.fns

    scope.openCollectionModalFor = (type) ->
      eeModal.fns.open 'edit_collection', { collection: scope.collection, type: type }

    scope.hide = () ->
      scope.$emit 'hide:homepage:collection', {
        section: scope.section
        collection: scope.collection
      }

    scope.show = () ->
      scope.$emit 'show:homepage:collection', { collection: scope.collection }

    scope.move = (direction) ->
      scope.$emit 'move:homepage:collection', {
        section: scope.section
        collection: scope.collection
        direction: direction
      }

    # scope.updateCollection = () ->
    #   eeCollections.fns.updateCollection scope.collection
    #   .then () -> $state.go 'collections'
    #
    # scope.toggleCarousel = () ->
    #   if scope.collection?.banner?.indexOf('placehold.it') > -1
    #     $state.go 'collection', { id: scope.collection.id }
    #   else
    #     scope.collection.in_carousel = !scope.collection.in_carousel
    #     scope.updateCollection()
    #
    # scope.editOrOpenModal = () ->
    #   if !scope.modal then return $state.go 'collection', { id: scope.collection?.id }
    #   eeCollections.fns.openProductsModal scope.collection

    return
