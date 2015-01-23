'use strict'

angular.module('app.orders').config ($stateProvider) ->

  $stateProvider
    .state 'app.orders',
      url: '/orders'
      templateUrl: 'partials/app/orders.html'
      controller: 'app.ordersCtrl'
      resolve: eeOrderData: (eeFirebaseSvc) -> eeFirebaseSvc.getOrders()
      data:
        pageTitle: 'My orders | eeosk'
        offscreenCategory: 'Orders'
        offscreenColor: 'green'
