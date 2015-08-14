'use strict'

module = angular.module 'ee-storeproduct-editor-card', []

module.directive "eeStoreproductEditorCard", (eeProduct) ->
  templateUrl: 'ee-shared/components/ee-storeproduct-editor-card.html'
  restrict: 'E'
  scope:
    storeProduct:     '='
  link: (scope, ele, attrs) ->
    scope.calculated =
      max_price:          undefined
      min_price:          undefined
      selling_cents:      undefined
      selling_dollars:    undefined
      earnings:           undefined
      margin:             undefined
    scope.margins =
      min_margin:         0.05
      max_margin:         0.80
      start_margin:       0.15
      margin_array:       [0.1, 0.2, 0.3, 0.5]

    _setMaxAndMinPrice = () ->
      if !scope.storeProduct then return
      scope.calculated.max_price = Math.floor(scope.storeProduct.baseline_price / (1 - scope.margins.max_margin))
      scope.calculated.min_price = Math.ceil(scope.storeProduct.baseline_price / (1 - scope.margins.min_margin))

    _setDollarsAndCents = () ->
      if !scope.storeProduct?.selling_price then return
      scope.calculated.selling_cents    = Math.abs(parseInt(scope.storeProduct.selling_price % 100))
      scope.calculated.selling_dollars  = parseInt(parseInt(scope.storeProduct.selling_price) - scope.calculated.selling_cents) / 100
      return

    _setEarningsAndMargin = () ->
      if !scope.storeProduct then return
      scope.calculated.earnings = scope.storeProduct.selling_price - scope.storeProduct.baseline_price
      scope.calculated.margin   = 1 - (scope.storeProduct.baseline_price / scope.storeProduct.selling_price)
      return

    _calculate = () ->
      _setMaxAndMinPrice()
      _setDollarsAndCents()
      _setEarningsAndMargin()
      return

    _calcByDollarsAndCents = () ->
      if !scope.calculated.selling_dollars or !scope.calculated.selling_cents then return
      selling_dollars = Math.abs(parseInt(scope.calculated.selling_dollars)*100)
      selling_cents   = Math.abs(parseInt(scope.calculated.selling_cents))
      if selling_cents > 99 then selling_cents = 99
      scope.storeProduct.selling_price = selling_dollars + selling_cents
      _calculate()
      return

    scope.setSellingPrice = (price) ->
      scope.storeProduct.selling_price = price
      _calculate()

    scope.calcByMargin = (margin) ->
      if !margin then return
      scope.storeProduct.selling_price = parseInt(scope.storeProduct.baseline_price / (1 - margin))
      _calculate()
      return

    _setDollarsAndCents()
    _setMaxAndMinPrice()
    _setEarningsAndMargin()

    scope.$watchGroup ['calculated.selling_dollars', 'calculated.selling_cents'], (newVal, oldVal) ->
      if oldVal then _calcByDollarsAndCents()
      return

    return
