'use strict'

module = angular.module 'ee-selection-card', []

module.directive "eeSelectionCard", () ->
  templateUrl: 'ee-shared/components/ee-selection-card.html'
  restrict: 'E'
  scope:
    selectionTitle: '='
    price:          '='
    content:        '='
    mainImage:      '@'
    details:        '='
  link: (scope, ele, attrs) ->
    scope.title = scope.selectionTitle # selectionTitle to avoid title="" in HTML (which causes popover note in some browsers)
    scope.setMainImage = (url) -> scope.mainImage = url
    return
