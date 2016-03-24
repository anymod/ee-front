'use strict'

module = angular.module 'ee-collection-for-builder', []

module.directive "eeCollectionForBuilder", (eeCollections) ->
  templateUrl: 'components/ee-collection-for-builder.html'
  restrict: 'E'
  scope:
    section: '@'
    collection: '='
    first: '='
    last: '='
    useAddOverlay: '@'
  link: (scope, ele, attrs) ->
    initialCollection = angular.copy scope.collection
    scope.collectionsFns = eeCollections.fns
    scope.products = []

    populateProductCarousel = () ->
      eeCollections.fns.readCollection scope.collection.id
      .then (res) ->
        return if !res.rows
        scope.products = res.rows.slice(0,3)

    populateProductCarousel() if scope.collection?.id and (!scope.collection.banner || !scope.collection.show_banner)

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

    scope.showBanner = (bool) ->
      scope.collection.show_banner = !!bool
      eeCollections.fns.updateCollection scope.collection
      .then () ->
        populateProductCarousel() if !bool

    scope.add = () ->
      scope.collection.cloned = true
      eeCollections.fns.cloneCollection scope.collection
      .then (data) ->
        scope.collection[key] = data.collection[key] for key in Object.keys(scope.collection)
        scope.collection.cloned = true

    scope.remove = () ->
      eeCollections.fns.destroyCollection scope.collection
      .then () ->
        scope.collection[key] = initialCollection[key] for key in Object.keys(scope.collection)
        scope.collection.removed = true

    return
