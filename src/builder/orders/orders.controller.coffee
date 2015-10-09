'use strict'

angular.module('builder.orders').controller 'ordersCtrl', (eeDefiner, eeUser, eeOrders) ->

  orders = this

  orders.ee   = eeDefiner.exports
  orders.data = eeOrders.data

  eeUser.fns.defineUser()
  eeOrders.fns.search()

  return
