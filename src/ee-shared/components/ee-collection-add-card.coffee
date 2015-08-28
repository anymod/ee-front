'use strict'

module = angular.module 'ee-collection-add-card', []

module.directive "eeCollectionAddCard", ($state, $window, eeCollections) ->
  templateUrl: 'ee-shared/components/ee-collection-add-card.html'
  restrict: 'E'
  scope:
    collection: '='
  link: (scope, ele, attrs) ->

    scope.save_status = 'Save'
    scope.saved       = true
    scope.products    = []

    scope.getProducts = () ->
      eeCollections.fns.readPublicCollection scope.collection, scope.page

    # scope.updateCollection = () ->
    #   scope.save_status = 'Saving'
    #   eeCollections.fns.updateCollection scope.collection
    #   .then () ->
    #     scope.save_status = 'Saved'
    #     scope.saved       = true
    #   .catch (err) -> scope.save_status = 'Problem saving'
    #
    # scope.deleteCollection = () ->
    #   deleteCollection = $window.confirm 'Remove this from your store?'
    #   if deleteCollection
    #     scope.save_status = 'Removing'
    #     eeCollections.fns.destroyCollection scope.collection
    #     .then () ->
    #       scope.collection.removed = true
    #       $state.go 'collections'
    #     .catch (err) -> scope.save_status = 'Problem removing'
    #
    # scope.addToCarousel = () ->
    #   scope.collection.in_carousel = true
    #   scope.updateCollection()
    #
    # scope.removeFromCarousel = () ->
    #   scope.collection.in_carousel = false
    #   scope.updateCollection()

    return
