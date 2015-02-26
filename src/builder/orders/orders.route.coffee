'use strict'

angular.module('builder.orders').config ($stateProvider) ->

  $stateProvider
    .state 'app.orders',
      url: '/orders'
      templateUrl: 'builder/orders/orders.html'
      controller: 'builder.ordersCtrl'
      # resolve: eeOrderData: (eeOrders) -> eeOrders.getOrders(
      data:
        pageTitle: 'My orders | eeosk'
        offscreenCategory: 'Orders'
        offscreenColor: 'green'
