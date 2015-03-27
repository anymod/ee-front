'use strict'

angular.module('builder.orders').config ($stateProvider) ->

  $stateProvider.state 'orders',
    url: '/orders'
    views:
      main:
        templateUrl: 'builder/orders/orders.html'
        controller: 'builder.ordersCtrl'
      offscreen:
        templateUrl: 'builder/orders/orders.offscreen.html'
        controller: 'builder.ordersCtrl'
        offscreenCategory: 'Orders'
        offscreenColor: 'green'
    data:
      pageTitle: 'My orders | eeosk'
