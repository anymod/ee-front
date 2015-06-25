'use strict'

module = angular.module 'ee-selection-editor-card', []

module.directive "eeSelectionEditorCard", () ->
  templateUrl: 'ee-shared/components/ee-selection-editor-card.html'
  restrict: 'E'
  scope:
    selection:    '='
    product:      '='
  link: (scope, ele, attrs) ->
    scope.calculated =
      selling_cents:      undefined
      selling_dollars:    undefined
      earnings:           undefined
      margin:             undefined
    scope.margins =
      min_margin:         0.05
      max_margin:         0.40
      start_margin:       0.15
      margin_array:       [0.1, 0.2, 0.3]

    _calculate = () ->
      if !scope.selection.selling_price then return
      scope.calculated.selling_cents    = Math.abs(parseInt(scope.selection.selling_price % 100))
      scope.calculated.selling_dollars  = parseInt(parseInt(scope.selection.selling_price) - scope.calculated.selling_cents) / 100
      scope.calculated.earnings         = scope.selection.selling_price - scope.product.baseline_price
      scope.calculated.margin           = 1 - (scope.product.baseline_price / scope.selection.selling_price)
      return

    _calcByDollarsAndCents = () ->
      if !scope.calculated.selling_dollars or !scope.calculated.selling_cents then return
      selling_dollars = Math.abs(parseInt(scope.calculated.selling_dollars)*100)
      selling_cents   = Math.abs(parseInt(scope.calculated.selling_cents))
      if selling_cents > 99 then selling_cents = 99
      scope.selection.selling_price = selling_dollars + selling_cents
      _calculate()
      return

    scope.calcByMargin = (margin) ->
      if !margin then return
      scope.selection.selling_price = parseInt(scope.product.baseline_price / (1 - margin))
      _calculate()
      return

    scope.$watch 'product', () ->
      scope.selection =
        product_id:     scope.product.id
        title:          scope.product.title
        content:        scope.product.content
        collection:     scope.product.category
        featured:       true
        margin:         scope.margins.start_margin
        baseline_price: parseInt(scope.product.baseline_price)
        selling_price:  parseInt(scope.product.baseline_price / (1 - scope.margins.start_margin))
      _calculate()
      return

    scope.$watchGroup ['calculated.selling_dollars', 'calculated.selling_cents'], () ->
      _calcByDollarsAndCents()
      return

    return