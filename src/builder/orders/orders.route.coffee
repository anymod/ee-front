'use strict'

angular.module('builder.orders').config ($stateProvider) ->

  $stateProvider.state 'orders',
    url: '/orders'
    views:
      header:
        controller: 'ordersCtrl as orders'
        templateUrl: 'builder/orders/orders.header.html'
      top:
        controller: 'ordersCtrl as orders'
        templateUrl: 'builder/orders/orders.html'
    data:
      pageTitle: 'My orders | eeosk'
      padTop:    '85px'
    resolve:
      user: (eeAuth) -> eeAuth.fns.getOrSetUser()

  return
