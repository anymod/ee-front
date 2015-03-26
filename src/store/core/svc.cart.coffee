'use strict'

angular.module('store.core').factory 'eeCart', ($rootScope, $state) ->
  ## Format of cart:
  # _cart = {
  #   calc_meta: {
  #     product_total: int
  #     shipping_total: int
  #     tax_total: int
  #     grand_total: int
  #   },
  #   entries: [
  #     { product: product, quantity: int },
  #     { product: product, quantity: int },
  #     { product: product, quantity: int }
  #   ]
  # }
  _cart =
    calc_meta: {}
    entries: []

  calcMeta = (cart) ->
    count           = 0
    product_total   = 0
    shipping_total  = 0
    tax_total       = 0
    grand_total     = 0
    addToTotals = (entry) ->
      product_total   += parseInt(parseInt(entry.product.selling_price) * parseInt(entry.quantity))
      shipping_total  += parseInt(parseInt(entry.product.shipping_price) * parseInt(entry.quantity))
      count           += parseInt(entry.quantity)
    addToTotals(cart_entry) for cart_entry in cart.entries
    grand_total = product_total + shipping_total + tax_total
    cart.calc_meta =
      count:          count
      product_total:  product_total
      shipping_total: shipping_total
      tax_total:      tax_total
      grand_total:    grand_total
    $rootScope.$broadcast 'cart:updated', _cart
    return

  cart: () -> _cart
  calculate: () -> calcMeta _cart; return

  count: () -> _cart.length || 0

  addProduct: (product) ->
    increment = false
    addOrIncrement = (selection_id, entry) ->
      if !!selection_id && entry.product.selection_id is selection_id
        entry.quantity += 1
        increment = true
    addOrIncrement(product.selection_id, entry) for entry in _cart.entries
    if increment is false then _cart.entries.push { product: product, quantity: 1 }
    calcMeta _cart
    $state.go 'storefront.cart'
    return

  removeProduct: (product) ->
    newCart = { calc_meta: {}, entries: [] }
    removeIfMatch = (selection_id, n) ->
      entry = _cart.entries[n]
      if !!entry && entry.product.selection_id isnt selection_id then newCart.entries.push entry
    removeIfMatch(product.selection_id, n) for n in [0..(_cart.entries.length - 1)]
    _cart = newCart
    calcMeta _cart
    return

  getProductNames: () ->
    names = []
    addName = (entry) -> names.push entry.product.title
    addName(entry) for entry in _cart.entries
    names.join('; ')

  getSelectionIds: () ->
    ids = []
    addId = (entry) -> ids.push(entry.quantity + 'x' + entry.product.selection_id)
    addId(entry) for entry in _cart.entries
    ids.join('; ')
