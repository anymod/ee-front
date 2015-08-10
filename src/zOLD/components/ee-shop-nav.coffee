'use strict'

angular.module('ee-product').directive "eeCollectionNav", ($state) ->
  templateUrl: 'components/ee-collection-nav.html'
  restrict: 'E'
  replace: true
  scope:
    categories: '='
  link: (scope, ele, attrs) ->
    scope.$state = $state
    return
