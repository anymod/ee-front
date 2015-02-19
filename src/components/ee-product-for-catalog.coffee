'use strict'

angular.module('ee-product').directive "eeProductForCatalog", ($rootScope, $location, eeSelection, eeCatalog, eeStorefront) ->
  templateUrl: 'components/ee-product-for-catalog.html'
  restrict: 'E'
  scope:
    product: '='
  link: (scope, ele, attr) ->
    scope.added = false
    scope.product_selection = false
    eeCatalog.setCurrentPriceAndCurrentMargin scope, scope.product.baseline_price, eeCatalog.startMargin

    eeStorefront.getProductInStorefront(scope.product.id)
    .then (p_s) -> scope.product_selection = p_s
    .catch () -> scope.product_selection = false

    scope.select = () ->
      eeSelection.createSelection(scope.product, scope.currentMargin*100)
      .then (res) ->
        scope.added = true
        scope.selection_id = res.id
      .catch (err) ->
        scope.added = false
        console.error err

    scope.deselect = () ->
      eeSelection.deleteSelection(scope.selection_id)
      .then (res) ->
        scope.added = false
        scope.selection_id = undefined
      .catch (err) ->
        scope.added = true
        console.error err

    scope.highlightProduct = () ->
      $location.search('p', scope.product.id)

    return
