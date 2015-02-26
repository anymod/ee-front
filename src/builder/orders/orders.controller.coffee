'use strict'

angular.module('builder.orders').controller 'builder.ordersCtrl', ($scope, eeOrders) ->
  eeOrders.getOrders().then (orders) -> $scope.orders = orders
  return
