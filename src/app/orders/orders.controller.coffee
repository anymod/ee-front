'use strict'

angular.module('app.orders').controller 'app.ordersCtrl', ($scope, $rootScope, eeOrders) ->
  $rootScope.toggle = true
  eeOrders.getOrders().then (orders) -> $scope.orders = orders
  return
