'use strict'

angular.module('builder.orders').controller 'ordersCtrl', (eeDefiner, eeOrders) ->

  orders = this

  orders.ee   = eeDefiner.exports
  orders.data = eeOrders.data

  eeOrders.fns.search()

  return
