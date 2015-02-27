'use strict'

angular.module('ee-product').directive "eeProductSelectionButton", (eeSelection, eeStorefront, eeAuth) ->
  templateUrl: 'components/ee-product-selection-button.html'
  restrict: 'E'
  scope:
    product: '='
  link: (scope, ele, attr, eeProductForCatalogCtrl) ->
    scope.removeProductFromStore = () ->
      eeSelection.deleteSelection(scope.product.selection_id)
      .then () -> eeAuth.getUsername()
      .then (username) -> eeStorefront.storefrontFromUsername(username, true)
      .catch (err) -> console.error err
    return
