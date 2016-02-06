'use strict'

angular.module('builder.products').controller 'productsCtrl', ($scope, $state, eeDefiner, eeProducts, eeCollections) ->

  products = this

  products.ee   = eeDefiner.exports
  products.fns  = eeProducts.fns
  products.collectionsFns = eeCollections.fns

  products.in = true

  products.showIn = () ->
    products.in = true
    eeProducts.fns.featured()
  products.showIn()

  products.showAdd = () ->
    products.in = false
    eeProducts.fns.runSection 'search'

  products.update = () ->
    eeProducts.fns.runSection 'storefront'

  $scope.$on 'search:started', (e, data) ->
    if data is 'search' then products.in = false

  return
