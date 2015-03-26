'use strict'

angular.module('builder.orders').config ($stateProvider) ->

  $stateProvider
    .state 'orders',
      url: '/orders'
      templateUrl: 'builder/orders/orders.html'
      controller: 'builder.ordersCtrl'
      data:
        pageTitle: 'My orders | eeosk'
        offscreenCategory: 'Orders'
        offscreenColor: 'green'
