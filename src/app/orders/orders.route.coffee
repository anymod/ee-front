'use strict'

angular.module('app.orders').config ($stateProvider) ->

  $stateProvider
    .state 'app.orders',
      url: '/orders'
      templateUrl: 'app/orders/orders.html'
      controller: 'app.ordersCtrl'
      # resolve: eeOrderData: (eeOrders) -> eeOrders.getOrders(
      data:
        pageTitle: 'My orders | eeosk'
        offscreenCategory: 'Orders'
        offscreenColor: 'green'
