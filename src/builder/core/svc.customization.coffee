'use strict'

angular.module('builder.core').factory 'eeCustomization', (eeBack, eeAuth) ->

  ## SETUP
  # none

  ## PRIVATE EXPORT DEFAULTS
  _data = {}

  ## PRIVATE FUNCTIONS
  _addOrUpdateCustomization = (customization, product) ->
    product.updating = true
    eeBack.fns.customizationsPOST customization, eeAuth.fns.getToken()
    .then (cust) -> cust
    .finally () -> product.updating = false

  _updateProduct = (product) ->
    if !product or !product.id then return
    selling_prices = []
    selling_prices.push { sku_id: sku.id, selling_price: sku.price } for sku in product.skus
    customization = { product_id: product.id, title: product.title, selling_prices: selling_prices }
    _addOrUpdateCustomization customization, product
    .then (cust) -> product.title = cust.title

  _updateProductTitle = (product) ->
    if !product or !product.id then return
    customization = { product_id: product.id, title: product.title }
    _addOrUpdateCustomization customization, product
    .then (cust) -> product.title = cust.title

  _updateProductPricing = (product) ->
    if !product or !product.id then return
    selling_prices = []
    selling_prices.push { sku_id: sku.id, selling_price: sku.price } for sku in product.skus
    customization = { product_id: product.id, selling_prices: selling_prices }
    _addOrUpdateCustomization customization, product

  ## EXPORTS
  data: _data
  fns:
    updateProduct: _updateProduct
    updateProductTitle: _updateProductTitle
    updateProductPricing: _updateProductPricing
