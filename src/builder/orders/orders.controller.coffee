'use strict'

angular.module('builder.orders').controller 'builder.ordersCtrl', ($scope, eeOrders, eeStorefront) ->
  $scope.orders = []
  $scope.storefront = {}
  $scope.hideCatalogAlert = true

  ## Formerly directive
  $scope.offscreenCategory = 'Orders'
  $scope.offscreenColor = 'green'
  ##

  # eeStorefront.getStorefront()
  # .then (storefront) ->
  #   $scope.storefront = storefront
  #   eeOrders.getOrders { storefront: storefront }
  # .then (orders) -> $scope.orders = orders
  # .catch (err) -> console.error err

  return
