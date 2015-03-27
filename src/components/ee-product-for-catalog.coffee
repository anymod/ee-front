'use strict'

angular.module('ee-product').directive "eeProductForCatalog", (eeStorefront, eeCatalog, eeAuth, eeSelection) ->
  templateUrl: 'components/ee-product-for-catalog.html'
  restrict: 'E'
  scope:
    product: '='
  # controller: ($scope) ->
  #   this.setCurrentMargin = (margin) -> $scope.currentMargin = margin
  link: (scope, ele, attr) ->
    scope.productFocus = (id) ->
      console.log 'focusing!', id
      scope.$emit 'offscreen:right:open'
    # scope.overlay = false
    # scope.toggleOverlay = () -> scope.overlay = !scope.overlay
    #
    # scope.added = false
    # scope.product_selection = false
    # eeCatalog.setCurrentPriceAndCurrentMargin scope, scope.product.baseline_price, eeCatalog.startMargin
    #
    # eeAuth.getUsername()
    # .then (username) -> eeStorefront.getProductInStorefront(username, scope.product.id)
    # .then (p_s) -> scope.product_selection = p_s
    # .catch () -> scope.product_selection = false
    #
    # scope.select = () ->
    #   eeSelection.createSelection(scope.product, scope.currentMargin*100)
    #   .then (res) ->
    #     scope.added = true
    #     scope.selection_id = res.id
    #     eeStorefront.reset()
    #   .catch (err) ->
    #     scope.added = false
    #     console.error err
    #
    # scope.deselect = () ->
    #   eeSelection.deleteSelection(scope.selection_id)
    #   .then (res) ->
    #     scope.added = false
    #     scope.selection_id = undefined
    #     eeStorefront.reset()
    #   .catch (err) ->
    #     scope.added = true
    #     console.error err

    return
