'use strict'

angular.module('builder.core').factory 'eeCart', ($rootScope) ->

  ## SETUP
  _cart =
    calc_meta: {}
    entries: []

  ## PRIVATE FUNCTIONS
  _calcMeta = (cart) ->
    count             = 0
    cumulative_price  = 0
    shipping_total    = 0
    tax_total         = 0
    grand_total       = 0
    addToTotals = (entry) ->
      cumulative_price  += parseInt(parseInt(entry.template.selling_price) * parseInt(entry.quantity))
      shipping_total    += parseInt(parseInt(entry.template.shipping_price) * parseInt(entry.quantity))
      count             += parseInt(entry.quantity)
    addToTotals(cart_entry) for cart_entry in cart.entries
    grand_total = cumulative_price + shipping_total + tax_total
    cart.calc_meta =
      count:            count
      cumulative_price: cumulative_price
      shipping_total:   shipping_total
      tax_total:        tax_total
      grand_total:      grand_total
    $rootScope.$broadcast 'cart:updated', _cart
    return

  ## EXPORTS
  count: () -> 0
  templates: () -> []

  addTemplate: (template) ->
    increment = false
    addOrIncrement = (product_id, entry) ->
      if !!product_id && entry.template.product_id is product_id
        entry.quantity += 1
        increment = true
    addOrIncrement(template.product_id, entry) for entry in _cart.entries
    if increment is false then _cart.entries.push { template: template, quantity: 1 }
    _calcMeta _cart
    return
