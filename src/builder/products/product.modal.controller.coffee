'use strict'

angular.module('builder.products').controller 'productModalCtrl', ($scope, $rootScope, eeDefiner, eeProduct, eeCustomization, eeCollections, product, data) ->

  modal = this

  modal.ee                = eeDefiner.exports
  modal.margin_array      = [0.1, 0.25, 0.5]
  modal.product           = product
  modal.tab               = if data?.type is 'add' then 'add' else 'title'
  modal.customizationFns  = eeCustomization.fns
  modal.collectionsFns    = eeCollections.fns

  modal.reading = true
  eeProduct.fns.getComplete modal.product
  .then () -> return
  .finally () -> modal.reading = false

  modal.setPricing = (margin) ->
    $rootScope.$broadcast 'set:pricing', { product_id: product.id, margin: margin }

  $scope.product = product
  $scope.$watch 'product', (newVal, oldVal) ->
    product.prices = []
    product.prices.push sku.price for sku in product.skus
  , true

  eeCollections.fns.search()

  return
