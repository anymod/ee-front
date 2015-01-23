'use strict'

angular.module('app.core').filter 'eeShopCategories', () ->
  (products, category) ->
    if !category || category == 'All' then return products
    filtered = []
    for product in products
      if product.categories?.indexOf(category) >= 0 then filtered.push product
    return filtered

angular.module('app.core').filter 'centToDollar', ($filter) ->
  (cents) ->
    currencyFilter = $filter('currency')
    currencyFilter Math.floor(cents)/100
