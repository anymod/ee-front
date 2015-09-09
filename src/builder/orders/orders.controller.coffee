'use strict'

angular.module('builder.orders').controller 'ordersCtrl', (eeDefiner, eeUser) ->

  orders = this

  orders.ee = eeDefiner.exports

  orders.fns    = {}
  orders.data   = {}
  orders.orders = []

  eeUser.fns.defineUser()

  return
