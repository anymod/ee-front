'use strict'

module = angular.module 'ee-collection-carousel', []

module.directive "eeCollectionCarousel", () ->
  templateUrl: 'components/ee-collection-carousel.html'
  restrict: 'E'
  scope:
    collections: '='
  link: (scope, ele, attrs) ->
    return unless scope.collections.length > 0

    scope.activeIndex = null
    scope.select = (index) ->
      if index < 0 then index = scope.collections.length - 1
      if index >= scope.collections.length then index = 0
      scope.activeIndex = index
      collection.active = false for collection in scope.collections
      scope.collections[index].active = true

    scope.prev = () -> scope.select(scope.activeIndex - 1)
    scope.next = () -> scope.select(scope.activeIndex + 1)

    scope.select 0

    scope.$on 'move:homepage:collection', (e, data) ->
      return unless data.section is 'carousel'
      if data.direction is 'left' then scope.select(scope.activeIndex - 1)
      if data.direction is 'right' then scope.select(scope.activeIndex + 1)

    scope.$on 'user:updated', (e, user) ->
      scope.collections = user.home_carousel
      if scope.activeIndex >= scope.collections.length then scope.activeIndex = scope.collections.length - 1
      if scope.activeIndex < 0 then scope.activeIndex = 0

    return
