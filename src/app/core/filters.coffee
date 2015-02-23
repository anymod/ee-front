'use strict'

angular.module('app.core').filter 'eeShopCategories', () ->
  (products, category) ->
    if !products or !category or category is 'All' then return products
    filtered = []
    for product in products
      # TODO implement custom categories
      # if product.categories?.indexOf(category) >= 0 then filtered.push product
      if product.category is category then filtered.push product
    return filtered

angular.module('app.core').filter 'centToDollar', ($filter) ->
  (cents) ->
    currencyFilter = $filter('currency')
    currencyFilter Math.floor(cents)/100

angular.module('app.core').filter 'thumbnail', () ->
  (url) ->
    if !!url and url.indexOf("image/upload") > -1
      url.split("image/upload").join('image/upload/c_pad,w_150,h_150')
    else
      url

angular.module('app.core').filter 'mainImg', () ->
  (url) ->
    if !!url and url.indexOf("image/upload") > -1
      url.split("image/upload").join('image/upload/c_limit,w_500,h_500')
    else
      url

angular.module('app.core').filter 'urlText', () ->
  (text) -> text.replace(/[^a-zA-Z0-9_]/gi, '').toLowerCase()

angular.module('app.core').filter 'rangeToText', () ->
  (range) ->
    sides = range.split('_')
    sides[0] = '$' + sides[0]
    sides[1] = if sides[1] is 'null' then ' and above' else ' to $' + sides[1]
    sides.join('').replace('$0 to', 'Under')
